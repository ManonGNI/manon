"""Musique de fond composée pour la vidéo (synthèse, libre de droits).
Ambiance douce et lumineuse : pad, arpège type piano électrique, basse ronde. Ré majeur, 84 BPM."""
import numpy as np, subprocess, sys
SR = 44100; DUREE = float(sys.argv[2]) if len(sys.argv) > 2 else 60.2; OUT = sys.argv[1]
BPM = 84; BEAT = 60 / BPM; BAR = 4 * BEAT
N = int(SR * DUREE); L = np.zeros(N); R = np.zeros(N)
f = lambda m: 440 * 2 ** ((m - 69) / 12)
rng = np.random.default_rng(7)
# D  A/C#  Bm  G   (notes MIDI)
ACC = [[50, 62, 66, 69, 74], [49, 61, 64, 69, 73], [47, 59, 62, 66, 71], [43, 55, 62, 67, 71]]

def add(sig, start, pan=0.0, gain=1.0):
    i = int(start * SR); j = min(N, i + len(sig))
    if i >= N: return
    s = sig[: j - i] * gain
    L[i:j] += s * np.sqrt(0.5 * (1 - pan)); R[i:j] += s * np.sqrt(0.5 * (1 + pan))

def pluck(freq, dur=1.6):
    t = np.arange(int(dur * SR)) / SR
    env = np.minimum(t / 0.004, 1) * np.exp(-t * 3.2)
    s = np.sin(2 * np.pi * freq * t) + 0.28 * np.sin(2 * np.pi * 2 * freq * t) * np.exp(-t * 6) + 0.08 * np.sin(2 * np.pi * 3 * freq * t) * np.exp(-t * 9)
    return s * env * (1 + 0.04 * np.sin(2 * np.pi * 4.5 * t))

def pad(freqs, dur):
    t = np.arange(int(dur * SR)) / SR
    env = np.minimum(t / 1.2, 1) * np.minimum((dur - t) / 1.0, 1).clip(0)
    s = np.zeros_like(t)
    for fr in freqs:
        for d in (-0.12, 0.0, 0.12):  # léger désaccord pour la largeur
            ph = rng.uniform(0, 2 * np.pi)
            s += np.sin(2 * np.pi * fr * (1 + d / 100) * t + ph) + 0.15 * np.sin(2 * np.pi * 2 * fr * t + ph)
    return s * env / (3 * len(freqs))

def basse(freq, dur):
    t = np.arange(int(dur * SR)) / SR
    env = np.minimum(t / 0.02, 1) * np.exp(-t * 0.9) * np.minimum((dur - t) / 0.2, 1).clip(0)
    return (np.sin(2 * np.pi * freq * t) + 0.2 * np.sin(2 * np.pi * 2 * freq * t)) * env

nb = int(DUREE / BAR) + 1
motif = [0, 2, 3, 4, 3, 2, 3, 1]  # indices dans l'accord, en croches
for b in range(nb):
    acc = ACC[b % 4]; t0 = b * BAR
    add(pad([f(m) for m in acc[1:4]], BAR + 1.0), t0, 0, 0.55)
    add(basse(f(acc[0] - 12 + 12), BAR), t0, 0, 0.42)
    if b >= 1:  # l'arpège entre à la 2e mesure
        for k, idx in enumerate(motif):
            vel = (0.32 if k % 2 == 0 else 0.22) * rng.uniform(0.9, 1.05)
            add(pluck(f(acc[idx] + 12)), t0 + k * BEAT / 2 + rng.uniform(0, 0.008), pan=0.35 * np.sin(k), gain=vel)

# réverbération : réponse impulsionnelle synthétique (bruit à décroissance exponentielle)
def reverb(x, sec=2.4, mix=0.32, seed=1):
    t = np.arange(int(sec * SR)) / SR
    ir = np.random.default_rng(seed).standard_normal(len(t)) * np.exp(-t * 3.0)
    ir[: int(0.02 * SR)] = 0
    n = 1 << int(np.ceil(np.log2(len(x) + len(ir))))
    y = np.fft.irfft(np.fft.rfft(x, n) * np.fft.rfft(ir, n), n)[: len(x)]
    y /= np.abs(y).max() + 1e-9; x2 = x / (np.abs(x).max() + 1e-9)
    return (1 - mix) * x2 + mix * y
L = reverb(L, seed=1); R = reverb(R, seed=2)
t = np.arange(N) / SR
fade = np.minimum(t / 1.5, 1) * np.minimum((DUREE - t) / 2.5, 1).clip(0)
st = np.stack([L, R], 1) * fade[:, None]
st = st / np.abs(st).max() * 0.7
pcm = (st * 32767).astype(np.int16).tobytes()
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "s16le", "-ar", str(SR), "-ac", "2", "-i", "-",
                "-af", "highpass=f=40,lowpass=f=9000,loudnorm=I=-18:TP=-2", "-c:a", "aac", "-b:a", "192k", OUT], input=pcm, check=True)
