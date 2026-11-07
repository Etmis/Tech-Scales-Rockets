// kubejs/server_scripts/01_progression/phase_6_unobtainium.js

ServerEvents.recipes(event => {
    // ========================================================================
    // 0. ZÁKAZ IF ORE WASHING A MEKANISM 2x-5x LINEK PRO RAW UNOBTAINIUM & BLOCK
    // ========================================================================
    const protectedUnobtainiumInputs = [
        'allthemodium:raw_unobtainium',
        'allthemodium:raw_unobtainium_block',
        'allthemodium:unobtainium_ore',
        'allthemodium:unobtainium_slate_ore'
    ]

    // 1. Smazání podle vstupu a typu stroje (Mekanism + Industrial Foregoing)
    protectedUnobtainiumInputs.forEach(item => {
        event.remove({ type: 'mekanism:purifying', input: item })
        event.remove({ type: 'mekanism:injecting', input: item })
        event.remove({ type: 'mekanism:dissolution', input: item })
        event.remove({ type: 'mekanism:enriching', input: item })
        event.remove({ type: 'mekanism:crushing', input: item })
        event.remove({ type: 'minecraft:smelting', input: item })
        event.remove({ type: 'minecraft:blasting', input: item })
        event.remove({ type: 'industrialforegoing:washing_factory', input: item })
    })

    // 2. Smazání všech receptů, které produkují Unobtainium Clump, Shard, Dirty Dust, Crystal nebo Raw Ore Meat
    const bannedUnobtainiumIntermediates = [
        'allthemodium:unobtainium_clump',
        'allthemodium:unobtainium_shard',
        'allthemodium:dirty_unobtainium_dust',
        'allthemodium:unobtainium_crystal',
        'allthemodium:unobtainium_dust'
    ]
    bannedUnobtainiumIntermediates.forEach(intermediate => {
        event.remove({ output: intermediate })
    })

    // 3. Pojistka přes ID receptů (Allthemodium + Mekanism + IF)
    event.remove({ id: /allthemodium:.*unobtainium.*(purif|inject|dissol|enrich|crush|smelt|blast|clump|shard|crystal|slurry|washing)/ })
    event.remove({ id: /mekanism:processing\/unobtainium\/.*/ })
    event.remove({ id: /industrialforegoing:.*unobtainium.*/ })

    // ========================================================================
    // 1. VÝROBA CATACLYSMIC FLUX A FÚZE UNOBTAINIA V COMBINERU (Poměr 1:3)
    // ========================================================================

    event.shaped('4x kubejs:cataclysmic_flux', [
        ' A ',
        'IVC',
        ' M '
    ], {
        A: 'cataclysm:ancient_metal_ingot',
        I: 'cataclysm:ignitium_ingot',
        V: 'cataclysm:void_core',
        C: 'cataclysm:cursium_ingot',
        M: 'ad_astra:calorite_ingot'
    }).id('kubejs:cataclysmic_flux_crafting')

    event.custom({
        type: 'mekanism:combining',
        main_input: {
            count: 3,
            item: 'allthemodium:raw_unobtainium'
        },
        extra_input: {
            count: 1,
            item: 'kubejs:cataclysmic_flux'
        },
        output: {
            count: 3,
            id: 'allthemodium:unobtainium_ingot'
        }
    }).id('kubejs:combining/unobtainium_ingot_from_flux')

    // ========================================================================
    // 2. MNOŽENÍ UNOBTAINIUM ŠABLONY NA ASTRAL OLTÁŘI (Vyžaduje šablonu z The Other!)
    // ========================================================================
    // Smazání vanilla duplikace unobtainium šablony v Crafting Table.
    // Hráč musí získat 1. šablonu z Trial Spawneru v ATM Dungeonu (The Other)
    // a následně ji na Astral Oltáři namnožit (1 -> 3) pomocí Ancient Metalu a Monstrous Hornu!
    event.remove({ output: 'allthemodium:unobtainium_upgrade_smithing_template' })
    event.custom({
        type: 'astralsorcery:altar_crafting',
        base_focus_shatter_chance: 0.0,
        duration: 300,
        effects: [
            'astralsorcery:default_altar_sparkle',
            'astralsorcery:default_central_beam',
            'astralsorcery:default_lumen_input',
            'astralsorcery:default_relay_input'
        ],
        grid: {
            key: {
                A: { type: 'item', ingredient: { item: 'cataclysm:ancient_metal_ingot' } },
                M: { type: 'item', ingredient: { item: 'cataclysm:monstrous_horn' } },
                C: { type: 'item', ingredient: { item: 'astralsorcery:celestial_crystal' } },
                U: { type: 'item', ingredient: { item: 'allthemodium:unobtainium_upgrade_smithing_template' } },
                P: { type: 'item', ingredient: { item: 'allthemodium:piglich_heart' } },
                S: { type: 'item', ingredient: { item: 'astralsorcery:starmetal_ingot' } }
            },
            pattern: [
                'AMA',
                'PCP',
                'AUA'
            ],
            relay_pattern: [
                '     ',
                'S   S',
                '     ',
                'S   S',
                '     '
            ]
        },
        may_chain: false,
        only_night: true,
        output_modifiers: [],
        outputs: [
            {
                count: 3,
                id: 'allthemodium:unobtainium_upgrade_smithing_template'
            }
        ],
        required_additional_inputs: [
            {
                count: 1,
                ingredient: { item: 'astralsorcery:nocturnal_powder' }
            },
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
        required_type: 'luminance'
    }).id('kubejs:altar/unobtainium_upgrade_smithing_template')

    const unobtainiumUpgrades = [
        ['allthemodium:vibranium_helmet', 'allthemodium:unobtainium_helmet'],
        ['allthemodium:vibranium_chestplate', 'allthemodium:unobtainium_chestplate'],
        ['allthemodium:vibranium_leggings', 'allthemodium:unobtainium_leggings'],
        ['allthemodium:vibranium_boots', 'allthemodium:unobtainium_boots'],
        ['allthemodium:vibranium_sword', 'allthemodium:unobtainium_sword'],
        ['allthemodium:vibranium_pickaxe', 'allthemodium:unobtainium_pickaxe'],
        ['allthemodium:vibranium_axe', 'allthemodium:unobtainium_axe'],
        ['allthemodium:vibranium_shovel', 'allthemodium:unobtainium_shovel'],
        ['allthemodium:vibranium_hoe', 'allthemodium:unobtainium_hoe']
    ]

    unobtainiumUpgrades.forEach(([vibraniumItem, unobtainiumItem]) => {
        event.remove({ output: unobtainiumItem })
        event.smithing(
            unobtainiumItem,
            'allthemodium:unobtainium_upgrade_smithing_template',
            vibraniumItem,
            'allthemodium:unobtainium_ingot'
        )
    })

    // ========================================================================
    // 3. MEKANISM FÚZNÍ REAKTOR
    // ========================================================================
    event.remove({ output: 'mekanismgenerators:fusion_reactor_controller' })
    event.shaped('mekanismgenerators:fusion_reactor_controller', [
        'CIC',
        'FSF',
        'FFF'
    ], {
        C: 'mekanism_extras:supreme_control_circuit',
        I: 'cataclysm:ignitium_ingot',
        F: 'mekanismgenerators:fusion_reactor_frame',
        S: 'allthemodium:unobtainium_block'
    })

    event.remove({ output: 'mekanismgenerators:fusion_reactor_frame' })
    event.shaped('4x mekanismgenerators:fusion_reactor_frame', [
        'CAC',
        'AUA',
        'CAC'
    ], {
        C: 'ad_astra:calorite_plate',
        A: 'mekanism:alloy_atomic',
        U: 'allthemodium:unobtainium_ingot'
    })

    // ========================================================================
    // 4. EXTENDED AE
    // ========================================================================
    event.remove({ output: 'extendedae:ex_molecular_assembler' })
    event.shaped('extendedae:ex_molecular_assembler', [
        'CIC',
        'AMA',
        'CIC'
    ], {
        C: 'ad_astra:calorite_plate',
        I: 'cataclysm:ignitium_ingot',
        A: 'cataclysm:coral_chunk',
        M: 'ae2:molecular_assembler'
    })

    event.remove({ output: 'extendedae:assembler_matrix_frame' })
    event.shaped('4x extendedae:assembler_matrix_frame', [
        'CIC',
        'IUI',
        'CIC'
    ], {
        C: 'ad_astra:calorite_plate',
        I: 'cataclysm:ignitium_ingot',
        U: 'allthemodium:unobtainium_ingot'
    })

    // ========================================================================
    // 5. TEMPAD
    // ========================================================================
    event.remove({ output: 'tempad:tempad' })
    event.shaped('tempad:tempad', [
        'UIU',
        'VTV',
        'UIU'
    ], {
        U: 'allthemodium:unobtainium_ingot',
        I: 'cataclysm:ignitium_ingot',
        V: 'cataclysm:void_core',
        T: 'mekanism:teleportation_core'
    })
})