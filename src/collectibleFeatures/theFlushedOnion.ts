import { ModCallback } from "isaac-typescript-definitions";
import {
  Callback,
  ModFeature,
  getNPCs,
  getPlayers,
  getRandomInt,
} from "isaacscript-common";

const v = {
  THE_FLUSHED_ONION_COLLECTIBLE_TYPE:
    Isaac.GetItemIdByName("The Flushed Onion"),
};

export class TheFlushedOnion extends ModFeature {
  v = v;

  @Callback(ModCallback.POST_UPDATE)
  theFlushedOnionFunction(): void {
    this.checkApplyTheFlushedOnionEffect();
  }

  checkApplyTheFlushedOnionEffect(): void {
    for (const player of getPlayers()) {
      if (player.HasCollectible(v.THE_FLUSHED_ONION_COLLECTIBLE_TYPE)) {
        this.applyTheFlushedOnionEffect(player);
      }
    }
  }

  applyTheFlushedOnionEffect(player: EntityPlayer): void {
    for (const npc of getNPCs()) {
      if (this.shouldApplyTheFlushedOnionEffectToNPC(npc)) {
        npc.AddCharmed(EntityRef(player), 150);
      }
    }
  }

  shouldApplyTheFlushedOnionEffectToNPC(npc: EntityNPC): boolean {
    return npc.IsVulnerableEnemy() && getRandomInt(1, 180, undefined) === 1;
  }
}
