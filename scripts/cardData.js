// =============================================================================
// Minecraft Explorers - Card Data
// =============================================================================
// Card structures:
//   Landscape: { id, subtype, cost, mobCount, item, tradeOptions, isDestination, toolDiscount }
//   Item:      { id, name, category, bonusValue, state, isUsable }
//   Mob:       { id, name, cost, copies }
//   Chest:     { id, fillItems, placedItems }
// =============================================================================


// =============================================================================
// LANDSCAPE CARDS
// =============================================================================

export const Landscapes = [

    // --- Villages (subtype: "village") ---
    // tradeOptions uses item category names, cost is always 1 hunger + trade
    {
        id: "landscape_village_librarian",
        subtype: "village",
        cost: 1,
        mobCount: 0,
        item: "item_bookshelf_01",
        tradeOptions: ["wood", "emerald"],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_village_cleric",
        subtype: "village",
        cost: 1,
        mobCount: 0,
        item: "item_glowstone_01",
        tradeOptions: ["iron", "emerald"],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_village_fletcher",
        subtype: "village",
        cost: 1,
        mobCount: 0,
        item: "item_crossbow_01",
        tradeOptions: ["wood", "emerald"],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_village_armorsmith",
        subtype: "village",
        cost: 1,
        mobCount: 0,
        item: "item_iron_armor_01",
        tradeOptions: ["iron", "emerald"],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_village_toolsmith",
        subtype: "village",
        cost: 1,
        mobCount: 0,
        item: "item_diamond_pickaxe_01",
        tradeOptions: ["lighting", "emerald"],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_village_weaponsmith",
        subtype: "village",
        cost: 1,
        mobCount: 0,
        item: "item_diamond_sword_01",
        tradeOptions: ["furnishing", "emerald"],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_village_cartographer",
        subtype: "village",
        cost: 1,
        mobCount: 0,
        item: "item_map_01",
        tradeOptions: ["lighting", "emerald"],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_village_farmer",
        subtype: "village",
        cost: 1,
        mobCount: 0,
        item: "item_bread_01",
        tradeOptions: ["furnishing", "emerald"],
        isDestination: false,
        toolDiscount: null
    },

    // --- Woods ---
    {
        id: "landscape_woods_01",
        subtype: "explore",
        cost: 2,
        mobCount: 0,
        item: "item_wood_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_woods_02",
        subtype: "explore",
        cost: 2,
        mobCount: 0,
        item: "item_wood_02",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_woods_03",
        subtype: "explore",
        cost: 2,
        mobCount: 0,
        item: "item_potted_flower_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_woods_04",
        subtype: "explore",
        cost: 2,
        mobCount: 0,
        item: "item_apple_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },

    // --- Cherry Blossom ---
    {
        id: "landscape_cherry_blossom_01",
        subtype: "explore",
        cost: 2,
        mobCount: 0,
        item: "item_wood_03",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_cherry_blossom_02",
        subtype: "explore",
        cost: 2,
        mobCount: 0,
        item: "item_spyglass_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_cherry_blossom_03",
        subtype: "explore",
        cost: 2,
        mobCount: 0,
        item: "item_iron_pickaxe_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },

    // --- Lush Cave ---
    {
        id: "landscape_lush_cave_01",
        subtype: "explore",
        cost: 2,
        mobCount: 0,
        item: "item_spyglass_02",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_lush_cave_02",
        subtype: "explore",
        cost: 2,
        mobCount: 0,
        item: "item_glowberry_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_lush_cave_03",
        subtype: "explore",
        cost: 2,
        mobCount: 1,
        item: "item_iron_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_lush_cave_04",
        subtype: "explore",
        cost: 2,
        mobCount: 0,
        item: "item_iron_armor_02",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },

    // --- Geode ---
    {
        id: "landscape_geode_01",
        subtype: "explore",
        cost: 2,
        mobCount: 0,
        item: "item_iron_sword_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "pickaxe"
    },
    {
        id: "landscape_geode_02",
        subtype: "explore",
        cost: 2,
        mobCount: 0,
        item: "item_iron_pickaxe_02",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "pickaxe"
    },
    {
        id: "landscape_geode_03",
        subtype: "explore",
        cost: 2,
        mobCount: 0,
        item: "item_spyglass_03",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "pickaxe"
    },

    // --- Taiga ---
    {
        id: "landscape_taiga_01",
        subtype: "explore",
        cost: 3,
        mobCount: 0,
        item: "item_wildberry_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_taiga_02",
        subtype: "explore",
        cost: 3,
        mobCount: 0,
        item: "item_iron_armor_03",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_taiga_03",
        subtype: "explore",
        cost: 3,
        mobCount: 0,
        item: "item_jack_o_lantern_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_taiga_04",
        subtype: "explore",
        cost: 3,
        mobCount: 0,
        item: "item_wood_04",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },

    // --- Shipwreck ---
    {
        id: "landscape_shipwreck_01",
        subtype: "explore",
        cost: 3,
        mobCount: 0,
        item: "item_map_02",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_shipwreck_02",
        subtype: "explore",
        cost: 3,
        mobCount: 0,
        item: "item_carrot_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_shipwreck_03",
        subtype: "explore",
        cost: 3,
        mobCount: 0,
        item: "item_sea_lantern_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_shipwreck_04",
        subtype: "explore",
        cost: 3,
        mobCount: 0,
        item: "item_iron_armor_04",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },

    // --- Jungle ---
    {
        id: "landscape_jungle_01",
        subtype: "explore",
        cost: 3,
        mobCount: 0,
        item: "item_crossbow_02",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "sword"
    },
    {
        id: "landscape_jungle_02",
        subtype: "explore",
        cost: 3,
        mobCount: 0,
        item: "item_melon_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "sword"
    },
    {
        id: "landscape_jungle_03",
        subtype: "explore",
        cost: 3,
        mobCount: 0,
        item: "item_wood_05",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "sword"
    },

    // --- Desert Temple ---
    {
        id: "landscape_desert_temple_01",
        subtype: "explore",
        cost: 3,
        mobCount: 0,
        item: "item_spyglass_04",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_desert_temple_02",
        subtype: "explore",
        cost: 3,
        mobCount: 0,
        item: "item_clay_pot_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_desert_temple_03",
        subtype: "explore",
        cost: 3,
        mobCount: 1,
        item: "item_emerald_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_desert_temple_04",
        subtype: "explore",
        cost: 3,
        mobCount: 1,
        item: "item_gold_sword_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "sword"
    },

    // --- Illager Outpost ---
    {
        id: "landscape_illager_outpost_01",
        subtype: "explore",
        cost: 3,
        mobCount: 0,
        item: "item_illager_banner_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "sword"
    },
    {
        id: "landscape_illager_outpost_02",
        subtype: "explore",
        cost: 3,
        mobCount: 1,
        item: "item_crossbow_03",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "sword"
    },
    {
        id: "landscape_illager_outpost_03",
        subtype: "explore",
        cost: 3,
        mobCount: 1,
        item: "item_diamond_pickaxe_02",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "sword"
    },

    // --- Mineshaft ---
    {
        id: "landscape_mineshaft_01",
        subtype: "explore",
        cost: 3,
        mobCount: 0,
        item: "item_torch_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "pickaxe"
    },
    {
        id: "landscape_mineshaft_02",
        subtype: "explore",
        cost: 3,
        mobCount: 0,
        item: "item_iron_02",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "pickaxe"
    },
    {
        id: "landscape_mineshaft_03",
        subtype: "explore",
        cost: 3,
        mobCount: 1,
        item: "item_emerald_02",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "pickaxe"
    },
    {
        id: "landscape_mineshaft_04",
        subtype: "explore",
        cost: 3,
        mobCount: 1,
        item: "item_iron_03",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "pickaxe"
    },

    // --- Witch Hut ---
    {
        id: "landscape_witch_hut_01",
        subtype: "explore",
        cost: 3,
        mobCount: 0,
        item: "item_crossbow_04",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "sword"
    },
    {
        id: "landscape_witch_hut_02",
        subtype: "explore",
        cost: 3,
        mobCount: 0,
        item: "item_gold_pickaxe_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "sword"
    },
    {
        id: "landscape_witch_hut_03",
        subtype: "explore",
        cost: 3,
        mobCount: 1,
        item: "item_cauldron_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "sword"
    },
    {
        id: "landscape_witch_hut_04",
        subtype: "explore",
        cost: 3,
        mobCount: 1,
        item: "item_froglight_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "sword"
    },

    // --- Chasm ---
    {
        id: "landscape_chasm_01",
        subtype: "explore",
        cost: 4,
        mobCount: 0,
        item: "item_iron_armor_05",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "pickaxe"
    },
    {
        id: "landscape_chasm_02",
        subtype: "explore",
        cost: 4,
        mobCount: 0,
        item: "item_iron_04",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "pickaxe"
    },
    {
        id: "landscape_chasm_03",
        subtype: "explore",
        cost: 4,
        mobCount: 0,
        item: "item_emerald_03",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "pickaxe"
    },

    // --- Ruined Portal ---
    {
        id: "landscape_ruined_portal_01",
        subtype: "explore",
        cost: 4,
        mobCount: 0,
        item: "item_gold_apple_01",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_ruined_portal_02",
        subtype: "explore",
        cost: 4,
        mobCount: 0,
        item: "item_gold_sword_02",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },
    {
        id: "landscape_ruined_portal_03",
        subtype: "explore",
        cost: 4,
        mobCount: 0,
        item: "item_gold_pickaxe_02",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: null
    },

    // --- Deep Cave ---
    {
        id: "landscape_deep_cave_01",
        subtype: "explore",
        cost: 4,
        mobCount: 0,
        item: "item_emerald_04",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "pickaxe"
    },
    {
        id: "landscape_deep_cave_02",
        subtype: "explore",
        cost: 4,
        mobCount: 1,
        item: "item_iron_05",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "pickaxe"
    },
    {
        id: "landscape_deep_cave_03",
        subtype: "explore",
        cost: 4,
        mobCount: 1,
        item: "item_emerald_05",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "pickaxe"
    },
    {
        id: "landscape_deep_cave_04",
        subtype: "explore",
        cost: 4,
        mobCount: 1,
        item: "item_diamond_sword_02",
        tradeOptions: [],
        isDestination: false,
        toolDiscount: "pickaxe"
    },

    // --- Special Destinations ---
    {
        id: "landscape_woodland_mansion",
        subtype: "explore",
        cost: 7,
        mobCount: 2,
        item: "item_totem_of_undying_01",
        tradeOptions: [],
        isDestination: true,
        toolDiscount: "sword"
    },
    {
        id: "landscape_ocean_monument",
        subtype: "explore",
        cost: 7,
        mobCount: 2,
        item: "item_wet_sponge_01",
        tradeOptions: [],
        isDestination: true,
        toolDiscount: "sword"
    }
];


// =============================================================================
// ITEM CARDS
// =============================================================================
// bonusValue: discount amount for tools, hunger bonus for food, null for others
// state: "intact" | "damaged" | null (null for non-tools)

export const Items = [

    // --- Wood ---
    { id: "item_wood_01", name: "Wood", category: "wood", bonusValue: null, state: null, isUsable: false },
    { id: "item_wood_02", name: "Wood", category: "wood", bonusValue: null, state: null, isUsable: false },
    { id: "item_wood_03", name: "Wood", category: "wood", bonusValue: null, state: null, isUsable: false },
    { id: "item_wood_04", name: "Wood", category: "wood", bonusValue: null, state: null, isUsable: false },
    { id: "item_wood_05", name: "Wood", category: "wood", bonusValue: null, state: null, isUsable: false },

    // --- Iron ---
    { id: "item_iron_01", name: "Iron Ingot", category: "iron", bonusValue: null, state: null, isUsable: false },
    { id: "item_iron_02", name: "Iron Ingot", category: "iron", bonusValue: null, state: null, isUsable: false },
    { id: "item_iron_03", name: "Iron Ingot", category: "iron", bonusValue: null, state: null, isUsable: false },
    { id: "item_iron_04", name: "Iron Ingot", category: "iron", bonusValue: null, state: null, isUsable: false },
    { id: "item_iron_05", name: "Iron Ingot", category: "iron", bonusValue: null, state: null, isUsable: false },

    // --- Emerald ---
    { id: "item_emerald_01", name: "Emerald", category: "emerald", bonusValue: null, state: null, isUsable: false },
    { id: "item_emerald_02", name: "Emerald", category: "emerald", bonusValue: null, state: null, isUsable: false },
    { id: "item_emerald_03", name: "Emerald", category: "emerald", bonusValue: null, state: null, isUsable: false },
    { id: "item_emerald_04", name: "Emerald", category: "emerald", bonusValue: null, state: null, isUsable: false },
    { id: "item_emerald_05", name: "Emerald", category: "emerald", bonusValue: null, state: null, isUsable: false },

    // --- Food ---
    { id: "item_bread_01",     name: "Bread",      category: "food", bonusValue: 3, state: null, isUsable: true },
    { id: "item_apple_01",     name: "Apple",      category: "food", bonusValue: 2, state: null, isUsable: true },
    { id: "item_carrot_01",    name: "Carrot",     category: "food", bonusValue: 3, state: null, isUsable: true },
    { id: "item_melon_01",     name: "Melon",      category: "food", bonusValue: 2, state: null, isUsable: true },
    { id: "item_glowberry_01", name: "Glowberry",  category: "food", bonusValue: 1, state: null, isUsable: true },
    { id: "item_wildberry_01", name: "Wildberry",  category: "food", bonusValue: 1, state: null, isUsable: true },
    { id: "item_gold_apple_01",name: "Gold Apple", category: "food", bonusValue: 4, state: null, isUsable: true },

    // --- Lighting ---
    { id: "item_glowstone_01",    name: "Glowstone",     category: "lighting", bonusValue: null, state: null, isUsable: false },
    { id: "item_jack_o_lantern_01", name: "Jack O'Lantern", category: "lighting", bonusValue: null, state: null, isUsable: false },
    { id: "item_sea_lantern_01",  name: "Sea Lantern",   category: "lighting", bonusValue: null, state: null, isUsable: false },
    { id: "item_torch_01",        name: "Torch",         category: "lighting", bonusValue: null, state: null, isUsable: false },
    { id: "item_froglight_01",    name: "Froglight",     category: "lighting", bonusValue: null, state: null, isUsable: false },

    // --- Furnishing ---
    { id: "item_bookshelf_01",     name: "Bookshelf",      category: "furnishing", bonusValue: null, state: null, isUsable: false },
    { id: "item_potted_flower_01", name: "Potted Flower",  category: "furnishing", bonusValue: null, state: null, isUsable: false },
    { id: "item_clay_pot_01",      name: "Clay Pot",       category: "furnishing", bonusValue: null, state: null, isUsable: false },
    { id: "item_illager_banner_01",name: "Illager Banner", category: "furnishing", bonusValue: null, state: null, isUsable: false },
    { id: "item_cauldron_01",      name: "Cauldron",       category: "furnishing", bonusValue: null, state: null, isUsable: false },

    // --- Armor ---
    { id: "item_iron_armor_01", name: "Iron Armor", category: "armor", bonusValue: null, state: null, isUsable: true },
    { id: "item_iron_armor_02", name: "Iron Armor", category: "armor", bonusValue: null, state: null, isUsable: true },
    { id: "item_iron_armor_03", name: "Iron Armor", category: "armor", bonusValue: null, state: null, isUsable: true },
    { id: "item_iron_armor_04", name: "Iron Armor", category: "armor", bonusValue: null, state: null, isUsable: true },
    { id: "item_iron_armor_05", name: "Iron Armor", category: "armor", bonusValue: null, state: null, isUsable: true },

    // --- Swords ---
    { id: "item_iron_sword_01",    name: "Iron Sword",    category: "sword", bonusValue: 2, state: "intact", isUsable: true },
    { id: "item_gold_sword_01",    name: "Gold Sword",    category: "sword", bonusValue: 3, state: "intact", isUsable: true },
    { id: "item_gold_sword_02",    name: "Gold Sword",    category: "sword", bonusValue: 3, state: "intact", isUsable: true },
    { id: "item_diamond_sword_01", name: "Diamond Sword", category: "sword", bonusValue: 4, state: "intact", isUsable: true },
    { id: "item_diamond_sword_02", name: "Diamond Sword", category: "sword", bonusValue: 4, state: "intact", isUsable: true },

    // --- Pickaxes ---
    { id: "item_iron_pickaxe_01",    name: "Iron Pickaxe",    category: "pickaxe", bonusValue: 2, state: "intact", isUsable: true },
    { id: "item_iron_pickaxe_02",    name: "Iron Pickaxe",    category: "pickaxe", bonusValue: 2, state: "intact", isUsable: true },
    { id: "item_gold_pickaxe_01",    name: "Gold Pickaxe",    category: "pickaxe", bonusValue: 3, state: "intact", isUsable: true },
    { id: "item_diamond_pickaxe_01", name: "Diamond Pickaxe", category: "pickaxe", bonusValue: 4, state: "intact", isUsable: true },
    { id: "item_diamond_pickaxe_02", name: "Diamond Pickaxe", category: "pickaxe", bonusValue: 4, state: "intact", isUsable: true },

    // --- Crossbow ---
    { id: "item_crossbow_01", name: "Crossbow", category: "crossbow", bonusValue: null, state: null, isUsable: true },
    { id: "item_crossbow_02", name: "Crossbow", category: "crossbow", bonusValue: null, state: null, isUsable: true },
    { id: "item_crossbow_03", name: "Crossbow", category: "crossbow", bonusValue: null, state: null, isUsable: true },
    { id: "item_crossbow_04", name: "Crossbow", category: "crossbow", bonusValue: null, state: null, isUsable: true },

    // --- Spyglass ---
    { id: "item_spyglass_01", name: "Spyglass", category: "spyglass", bonusValue: null, state: null, isUsable: true },
    { id: "item_spyglass_02", name: "Spyglass", category: "spyglass", bonusValue: null, state: null, isUsable: true },
    { id: "item_spyglass_03", name: "Spyglass", category: "spyglass", bonusValue: null, state: null, isUsable: true },
    { id: "item_spyglass_04", name: "Spyglass", category: "spyglass", bonusValue: null, state: null, isUsable: true },

    // --- Explorer Map ---
    { id: "item_map_01", name: "Explorer Map", category: "map", bonusValue: null, state: null, isUsable: true },
    { id: "item_map_02", name: "Explorer Map", category: "map", bonusValue: null, state: null, isUsable: true },

    // --- Special (chest-fill only) ---
    { id: "item_totem_of_undying_01", name: "Totem of Undying", category: "totem",  bonusValue: null, state: null, isUsable: false },
    { id: "item_wet_sponge_01",       name: "Wet Sponge",       category: "sponge", bonusValue: null, state: null, isUsable: false }
];


// =============================================================================
// MOB CARDS
// =============================================================================
// Trophy rule (discard two matching trophies for +1 hunger) is universal
// and handled in game logic, not stored per card.

export const Mobs = [
    { id: "mob_zombie",   name: "Zombie",   cost: 2, copies: 6 },
    { id: "mob_skeleton", name: "Skeleton", cost: 2, copies: 6 },
    { id: "mob_spider",   name: "Spider",   cost: 2, copies: 6 },
    { id: "mob_creeper",  name: "Creeper",  cost: 3, copies: 4 },
    { id: "mob_witch",    name: "Witch",    cost: 3, copies: 4 },
    { id: "mob_enderman", name: "Enderman", cost: 4, copies: 4 }
];


// =============================================================================
// CHEST CARDS
// =============================================================================
// fillItems uses category names so any matching item satisfies the requirement.
// placedItems starts empty and is populated during play.
// "tool" category means any pickaxe or sword of any material qualifies.

export const Chests = [
    { id: "chest_01", fillItems: ["wood", "wood"],             placedItems: [] },
    { id: "chest_02", fillItems: ["iron", "iron"],             placedItems: [] },
    { id: "chest_03", fillItems: ["lighting", "furnishing"],   placedItems: [] },
    { id: "chest_04", fillItems: ["pickaxe", "emerald"],       placedItems: [] },
    { id: "chest_05", fillItems: ["sponge"],                   placedItems: [] },
    { id: "chest_06", fillItems: ["totem"],                    placedItems: [] },
    { id: "chest_07", fillItems: ["lighting", "lighting"],     placedItems: [] },
    { id: "chest_08", fillItems: ["furnishing", "furnishing"], placedItems: [] },
    { id: "chest_09", fillItems: ["wood", "iron"],             placedItems: [] },
    { id: "chest_10", fillItems: ["food", "food"],             placedItems: [] },
    { id: "chest_11", fillItems: ["crossbow", "food"],         placedItems: [] },
    { id: "chest_12", fillItems: ["sword", "armor"],           placedItems: [] }
];