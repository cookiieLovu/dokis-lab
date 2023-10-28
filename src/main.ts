// npx isaacscript
import { initModFeatures, ISCFeature, upgradeMod } from "isaacscript-common";
import { TheFlushedOnion } from "./collectibleFeatures/theFlushedOnion";

const ISC_FEATURES_FOR_THIS_MOD = [ISCFeature.SAVE_DATA_MANAGER] as const;

const modVanilla = RegisterMod("dokis-lab", 1);
const mod = upgradeMod(modVanilla, ISC_FEATURES_FOR_THIS_MOD);

const MOD_FEATURES = [TheFlushedOnion] as const;

export function main(): void {
  initModFeatures(mod, MOD_FEATURES);
}
