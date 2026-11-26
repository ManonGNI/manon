import cv2, numpy as np, subprocess, sys
SRC=sys.argv[1]; OUT=sys.argv[2]; PREV=sys.argv[3]
cap=cv2.VideoCapture(SRC)
fps=cap.get(cv2.CAP_PROP_FPS)
def frame_at(t):
    cap.set(cv2.CAP_PROP_POS_MSEC, t*1000)
    ok,f=cap.read(); assert ok
    if f.shape[1]>f.shape[0]: f=cv2.rotate(f, cv2.ROTATE_90_CLOCKWISE)
    return cv2.resize(f,(1080,1920),interpolation=cv2.INTER_AREA)
# lecture séquentielle pour la partie passant
plate=frame_at(1.5).astype(np.float32)
g_plate=cv2.cvtColor(plate.astype(np.uint8),cv2.COLOR_BGR2GRAY).astype(np.float32)
REF=(slice(300,800),slice(100,1000))  # zone façade pour l'alignement
win=cv2.createHanningWindow((900,500),cv2.CV_32F)
ROI=(slice(880,1180),slice(590,880))  # trottoir devant la vitrine de droite (sans Loïc)
cap.set(cv2.CAP_PROP_POS_MSEC,3900)
peds=[]
while True:
    t=cap.get(cv2.CAP_PROP_POS_MSEC)/1000
    if t>5.1: break
    ok,f=cap.read()
    if not ok: break
    if f.shape[1]>f.shape[0]: f=cv2.rotate(f, cv2.ROTATE_90_CLOCKWISE)
    f=cv2.resize(f,(1080,1920),interpolation=cv2.INTER_AREA).astype(np.float32)
    g=cv2.cvtColor(f.astype(np.uint8),cv2.COLOR_BGR2GRAY).astype(np.float32)
    (dx,dy),_=cv2.phaseCorrelate(g_plate[REF],g[REF],win)
    M=np.float32([[1,0,-dx],[0,1,-dy]])
    fa=cv2.warpAffine(f,M,(1080,1920),borderMode=cv2.BORDER_REFLECT)
    diff=np.abs(fa[ROI]-plate[ROI]).max(axis=2)
    m=(diff>32).astype(np.uint8)*255
    m=cv2.morphologyEx(m,cv2.MORPH_OPEN,np.ones((3,3),np.uint8))
    m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,np.ones((11,11),np.uint8))
    # ne garder que la plus grande composante (le passant)
    n,lab,stats,_=cv2.connectedComponentsWithStats(m)
    keep=np.zeros_like(m)
    if n>1:
        i=1+np.argmax(stats[1:,cv2.CC_STAT_AREA])
        if stats[i,cv2.CC_STAT_AREA]>150: keep[lab==i]=255
    keep=cv2.dilate(keep,np.ones((7,7),np.uint8))
    a=cv2.GaussianBlur(keep.astype(np.float32)/255,(0,0),3)[...,None]
    # fondu des bords de la zone pour éviter toute couture
    peds.append((fa[ROI],a,(dx,dy)))
print('frames passant',len(peds),'décalages max',max(abs(p[2][0]) for p in peds),max(abs(p[2][1]) for p in peds), file=sys.stderr)
# timeline de sortie : 30 i/s, 4.4 s ; passant ralenti ×1,45 au milieu
N=132; slow=1.45; step=fps/30/slow; start=36
w=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','bgr24','-s','1080x1920','-r','30','-i','-',
   '-vf','eq=gamma=1.2:contrast=1.04:saturation=1.08,colorbalance=rs=0.06:gs=0.01:bs=-0.10:rm=0.05:gm=0.01:bm=-0.08:rh=0.02:bh=-0.04',
   '-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',OUT],stdin=subprocess.PIPE)
for k in range(N):
    out=plate.copy()
    j=int((k-start)*step)
    if 0<=j<len(peds):
        patch,a,_=peds[j]
        out[ROI]=out[ROI]*(1-a)+patch*a
    if k==start+int(len(peds)/step/2): cv2.imwrite(PREV,out.astype(np.uint8))
    w.stdin.write(out.astype(np.uint8).tobytes())
w.stdin.close(); w.wait()
