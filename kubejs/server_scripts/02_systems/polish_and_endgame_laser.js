// kubejs/server_scripts/02_systems/polish_and_endgame_laser.js

// ============================================================================
// 1. KOMPASY (Prodražení Nature's Compass a Explorer's Compass) + LASER DRILL
// ============================================================================
ServerEvents.recipes(event => {
    // A) Nature's Compass -> Fáze 1A (Vyžaduje Naga Scale, Osmium a Magic Map Focus)
    event.remove({ output: 'naturescompass:naturescompass' })
    event.shaped('naturescompass:naturescompass', [
        'SOS',
        'OCO',
        'SOS'
    ], {
        S: 'twilightforest:naga_scale',
        O: 'mekanism:ingot_osmium',
        C: 'minecraft:compass'
    }).id('kubejs:natures_compass_gated')

    // B) Explorer's Compass -> Fáze 2 (Dražší: Vyžaduje Echo Shard, Carminite, Allthemodium Nugget a Nature's Compass)
    event.remove({ output: 'explorerscompass:explorerscompass' })
    event.shaped('explorerscompass:explorerscompass', [
        'CEC',
        'ANA',
        'CEC'
    ], {
        C: 'twilightforest:carminite',
        E: 'minecraft:echo_shard',
        A: 'allthemodium:allthemodium_nugget',
        N: 'naturescompass:naturescompass'
    }).id('kubejs:explorers_compass_gated')

    // ========================================================================
    // 2. INDUSTRIAL FOREGOING: ORE LASER BASE (Fáze 7 Božská těžba z prázdnoty)
    // ========================================================================
    // Pomocná funkce pro přidání rudy do Laser Drillu (NeoForge 1.21.1 formát)
    const addLaserOre = (idName, outputItem, catalystLens, minDepth, maxDepth, weight) => {
        event.custom({
            type: 'industrialforegoing:laser_drill_ore',
            output: {
                item: outputItem,
                count: 1
            },
            catalyst: {
                item: catalystLens
            },
            rarity: [
                {
                    biome_filter: { whitelist: [], blacklist: [] },
                    dimension_filter: { whitelist: [], blacklist: [] },
                    depth_min: minDepth,
                    depth_max: maxDepth,
                    weight: weight
                }
            ]
        }).id(`kubejs:laser_drill/${idName}`)
    }

    // Božské kovy (Allthemodium = Žlutá čočka, Vibranium = Zelená/Lime, Unobtainium = Magenta)
    addLaserOre('raw_allthemodium', 'allthemodium:raw_allthemodium', 'industrialforegoing:yellow_laser_lens', -64, 256, 8)
    addLaserOre('raw_vibranium', 'allthemodium:raw_vibranium', 'industrialforegoing:lime_laser_lens', -64, 256, 6)
    addLaserOre('raw_unobtainium', 'allthemodium:raw_unobtainium', 'industrialforegoing:magenta_laser_lens', -64, 256, 4)

    // Vesmírné kovy (Desh = Oranžová, Ostrum = Fialová, Calorite = Červená)
    addLaserOre('raw_desh', 'ad_astra:raw_desh', 'industrialforegoing:orange_laser_lens', -64, 256, 12)
    addLaserOre('raw_ostrum', 'ad_astra:raw_ostrum', 'industrialforegoing:purple_laser_lens', -64, 256, 10)
    addLaserOre('raw_calorite', 'ad_astra:raw_calorite', 'industrialforegoing:red_laser_lens', -64, 256, 8)
})

// ============================================================================
// 3. STARTOVNÍ VÝBAVA PŘI PRVNÍM PŘIPOJENÍ DO SVĚTA (Bez batohu)
// ============================================================================
/*PlayerEvents.loggedIn(event => {
    const { player } = event

    if (!player.persistentData.getBoolean('starter_kit_given')) {
        player.persistentData.putBoolean('starter_kit_given', true)

        // 1. Teplé jídlo do začátku (Farmer's Delight)
        player.give('8x farmersdelight:steak_and_potatoes')

        player.tell(Text.gold('★ Welcome to Tech, Scales & Rockets! Open your Quest Book to begin your journey. ★'))
    }
})*/