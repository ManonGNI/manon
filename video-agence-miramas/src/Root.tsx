import React from "react";
import { Composition } from "remotion";
import "./fonts";
import { AgenceMiramas } from "./AgenceMiramas";

export const RemotionRoot: React.FC = () => (
  <Composition id="AgenceMiramas" component={AgenceMiramas} durationInFrames={1530} fps={30} width={1080} height={1920} />
);
