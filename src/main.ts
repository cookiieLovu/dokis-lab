// npx isaacscript
import { initModFeatures, ISCFeature, upgradeMod } from "isaacscript-common";
import { LegoBrick } from "./collectibleFeatures/legoBrick";
import { TheFlushedOnion } from "./collectibleFeatures/theFlushedOnion";

const ISC_FEATURES_FOR_THIS_MOD = [ISCFeature.SAVE_DATA_MANAGER] as const;

const modVanilla = RegisterMod("doki's lab!", 1);
const mod = upgradeMod(modVanilla, ISC_FEATURES_FOR_THIS_MOD);

const MOD_FEATURES = [TheFlushedOnion, LegoBrick] as const;

/*
  ---------------------------------
  Object to Store Item Descriptions
  ---------------------------------
  */

const itemDescriptions = {
  theFlushedOnion:
    "Every frame there's a 1/180 chance of charming a random enemy of the room",
  legoBrick: "+0.8 Tears",
};

export function main(): void {
  initModFeatures(mod, MOD_FEATURES);

  /*
  ---------------------------------
  External Item Descriptions Compatibility
  ---------------------------------
  */

  if (EID) {
    EID.addCollectible(
      Isaac.GetItemIdByName("The Flushed Onion"),
      `{{Charm}} ${itemDescriptions.theFlushedOnion}`,
    );

    EID.addCollectible(
      Isaac.GetItemIdByName("Lego Brick"),
      `{{Tears}} ${itemDescriptions.legoBrick}`,
    );
  }

  /*
  ---------------------------------
  Encyclopedia Compatibility
  ---------------------------------
  */

  if (Encyclopedia) {
    const theFlushedOnionWikiDesc = [
      [
        { str: "Effects", fsize: 2, clr: 3, halign: 0 },
        { str: itemDescriptions.theFlushedOnion },
      ],
    ];
    const theFlushedOnionTab = {
      Class: "doki's lab!",
      ID: Isaac.GetItemIdByName("The Flushed Onion"),
      Pools: [
        EncyclopediaItemPoolType.POOL_TREASURE,
        EncyclopediaItemPoolType.POOL_GREED_TREASURE,
        EncyclopediaItemPoolType.POOL_GREED_SHOP,
      ],
      WikiDesc: theFlushedOnionWikiDesc,
      ModName: "doki's lab!",
    };

    const legoBrickWikiDesc = [
      [
        { str: "Effects", fsize: 2, clr: 3, halign: 0 },
        { str: itemDescriptions.legoBrick },
      ],
    ];
    const legoBrickTab = {
      Class: "doki's lab!",
      ID: Isaac.GetItemIdByName("Lego Brick"),
      Pools: [
        EncyclopediaItemPoolType.POOL_TREASURE,
        EncyclopediaItemPoolType.POOL_BOSS,
        EncyclopediaItemPoolType.POOL_GREED_TREASURE,
        EncyclopediaItemPoolType.POOL_GREED_SHOP,
      ],
      WikiDesc: legoBrickWikiDesc,
      ModName: "doki's lab!",
    };

    Encyclopedia.AddItem(theFlushedOnionTab);
    Encyclopedia.AddItem(legoBrickTab);
  }
}
