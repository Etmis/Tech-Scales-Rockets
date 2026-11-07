// kubejs/server_scripts/01_progression/phase_4_ad_astra.js

ServerEvents.recipes(event => {
    // ========================================================================
    // 0. OPRAVA VAROVÁNÍ Z LOGU (Rozbité recepty z módů s prázdnými ingrediencemi)
    // ========================================================================
    const brokenModRecipes = [
        'allthemodium:unobtainium_dust_from_ore_crushing',
        'allthemodium:vibranium_dust_from_ore_crushing',
        'allthemodium:allthemodium_dust_from_ore_crushing',
        'allthemodium:ancient_chiseled_stone_bricks_from_crushing',
        'allthemodium:ancient_cracked_stone_bricks_from_crushing',
        'storagedrawers:personal_key_cofh',
        'apotheosis:book'
    ]
    brokenModRecipes.forEach(recipeId => {
        event.remove({ id: recipeId })
    })

    // ========================================================================
    // 1. INDUSTRIAL FOREGOING - 4. STUPEŇ (Wither Milking & Supreme Frame)
    // ========================================================================

    event.remove({ output: 'industrialforegoing:fluid_laser_base' })
    event.shaped('industrialforegoing:fluid_laser_base', [
        'PLP',
        'VAV',
        'GMG'
    ], {
        P: 'industrialforegoing:plastic',
        L: 'astralsorcery:glass_lens',
        V: 'allthemodium:vibranium_ingot',
        A: 'industrialforegoing:machine_frame_advanced',
        G: 'mekanism:elite_control_circuit',
        M: 'minecraft:bucket'
    })

    event.remove({ output: 'industrialforegoing:machine_frame_supreme' })
    event.custom({
        type: 'industrialforegoing:dissolution_chamber',
        input: [
            { item: 'industrialforegoing:plastic' },
            { item: 'industrialforegoing:machine_frame_advanced' },
            { item: 'industrialforegoing:plastic' },
            { item: 'allthemodium:vibranium_ingot' },
            { item: 'allthemodium:vibranium_ingot' },
            { item: 'ad_astra:desh_plate' },
            { item: 'mekanism:elite_control_circuit' },
            { item: 'ad_astra:desh_plate' }
        ],
        inputFluid: {
            amount: 500,
            fluid: 'industrialforegoing:ether_gas'
        },
        output: {
            count: 1,
            id: 'industrialforegoing:machine_frame_supreme'
        },
        processingTime: 400
    }).id('kubejs:dissolution/machine_frame_supreme')

    // ========================================================================
    // 2. POTRUBNÍ SYNTÉZA TEKUTÉHO RAKETOVÉHO PALIVA V DISSOLUTION CHAMBERU
    // ========================================================================

    // A) Běžné Rocket Fuel (1000 mB ad_astra:fuel)
    event.custom({
        type: 'industrialforegoing:dissolution_chamber',
        input: [
            { item: 'minecraft:dragon_breath' },
            { item: 'iceandfire:fire_dragon_blood' },
            { item: 'iceandfire:lightning_dragon_blood' },
            { item: 'mekanism:bio_fuel' }
        ],
        inputFluid: {
            amount: 1000,
            fluid: 'mekanism:ethene'
        },
        outputFluid: {
            amount: 1000,
            id: 'ad_astra:fuel'
        },
        processingTime: 100
    }).id('kubejs:dissolution/liquid_rocket_fuel')

    // B) Pokročilý Cryo Fuel (1000 mB ad_astra:cryo_fuel)
    event.custom({
        type: 'industrialforegoing:dissolution_chamber',
        input: [
            { item: 'ad_astra:ice_shard' },
            { item: 'ad_astra:ice_shard' },
            { item: 'ad_astra:ice_shard' },
            { item: 'ad_astra:ice_shard' },
            { item: 'ad_astra:ostrum_ingot' }
        ],
        inputFluid: {
            amount: 1000,
            fluid: 'astralsorcery:liquid_starlight'
        },
        outputFluid: {
            amount: 1000,
            id: 'ad_astra:cryo_fuel'
        },
        processingTime: 120
    }).id('kubejs:dissolution/liquid_cryo_fuel')

    // ========================================================================
    // 3. HERMETIZACE VIBRANIUM BRNĚNÍ (Rozklad skafandrů -> Jádra -> Enchant Knihy)
    // ========================================================================

    // KROK A: Rozklad skafandrů v Dissolution Chamberu na technologická jádra
    event.custom({
        type: 'industrialforegoing:dissolution_chamber',
        input: [
            { item: 'ad_astra:space_helmet' },
            { item: 'ad_astra:space_suit' },
            { item: 'astralsorcery:aquamarine' }
        ],
        inputFluid: { amount: 250, fluid: 'astralsorcery:liquid_starlight' },
        output: { count: 1, id: 'kubejs:core_space_breathing' },
        processingTime: 200
    }).id('kubejs:dissolution/core_space_breathing')

    event.custom({
        type: 'industrialforegoing:dissolution_chamber',
        input: [
            { item: 'ad_astra:netherite_space_suit' },
            { item: 'iceandfire:dragonsteel_fire_ingot' },
            { item: 'ad_astra:ostrum_plate' }
        ],
        inputFluid: { amount: 500, fluid: 'astralsorcery:liquid_starlight' },
        output: { count: 1, id: 'kubejs:core_space_fire_proof' },
        processingTime: 250
    }).id('kubejs:dissolution/core_space_fire_proof')

    event.custom({
        type: 'industrialforegoing:dissolution_chamber',
        input: [
            { item: 'ad_astra:netherite_space_helmet' },
            { item: 'ad_astra:netherite_space_pants' },
            { item: 'ad_astra:ostrum_plate' }
        ],
        inputFluid: { amount: 500, fluid: 'astralsorcery:liquid_starlight' },
        output: { count: 1, id: 'kubejs:core_acid_rain_proof' },
        processingTime: 250
    }).id('kubejs:dissolution/core_acid_rain_proof')

    event.custom({
        type: 'industrialforegoing:dissolution_chamber',
        input: [
            { item: 'ad_astra:netherite_space_boots' },
            { item: 'iceandfire:dragonsteel_lightning_ingot' },
            { item: 'ad_astra:desh_plate' }
        ],
        inputFluid: { amount: 500, fluid: 'astralsorcery:liquid_starlight' },
        output: { count: 1, id: 'kubejs:core_gravity_normalizing' },
        processingTime: 250
    }).id('kubejs:dissolution/core_gravity_normalizing')

    // KROK B: Zapsání jader do Enchanted Books (1.21.1 Data Components formát!)
    const spaceBooks = [
        ['kubejs:core_space_breathing', 'ad_astra_giselle_addon:space_breathing'],
        ['kubejs:core_space_fire_proof', 'ad_astra_giselle_addon:space_fire_proof'],
        ['kubejs:core_acid_rain_proof', 'ad_astra_giselle_addon:acid_rain_proof'],
        ['kubejs:core_gravity_normalizing', 'ad_astra_giselle_addon:gravity_normalizing']
    ]

    spaceBooks.forEach(([coreItem, enchId]) => {
        event.custom({
            type: 'minecraft:crafting_shapeless',
            category: 'misc',
            ingredients: [
                { item: 'minecraft:book' },
                { item: coreItem }
            ],
            result: {
                id: 'minecraft:enchanted_book',
                count: 1,
                components: {
                    'minecraft:stored_enchantments': {
                        levels: {
                            [enchId]: 1
                        }
                    }
                }
            }
        }).id(`kubejs:bind_${enchId.split(':')[1]}`)
    })

    // ========================================================================
    // 4. ZÁMKY RAKETOVÝCH MOTORŮ (T1 až T4 - 100% BEZ KYBLÍKŮ!)
    // ========================================================================

    // Raketa Tier 1 - Steel Engine
    event.remove({ output: 'ad_astra:steel_engine' })
    event.shaped('ad_astra:steel_engine', [
        'VLV',
        'SBS',
        ' F '
    ], {
        V: 'allthemodium:vibranium_ingot',
        L: 'astralsorcery:glass_lens',
        S: 'ad_astra:steel_plate',
        B: 'minecraft:dragon_breath',
        F: 'ad_astra:fan'
    })

    // Raketa Tier 2 - Desh Engine
    event.remove({ output: 'ad_astra:desh_engine' })
    event.shaped('ad_astra:desh_engine', [
        'DLD',
        'ESE',
        ' F '
    ], {
        D: 'ad_astra:desh_plate',
        L: 'iceandfire:dragonsteel_lightning_ingot',
        E: 'ad_astra:steel_engine',
        S: 'ad_astra:ice_shard',
        F: 'ad_astra:fan'
    })

    // Raketa Tier 3 - Ostrum Engine
    event.remove({ output: 'ad_astra:ostrum_engine' })
    event.shaped('ad_astra:ostrum_engine', [
        'OFO',
        'EDE',
        ' A '
    ], {
        O: 'ad_astra:ostrum_plate',
        F: 'iceandfire:dragonsteel_fire_ingot',
        E: 'ad_astra:desh_engine',
        D: 'iceandfire:fire_dragon_blood',
        A: 'ad_astra:fan'
    })

    // Raketa Tier 4 - Calorite Engine (100% bez-kyblíková syntéza v Dissolution Chamberu!)
    event.remove({ output: 'ad_astra:calorite_engine' })
    event.custom({
        type: 'industrialforegoing:dissolution_chamber',
        input: [
            { item: 'ad_astra:ostrum_plate' },
            { item: 'iceandfire:dragonsteel_fire_ingot' },
            { item: 'ad_astra:ostrum_plate' },
            { item: 'ad_astra:ostrum_engine' },
            { item: 'industrialforegoing:machine_frame_supreme' },
            { item: 'ad_astra:ice_shard' },
            { item: 'iceandfire:dragonsteel_lightning_ingot' },
            { item: 'ad_astra:fan' }
        ],
        inputFluid: {
            amount: 2000,
            fluid: 'industrialforegoing:ether_gas'
        },
        output: {
            count: 1,
            id: 'ad_astra:calorite_engine'
        },
        processingTime: 400
    }).id('kubejs:dissolution/calorite_engine_no_buckets')

    // ========================================================================
    // 5. FISSION REACTOR, SPS & SOLÁRNÍ AKTIVÁTOR
    // ========================================================================

    event.remove({ output: 'mekanismgenerators:fission_reactor_casing' })
    event.shaped('4x mekanismgenerators:fission_reactor_casing', [
        ' L ',
        'LSL',
        ' D '
    ], {
        L: 'mekanism:ingot_lead',
        S: 'mekanism:steel_casing',
        D: 'ad_astra:desh_plate'
    })

    event.remove({ output: 'mekanism:solar_neutron_activator' })
    event.shaped('mekanism:solar_neutron_activator', [
        'LSL',
        'DCD',
        'BPB'
    ], {
        L: 'astralsorcery:glass_lens',
        S: 'mekanismgenerators:solar_generator',
        D: 'ad_astra:desh_plate',
        C: 'mekanism:steel_casing',
        B: 'mekanism:alloy_atomic',
        P: 'mekanism:elite_control_circuit'
    })

    event.remove({ output: 'mekanism:sps_casing' })
    event.shaped('2x mekanism:sps_casing', [
        'CIC',
        'DPD',
        'CIC'
    ], {
        C: 'ad_astra:calorite_plate',
        I: 'ad_astra:ice_shard',
        D: 'iceandfire:dragonsteel_ice_ingot',
        P: 'mekanism:pellet_polonium'
    })
})