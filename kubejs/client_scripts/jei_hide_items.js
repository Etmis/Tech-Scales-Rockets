// kubejs/client_scripts/jei_hide_items.js

RecipeViewerEvents.removeEntries('item', event => {
    const hiddenItems = [
        // 0. Zakázaný Alloy Paxel (kvůli bugům s enchanty)
        'allthemodium:alloy_paxel',

        // 1. Mekanism (MekaSuit, Meka-Tool, Moduly)
        'mekanism:meka_tool',
        'mekanism:mekasuit_helmet',
        'mekanism:mekasuit_bodyarmor',
        'mekanism:mekasuit_pants',
        'mekanism:mekasuit_boots',
        'mekanism:modification_station',
        'mekanism:module_base',

        // 2. L_Ender's Cataclysm (Vedlejší zbraně)
        'cataclysm:the_incinerator',
        'cataclysm:tidal_claws',
        'cataclysm:soul_render',
        'cataclysm:the_annihilator',
        'cataclysm:the_immolator',
        'cataclysm:meat_shredder',
        'cataclysm:laser_gatling',
        'cataclysm:wither_assault_shoulder_weapon',
        'cataclysm:void_assault_shoulder_weapon',
        'cataclysm:void_forge',
        'cataclysm:infernal_forge',
        'cataclysm:ancient_spear',
        'cataclysm:astrape',
        'cataclysm:ceraunus',
        'cataclysm:brontes',
        'cataclysm:athame',
        'cataclysm:khopesh',
        'cataclysm:coral_spear',
        'cataclysm:coral_bardiche',

        // 3. Industrial Foregoing (Infinity výbava + zakázané stroje)
        'industrialforegoing:infinity_drill',
        'industrialforegoing:infinity_saw',
        'industrialforegoing:infinity_hammer',
        'industrialforegoing:infinity_trident',
        'industrialforegoing:infinity_nuke',
        'industrialforegoing:infinity_backpack',
        'industrialforegoing:infinity_launcher',
        'industrialforegoing:enchantment_factory',
        'industrialforegoing:enchantment_applicator',
        'industrialforegoing:enchantment_extractor',
        'industrialforegoing:mob_duplicator',
        'industrialforegoing:meat_feeder',

        // 4. Ad Astra (Palivo a ropné rafinerie smazány)
        'ad_astra:fuel_refinery',
        'ad_astra:cryo_freezer',

        // 5. Flux Networks (Zákaz Flux Storage baterií)
        'fluxnetworks:basic_flux_storage',
        'fluxnetworks:herculean_flux_storage',
        'fluxnetworks:gargantuan_flux_storage'
    ]

    hiddenItems.forEach(item => event.remove(item))

    // Skrytí všech Mekanism modulů
    event.remove(/^mekanism:module_.*/)
    event.remove(/^mekanism_extras:module_.*/)

    // Ice and Fire: Skrytí POUZE Dragonsteel nástrojů a zbraní (Ingoty, Zbroje a Dragonforge ZŮSTÁVAJÍ!)
    event.remove(/^iceandfire:dragonsteel_.*_(sword|pickaxe|axe|shovel|hoe)$/)

    // Skrytí nástrojů a zbraní z dračích kostí
    event.remove(/^iceandfire:dragonbone_(sword|pickaxe|axe|shovel|hoe|bow).*/)
})

RecipeViewerEvents.removeCategories(event => {
    event.remove('emi:tag')
    event.remove('twilightforest:uncrafting')
    event.remove('ae2:p2p_attunement')
    event.remove('minecraft:tag_recipes/item')
    event.remove('minecraft:tag_recipes/block')
})

ItemEvents.modifyTooltips(event => {
    const cosmeticArmors = [
        /^iceandfire:armor_.*_(helmet|chestplate|leggings|boots)$/,
        /^iceandfire:tide_.*_(helmet|chestplate|leggings|boots)$/,
        /^iceandfire:dragonsteel_.*_(helmet|chestplate|leggings|boots)$/,
        'cataclysm:ignitium_helmet',
        'cataclysm:ignitium_chestplate',
        'cataclysm:ignitium_elytra_chestplate',
        'cataclysm:ignitium_leggings',
        'cataclysm:ignitium_boots',
        'cataclysm:cursium_helmet',
        'cataclysm:cursium_chestplate',
        'cataclysm:cursium_leggings',
        'cataclysm:cursium_boots',
        'cataclysm:bone_reptile_helmet',
        'cataclysm:bone_reptile_chestplate',
        'cataclysm:monstrous_helm',
        'cataclysm:bloom_stone_pauldrons'
    ]
    cosmeticArmors.forEach(armor => {
        event.add(armor, [
            Text.of('§d★ Cosmetic Trophy Armor (0 Defense)'),
            Text.of('§7Equip in Cosmetic Armor Reworked slots!')
        ])
    })
})