import { ModCallback } from "isaac-typescript-definitions";
import { getNPCs, getPlayers, getRandomInt } from "isaacscript-common";
// npx isaacscript

const MOD_NAME = "dokis-lab";
// Item Definitions
const PLACEHOLDER_ITEM_COLLECTIBLE_TYPE =
  Isaac.GetItemIdByName("Placeholder Item");

export function main(): void {
  const mod = RegisterMod(MOD_NAME, 1);

  // Placeholder Item
  mod.AddCallback(ModCallback.POST_UPDATE, placeholderItemFunction);
  function placeholderItemFunction() {
    checkApplyPlaceholderItemEffect();
  }

  function checkApplyPlaceholderItemEffect() {
    for (const player of getPlayers()) {
      if (player.HasCollectible(PLACEHOLDER_ITEM_COLLECTIBLE_TYPE)) {
        applyPlaceholderItemEffect(player);
      }
    }
  }

  function applyPlaceholderItemEffect(player: EntityPlayer) {
    for (const npc of getNPCs()) {
      if (shouldApplyPlaceholderItemEffectToNPC(npc)) {
        npc.AddShrink(EntityRef(player), 150);
      }
    }
  }

  // eslint-disable-next-line unicorn/consistent-function-scoping
  function shouldApplyPlaceholderItemEffectToNPC(npc: EntityNPC) {
    return npc.IsVulnerableEnemy() && getRandomInt(1, 90, undefined) === 1;
  }
}
