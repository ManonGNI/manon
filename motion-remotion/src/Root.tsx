import { Composition } from "remotion";
import "./fonts";
import { GniReel, DURATION } from "./GniReel";

export const RemotionRoot: React.FC = () => (
  <Composition id="GniReel" component={GniReel} durationInFrames={DURATION} fps={30} width={1080} height={1920} />
);
