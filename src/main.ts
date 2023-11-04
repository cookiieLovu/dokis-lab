// npx isaacscript
import { initModFeatures, ISCFeature, upgradeMod } from "isaacscript-common";
import { LegoBrick } from "./collectibleFeatures/legoBrick";
import { TheFlushedOnion } from "./collectibleFeatures/theFlushedOnion";

const ISC_FEATURES_FOR_THIS_MOD = [ISCFeature.SAVE_DATA_MANAGER] as const;

const modVanilla = RegisterMod("dokis-lab", 1);
const mod = upgradeMod(modVanilla, ISC_FEATURES_FOR_THIS_MOD);

const MOD_FEATURES = [TheFlushedOnion, LegoBrick] as const;

export function main(): void {
  initModFeatures(mod, MOD_FEATURES);

  if (EID) {
    EID.addCollectible(
      Isaac.GetItemIdByName("The Flushed Onion"),
      "{{Blank}}{{Charm}} Every frame there's a 1/180 chance of charming a random enemy of the room",
    );
    EID.addCollectible(
      Isaac.GetItemIdByName("Lego Brick"),
      "{{Blank}}{{Tears}} +0.8 Tears",
    );
  }
}
