// kubejs/server_scripts/01_progression/phase_2_allthemodium.js

ServerEvents.recipes(event => {
    // ========================================================================
    // 1. KULINÁŘSKÝ RITUÁL NA WITHER SKELETON LEBKY (My Nether's Delight)
    // ========================================================================
    const spicyNetherDishes = [
        'mynethersdelight:spicy_hoglin_stew',
        'mynethersdelight:spicy_skewer',
        'mynethersdelight:spicy_noodle_soup',
        'mynethersdelight:chilidog'
    ]

    event.shaped('minecraft:wither_skeleton_skull', [
        ' B ',
        'BCB',
        'FMN'
    ], {
        B: 'minecraft:bone_block',
        C: 'minecraft:coal_block',
        F: 'twilightforest:fiery_blood',
        M: Ingredient.of(spicyNetherDishes),
        N: 'twilightforest:carminite'
    }).id('kubejs:wither_skull_culinary_ritual')

    // ========================================================================
    // 2. ZÁMEK MINING DIMENZE (Teleport Pad na Astral Sorcery Luminance Altaru!)
    // ========================================================================
    event.remove({ output: 'allthemodium:teleport_pad' })
    event.custom({
        type: 'astralsorcery:altar_crafting',
        base_focus_shatter_chance: 0.0,
        duration: 200,
        effects: [
            'astralsorcery:default_altar_sparkle',
            'astralsorcery:default_central_beam',
            'astralsorcery:default_lumen_input',
            'astralsorcery:default_relay_input'
        ],
        grid: {
            key: {
                A: { type: 'item', ingredient: { item: 'allthemodium:allthemodium_nugget' } },
                N: { type: 'item', ingredient: { item: 'minecraft:nether_star' } },
                F: { type: 'item', ingredient: { item: 'twilightforest:fiery_blood' } },
                E: { type: 'item', ingredient: { item: 'minecraft:echo_shard' } },
                S: { type: 'item', ingredient: { item: 'astralsorcery:starmetal_ingot' } },
                Y: { type: 'item', ingredient: { item: 'twilightforest:alpha_yeti_fur' } },
                I: { type: 'item', ingredient: { item: 'twilightforest:ice_bomb' } }
            },
            pattern: [
                'ANA',
                'FEF',
                'SYI'
            ],
            relay_pattern: [
                '     ',
                '     ',
                '     ',
                '     ',
                '     '
            ]
        },
        may_chain: false,
        only_night: true,
        output_modifiers: [],
        outputs: [
            {
                count: 1,
                id: 'allthemodium:teleport_pad'
            }
        ],
        required_additional_inputs: [
            {
                count: 1,
                ingredient: { item: 'astralsorcery:illumination_powder' }
            }
        ],
        required_fluid: [
            {
                amount: 1000,
                id: 'astralsorcery:liquid_starlight'
            }
        ],
        required_lumen: [],
        required_starlight: [],
        required_type: 'resonance'
    }).id('kubejs:altar/teleport_pad_gated')

    // ========================================================================
    // 3. ENERGETICKÝ SKOK (Gas-Burning Generator & Induction Matrix)
    // ========================================================================
    event.remove({ output: 'mekanismgenerators:gas_burning_generator' })
    event.shaped('mekanismgenerators:gas_burning_generator', [
        'AFA',
        'SCS',
        'AEA'
    ], {
        A: 'allthemodium:allthemodium_ingot',
        F: 'twilightforest:fiery_blood',
        S: 'mekanism:ingot_steel',
        C: 'mekanism:electrolytic_core',
        E: 'mekanism:alloy_infused'
    })

    event.remove({ output: 'mekanism:induction_casing' })
    event.shaped('4x mekanism:induction_casing', [
        'SGS',
        'GAG',
        'SGS'
    ], {
        S: 'mekanism:ingot_steel',
        G: 'mekanism:energy_tablet',
        A: 'allthemodium:allthemodium_nugget'
    })

    // ========================================================================
    // 4. AE2 QUANTUM RING, QUANTUM ENTANGLOPORTER, APPLIED MEKANISTICS & DELIGHT
    // ========================================================================
    event.remove({ output: 'ae2:quantum_ring' })
    event.shaped('ae2:quantum_ring', [
        'SAS',
        'EPL',
        'SAS'
    ], {
        S: 'astralsorcery:starmetal_ingot',
        A: 'allthemodium:allthemodium_ingot',
        E: 'ae2:engineering_processor',
        P: 'ae2:logic_processor',
        L: 'ae2:fluix_smart_dense_cable'
    })

    event.remove({ output: 'ae2:quantum_link' })
    event.shaped('ae2:quantum_link', [
        'GQG',
        'QNP',
        'GQG'
    ], {
        G: 'ae2:quartz_glass',
        Q: 'ae2:fluix_pearl',
        N: 'minecraft:nether_star',
        P: 'minecraft:echo_shard'
    })

    event.remove({ output: 'mekanism:quantum_entangloporter' })
    event.shaped('mekanism:quantum_entangloporter', [
        'SAS',
        'TNT',
        'SAS'
    ], {
        S: 'astralsorcery:starmetal_ingot',
        A: 'allthemodium:allthemodium_ingot',
        T: 'mekanism:teleportation_core',
        N: 'minecraft:nether_star'
    })

    event.remove({ output: 'appmek:chemical_cell_housing' })
    event.shaped('appmek:chemical_cell_housing', [
        'GPG',
        'OAO',
        'OOO'
    ], {
        G: 'ae2:quartz_glass',
        P: 'industrialforegoing:plastic',
        O: 'mekanism:ingot_osmium',
        A: 'allthemodium:allthemodium_nugget'
    })

    // ========================================================================
    // 5. FLUX NETWORKS (Bezdrátová distribuce energie - BEZ BATERIÍ!)
    // ========================================================================
    event.remove({ output: 'fluxnetworks:flux_plug' })
    event.shaped('fluxnetworks:flux_plug', [
        ' C ',
        'CNC',
        ' C '
    ], {
        C: 'fluxnetworks:flux_core',
        N: 'minecraft:nether_star'
    })

    event.remove({ output: 'fluxnetworks:flux_point' })
    event.shaped('fluxnetworks:flux_point', [
        ' C ',
        'CAC',
        ' C '
    ], {
        C: 'fluxnetworks:flux_core',
        A: 'allthemodium:allthemodium_ingot'
    })
})