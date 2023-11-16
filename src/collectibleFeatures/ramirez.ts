// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  CacheFlag,
  FamiliarVariant,
  ModCallback,
} from "isaac-typescript-definitions";
import {
  Callback,
  ModFeature,
  checkFamiliarFromCollectibles,
} from "isaacscript-common";

const v = {
  RAMIREZ_COLLECTIBLE_TYPE: Isaac.GetItemIdByName("Ramirez"),
  ramirezFamiliarVariant: Isaac.GetEntityVariantByName(
    "Ramirez",
  ) as FamiliarVariant,
  ramirezFamiliarType: Isaac.GetEntityTypeByName("Ramirez"),
};

export class Ramirez extends ModFeature {
  v = v;

  @Callback(ModCallback.EVALUATE_CACHE, CacheFlag.FAMILIARS)
  ramirezFunction(): void {
    this.spawnRamirez();
    this.ramirezBehavior();
  }

  spawnRamirez(): void {
    checkFamiliarFromCollectibles(
      Isaac.GetPlayer(),
      v.RAMIREZ_COLLECTIBLE_TYPE,
      v.ramirezFamiliarVariant,
    );
  }

  ramirezBehavior(): void {}
}
