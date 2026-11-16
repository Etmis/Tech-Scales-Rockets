// kubejs/server_scripts/01_progression/phase_0_1_twilight.js

ServerEvents.recipes(event => {
    // ========================================================================
    // FÁZE 0: PRŮMYSLOVÝ ZÁKLAD, PLASTY (IF), BIO-PALIVO A RANÉ QoL
    // ========================================================================

    // 1. Industrial Foregoing - Pity Machine Frame
    event.remove({ output: 'industrialforegoing:machine_frame_pity' })
    event.shaped('industrialforegoing:machine_frame_pity', [
        'WIW',
        'ORO',
        'WIW'
    ], {
        W: '#minecraft:logs',
        I: 'minecraft:iron_ingot',
        O: 'mekanism:ingot_osmium',
        R: 'minecraft:redstone_block'
    })

    // 2. Plast jako klíčový izolant pro AE2 Fluix kabely a Mekanism Advanced kabely
    event.remove({ id: 'ae2:network/cables/glass_fluix' })
    event.shaped('4x ae2:fluix_glass_cable', [
        'QFQ',
        'FPF',
        'QFQ'
    ], {
        Q: 'ae2:quartz_fiber',
        F: 'ae2:fluix_crystal',
        P: 'industrialforegoing:plastic'
    })

    event.remove({ output: 'mekanism:advanced_universal_cable' })
    event.shaped('8x mekanism:advanced_universal_cable', [
        'CCC',
        'PAP',
        'CCC'
    ], {
        C: 'mekanism:basic_universal_cable',
        P: 'industrialforegoing:plastic',
        A: 'mekanism:alloy_infused'
    })

    // 3. Raná gastronomie & Bio-Generator: Slunečnicový olej -> Mekanism Bio-Fuel
    event.shapeless('8x mekanism:bio_fuel', [
        'sunflowerdelight:sunflower_oil'
    ]).id('kubejs:sunflower_oil_to_biofuel')

    // 4. Rané QoL: Simple Magnets & Moving Elevators (Osmium / Ocel)
    event.remove({ output: 'simplemagnets:basicmagnet' })
    event.shaped('simplemagnets:basicmagnet', [
        'IOB',
        'OEO',
        'IOR'
    ], {
        I: 'minecraft:iron_ingot',
        O: 'mekanism:ingot_osmium',
        B: 'minecraft:lapis_lazuli',
        E: 'minecraft:ender_pearl',
        R: 'minecraft:redstone'
    })

    event.remove({ output: 'movingelevators:elevator_block' })
    event.shaped('2x movingelevators:elevator_block', [
        'SIS',
        'OPO',
        'SIS'
    ], {
        S: 'mekanism:ingot_steel',
        I: 'minecraft:iron_ingot',
        O: 'mekanism:ingot_osmium',
        P: 'minecraft:ender_pearl'
    })

    // ========================================================================
    // ČÁST 1A: PRVNÍ PRŮLOM (Naga -> Twilight Lich + Solární/Větrná energie)
    // ========================================================================

    // 1. Mekanism Jetpack
    event.remove({ output: 'mekanism:jetpack' })
    event.shaped('mekanism:jetpack', [
        'SNS',
        'TGT',
        ' L '
    ], {
        S: 'mekanism:ingot_steel',
        N: 'twilightforest:naga_scale',
        T: 'mekanism:ingot_osmium',
        G: 'mekanism:basic_chemical_tank',
        L: 'twilightforest:lich_trophy'
    })

    // 2. Wind Generator
    event.remove({ output: 'mekanismgenerators:wind_generator' })
    event.shaped('mekanismgenerators:wind_generator', [
        ' O ',
        'OPO',
        'ECE'
    ], {
        O: 'mekanism:ingot_osmium',
        P: 'industrialforegoing:plastic',
        E: 'twilightforest:naga_scale',
        C: 'mekanism:basic_control_circuit'
    })

    // 3. Solar Panel & Advanced Solar Generator
    event.remove({ output: 'mekanismgenerators:solar_panel' })
    event.shaped('mekanismgenerators:solar_panel', [
        'AAA',
        'RPR',
        'OOO'
    ], {
        A: 'astralsorcery:aquamarine',
        R: 'minecraft:redstone',
        P: 'industrialforegoing:plastic',
        O: 'mekanism:ingot_osmium'
    })

    event.remove({ output: 'mekanismgenerators:advanced_solar_generator' })
    event.shaped('mekanismgenerators:advanced_solar_generator', [
        'SGS',
        'SGS',
        'ILI'
    ], {
        S: 'mekanismgenerators:solar_generator',
        G: 'astralsorcery:glass_lens',
        I: 'mekanism:ingot_steel',
        L: 'twilightforest:naga_scale'
    })

    // ========================================================================
    // ČÁST 1B: HLUBOKÝ HVOZD (Minoshroom, Hydra, Phantoms, Ur-Ghast, Yeti, Snow Queen)
    // ========================================================================

    // 1. Industrial Foregoing - 2. Stupeň: Simple Machine Frame & Dissolution Chamber
    event.remove({ output: 'industrialforegoing:machine_frame_simple' })
    event.shaped('industrialforegoing:machine_frame_simple', [
        'PNP',
        'CMC',
        'ISI'
    ], {
        P: 'industrialforegoing:plastic',
        N: 'twilightforest:naga_scale',
        C: 'twilightforest:carminite',
        M: 'industrialforegoing:machine_frame_pity',
        I: 'mekanism:ingot_steel',
        S: 'mekanism:basic_control_circuit'
    })

    event.remove({ output: 'industrialforegoing:dissolution_chamber' })
    event.shaped('industrialforegoing:dissolution_chamber', [
        'PCP',
        'BMB',
        'GDG'
    ], {
        P: 'industrialforegoing:plastic',
        C: 'twilightforest:carminite',
        B: 'minecraft:bucket',
        M: 'industrialforegoing:machine_frame_simple',
        G: 'minecraft:gold_ingot',
        D: 'minecraft:diamond'
    })

    // 2. Minoshroom: Teleportation Core
    event.remove({ output: 'mekanism:teleportation_core' })
    event.shaped('mekanism:teleportation_core', [
        'LAL',
        'GDG',
        'LML'
    ], {
        L: 'minecraft:lapis_lazuli',
        A: 'mekanism:alloy_atomic',
        G: 'minecraft:gold_ingot',
        D: 'minecraft:diamond',
        M: 'twilightforest:meef_stroganoff'
    })

    // 3. Mekanism Digital Miner
    event.remove({ output: 'mekanism:digital_miner' })
    event.shaped('mekanism:digital_miner', [
        'KCK',
        'TRT',
        'SMS'
    ], {
        K: 'twilightforest:knightmetal_ingot',
        C: 'twilightforest:carminite',
        T: 'twilightforest:fiery_tears',
        R: 'mekanism:robit',
        S: 'mekanism:teleportation_core',
        M: 'industrialforegoing:machine_frame_simple'
    })

    // 4. AE2 ME Controller (s astralsorcery:illumination_powder)
    event.remove({ output: 'ae2:controller' })
    event.shaped('ae2:controller', [
        'SYS',
        'FEF',
        'AQP'
    ], {
        S: 'ae2:smooth_sky_stone_block',
        Y: 'twilightforest:alpha_yeti_fur',
        F: 'twilightforest:fiery_blood',
        E: 'ae2:engineering_processor',
        A: 'astralsorcery:aquamarine',
        Q: 'twilightforest:ice_bomb',
        P: 'astralsorcery:illumination_powder'
    })

    // 5. Flux Networks - Základní Flux Core
    event.remove({ output: 'fluxnetworks:flux_core' })
    event.shaped('4x fluxnetworks:flux_core', [
        'FOF',
        'OCO',
        'FOF'
    ], {
        F: 'fluxnetworks:flux_dust',
        O: 'minecraft:obsidian',
        C: 'twilightforest:carminite'
    })

    // 6. Applied Experienced - Experience Cell Housing (Carminite + Hellshelf + Seashelf)
    event.remove({ output: 'appex:experience_cell_housing' })
    event.shaped('appex:experience_cell_housing', [
        'GCG',
        'H S',
        'III'
    ], {
        G: 'ae2:quartz_glass',
        C: 'twilightforest:carminite',
        H: 'apothic_enchanting:hellshelf',
        S: 'apothic_enchanting:seashelf',
        I: 'mekanism:ingot_osmium'
    })
})

// ============================================================================
// OPRAVA DROPŮ PRO MEEF STROGANOFF
// ============================================================================
EntityEvents.death('twilightforest:minotaur', event => {
    let killer = event.source.player
    let hasKnife = killer && killer.mainHandItem.hasTag('c:tools/knives')
    if (hasKnife || Math.random() < 0.4) {
        event.entity.block.popItem('twilightdelight:raw_tomahawk_smeak')
    }
})