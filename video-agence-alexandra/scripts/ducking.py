"""Courbe de volume de la musique, image par image : très douce sous les voix, remonte dans les blancs."""
import numpy as np, subprocess, sys, json
VIDEO, OUT, FIN = sys.argv[1], sys.argv[2], int(sys.argv[3])  # FIN = image de début de l'écran de fin
SR = 16000; FPS = 30
pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", VIDEO, "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"], capture_output=True, check=True).stdout
a = np.frombuffer(pcm, np.int16).astype(float); n = SR // FPS
nf = len(a) // n
db = np.array([20 * np.log10(np.sqrt((a[i*n:(i+1)*n] ** 2).mean()) + 1) for i in range(nf)])
voix = db > 58
# un blanc de moins de 0,5 s reste « voix » (pas de pompage entre deux mots)
i = 0
while i < nf:
    if not voix[i]:
        j = i
        while j < nf and not voix[j]: j += 1
        if i > 0 and j < nf and j - i < 15: voix[i:j] = True
        i = j
    else: i += 1
# anticipe la reprise de la voix de 5 images
v = voix.copy()
for k in range(1, 6): v[:-k] |= voix[k:]
BAS, HAUT, FINV = 0.06, 0.30, 0.42
cible = np.where(v, BAS, HAUT); cible[FIN:] = FINV
g = np.zeros(nf); g[0] = cible[0]
for k in range(1, nf):
    pas = 0.05 if cible[k] < g[k-1] else 0.015  # descend vite, remonte lentement
    g[k] = g[k-1] + np.clip(cible[k] - g[k-1], -pas, pas)
json.dump([round(x, 3) for x in g], open(OUT, "w"))
print(nf, "images ; part de voix :", round(v.mean(), 2))
