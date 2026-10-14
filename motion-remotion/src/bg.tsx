import { createContext, useContext } from "react";
import { BLEU_ANCIEN } from "./theme";

// Couleur de fond courante : dégradé progressif de l'ancien bleu vers le nouveau, calculé sur la timeline globale
export const BgContext = createContext<string>(BLEU_ANCIEN);
export const useBg = () => useContext(BgContext);
