import { CacheFlag, ModCallback } from "isaac-typescript-definitions";
import {
  Callback,
  ModFeature,
  addTearsStat,
  getPlayerCollectibleCount,
  getPlayers,
} from "isaacscript-common";

const v = {
  LEGO_BRICK_COLLECTIBLE_TYPE: Isaac.GetItemIdByName("Lego Brick"),
  legoBrickTearIncrease: 0.8,
};

export class LegoBrick extends ModFeature {
  v = v;

  @Callback(ModCallback.EVALUATE_CACHE, CacheFlag.FIRE_DELAY)
  legoBrickFunction(): void {
    this.checkPlayerHasLegoBrickItem();
  }

  checkPlayerHasLegoBrickItem(): void {
    for (const player of getPlayers()) {
      if (player.HasCollectible(v.LEGO_BRICK_COLLECTIBLE_TYPE)) {
        this.applyLegoBrickEffect(player);
      }
    }
  }

  applyLegoBrickEffect(player: EntityPlayer): void {
    addTearsStat(
      player,
      v.legoBrickTearIncrease *
        getPlayerCollectibleCount(player, v.LEGO_BRICK_COLLECTIBLE_TYPE),
    );
  }
}
