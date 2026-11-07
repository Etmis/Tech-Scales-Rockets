// kubejs/server_scripts/01_progression/phase_7_endgame.js

ServerEvents.recipes(event => {
    // ========================================================================
    // 1. BOŽSKÁ KOVÁŘSKÁ FÚZE: DUÁLNÍ SLITINY, SINGULARITA, ŠABLONA A ATM ALLOY VÝZBROJ
    // ========================================================================

    // A) 3 Duální slitiny v Mekanism Combineru
    const dualAlloys = [
        ['allthemodium:allthemodium_ingot', 'allthemodium:vibranium_ingot', 'allthemodium:vibranium_allthemodium_alloy_ingot'],
        ['allthemodium:vibranium_ingot', 'allthemodium:unobtainium_ingot', 'allthemodium:unobtainium_vibranium_alloy_ingot'],
        ['allthemodium:unobtainium_ingot', 'allthemodium:allthemodium_ingot', 'allthemodium:unobtainium_allthemodium_alloy_ingot']
    ]

    dualAlloys.forEach(([mainIn, extraIn, alloyOut]) => {
        event.remove({ output: alloyOut })
        event.custom({
            type: 'mekanism:combining',
            main_input: {
                count: 1,
                item: mainIn
            },
            extra_input: {
                count: 1,
                item: extraIn
            },
            output: {
                count: 1,
                id: alloyOut
            }
        }).id(`kubejs:combining/${alloyOut.split(':')[1]}`)
    })

    // B) KubeJS Jádro: Tri-Realm Alloy Singularity (V IF Dissolution Chamberu s 2000 mB Ether Gasu)
    event.custom({
        type: 'industrialforegoing:dissolution_chamber',
        input: [
            { item: 'allthemodium:vibranium_allthemodium_alloy_ingot' },
            { item: 'allthemodium:unobtainium_vibranium_alloy_ingot' },
            { item: 'allthemodium:unobtainium_allthemodium_alloy_ingot' },
            { item: 'mekanism:pellet_antimatter' },
            { item: 'extendedae:entro_ingot' },
            { item: 'allthemodium:allthemodium_carrot' },
            { item: 'cataclysm:witherite_ingot' },
            { item: 'kubejs:cataclysmic_flux' }
        ],
        inputFluid: {
            amount: 2000,
            fluid: 'industrialforegoing:ether_gas'
        },
        output: {
            count: 1,
            id: 'kubejs:tri_realm_alloy_singularity'
        },
        processingTime: 600
    }).id('kubejs:dissolution/tri_realm_alloy_singularity')

    // C) KubeJS Šablona: Cosmic Alloy Smithing Template (Na Astral Sorcery Resonance Altaru!)
    event.custom({
        type: 'astralsorcery:altar_crafting',
        base_focus_shatter_chance: 0.0,
        duration: 400,
        effects: [
            'astralsorcery:default_altar_sparkle',
            'astralsorcery:default_central_beam',
            'astralsorcery:default_lumen_input',
            'astralsorcery:default_relay_input'
        ],
        grid: {
            key: {
                F: { type: 'item', ingredient: { item: 'iceandfire:dragonsteel_fire_ingot' } },
                L: { type: 'item', ingredient: { item: 'iceandfire:dragonsteel_lightning_ingot' } },
                I: { type: 'item', ingredient: { item: 'iceandfire:dragonsteel_ice_ingot' } },
                D: { type: 'item', ingredient: { item: 'ad_astra:desh_ingot' } },
                S: { type: 'item', ingredient: { item: 'allthemodium:unobtainium_upgrade_smithing_template' } },
                O: { type: 'item', ingredient: { item: 'ad_astra:ostrum_ingot' } },
                C: { type: 'item', ingredient: { item: 'ad_astra:calorite_ingot' } },
                U: { type: 'item', ingredient: { item: 'astralsorcery:starmetal_ingot' } },
                W: { type: 'item', ingredient: { item: 'cataclysm:witherite_ingot' } },
                X: { type: 'item', ingredient: { item: 'kubejs:cataclysmic_flux' } }
            },
            pattern: [
                'FLI',
                'DSO',
                'CUW'
            ],
            relay_pattern: [
                '     ',
                'X   X',
                '     ',
                'X   X',
                '     '
            ]
        },
        may_chain: false,
        only_night: true,
        output_modifiers: [],
        outputs: [
            {
                count: 1,
                id: 'kubejs:cosmic_alloy_smithing_template'
            }
        ],
        required_additional_inputs: [
            {
                count: 1,
                ingredient: { item: 'astralsorcery:illumination_powder' }
            },
            {
                count: 1,
                ingredient: { item: 'astralsorcery:nocturnal_powder' }
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
        required_type: 'radiance'
    }).id('kubejs:altar/cosmic_alloy_smithing_template')

    // D) Finální Kování ve Smithing Table (Unobtainium -> ATM Alloy se zachováním enchantů a gemů)
    const alloyUpgrades = [
        ['allthemodium:unobtainium_sword', 'allthemodium:alloy_sword'],
        ['allthemodium:unobtainium_pickaxe', 'allthemodium:alloy_pick'],
        ['allthemodium:unobtainium_axe', 'allthemodium:alloy_axe'],
        ['allthemodium:unobtainium_shovel', 'allthemodium:alloy_shovel']
    ]

    alloyUpgrades.forEach(([unobTool, alloyTool]) => {
        event.remove({ output: alloyTool })
        event.smithing(
            alloyTool,
            'kubejs:cosmic_alloy_smithing_template',
            unobTool,
            'kubejs:tri_realm_alloy_singularity'
        ).id(`kubejs:smithing/${alloyTool.split(':')[1]}`)
    })

    // ========================================================================
    // 2. THE ALLTHEMODIUM APPLE - MASTERCHEF VÝZVA (Farmer's Delight Cooking Pot)
    // ========================================================================
    event.remove({ output: 'allthemodium:allthemodium_apple' })

    event.custom({
        type: 'farmersdelight:cooking',
        cookingtime: 600,
        experience: 100.0,
        ingredients: [
            { item: 'allthemodium:unobtainium_block' },
            { item: 'cataclysm:witherite_ingot' },
            { item: 'twilightforest:meef_stroganoff' },
            { item: 'mynethersdelight:striderloaf' },
            { item: 'brewinandchewin:fiery_fondue_pot' },
            { item: 'ends_delight:dragon_leg_with_sauce' }
        ],
        recipe_book_tab: 'misc',
        container: {
            id: 'allthemodium:allthemodium_carrot'
        },
        result: {
            count: 1,
            id: 'allthemodium:allthemodium_apple'
        }
    }).id('kubejs:masterchef_allthemodium_apple')

    // ========================================================================
    // 3. INDUSTRIAL FOREGOING: ORE LASER BASE
    // ========================================================================
    event.remove({ output: 'industrialforegoing:ore_laser_base' })
    event.shaped('industrialforegoing:ore_laser_base', [
        'UAU',
        'LML',
        'WIW'
    ], {
        U: 'allthemodium:unobtainium_ingot',
        A: 'mekanism:pellet_antimatter',
        L: 'astralsorcery:glass_lens',
        M: 'mekanism:digital_miner',
        W: 'cataclysm:witherite_ingot',
        I: 'industrialforegoing:machine_frame_supreme'
    })

    // ========================================================================
    // 4. ANGEL RING 3
    // ========================================================================
    event.remove({ output: 'angelring:angel_ring' })
    event.shaped('angelring:angel_ring', [
        'UAU',
        'PJP',
        'CWC'
    ], {
        U: 'allthemodium:unobtainium_ingot',
        A: 'allthemodium:allthemodium_apple',
        P: 'mekanism:pellet_antimatter',
        J: 'mekanism:jetpack',
        C: 'astralsorcery:celestial_crystal',
        W: 'cataclysm:witherite_ingot'
    })

    // ========================================================================
    // 5. CREATIVE / INFINITY UPGRADE (Sophisticated Backpacks)
    // ========================================================================
    event.remove({ output: 'sophisticatedbackpacks:infinity_upgrade' })
    event.shaped('sophisticatedbackpacks:infinity_upgrade', [
        'PAP',
        'ABA',
        'UWU'
    ], {
        P: 'mekanism:pellet_antimatter',
        A: 'allthemodium:allthemodium_apple',
        B: 'sophisticatedbackpacks:stack_upgrade_tier_4',
        U: 'allthemodium:unobtainium_block',
        W: 'cataclysm:witherite_ingot'
    })
})