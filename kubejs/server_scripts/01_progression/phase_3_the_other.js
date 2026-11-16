// kubejs/server_scripts/01_progression/phase_3_the_other.js

ServerEvents.recipes(event => {
    const otherDragonScales = [
        'iceandfire:dragonscales_red',
        'iceandfire:dragonscales_green',
        'iceandfire:dragonscales_bronze',
        'iceandfire:dragonscales_gray',
        'iceandfire:dragonscales_electric',
        'iceandfire:dragonscales_amethyst',
        'iceandfire:dragonscales_copper',
        'iceandfire:dragonscales_black'
    ]

    const dragonBloods = [
        'iceandfire:fire_dragon_blood',
        'iceandfire:lightning_dragon_blood'
    ]

    // ========================================================================
    // 0. ZÁMEK DUPLIKACE VIBRANIUM ŠABLONY ZA THE OTHER A DRAČÍ KOSTI
    // ========================================================================
    // První šablonu hráč vykartáčuje ze Suspicious Soul Sandu v Nether Bastionu,
    // ale na její namnožení pro celou sadu brnění a nástrojů potřebuje Ancient Stone
    // z dimenze The Other a Dračí kosti!
    event.remove({ output: 'allthemodium:vibranium_upgrade_smithing_template' })
    event.shaped('2x allthemodium:vibranium_upgrade_smithing_template', [
        'ATA',
        'DBD',
        'AAA'
    ], {
        A: 'allthemodium:allthemodium_ingot',
        T: 'allthemodium:vibranium_upgrade_smithing_template',
        D: 'iceandfire:dragonbone',
        B: 'allthemodium:ancient_stone'
    }).id('kubejs:vibranium_template_duplication_gated')

    // ========================================================================
    // 1. THE ALLTHEMODIUM CARROT (5minutová Saturation z Fáze 3)
    // ========================================================================
    event.remove({ output: 'allthemodium:allthemodium_carrot' })
    event.custom({
        type: 'farmersdelight:cooking',
        cookingtime: 400,
        experience: 25.0,
        ingredients: [
            { item: 'allthemodium:allthemodium_ingot' },
            { item: 'allthemodium:allthemodium_ingot' },
            { item: 'farmersdelight:stuffed_pumpkin_block' },
            { item: 'corn_delight:nachos_block' },
            { item: 'rusticdelight:coffee' },
            { item: 'mynethersdelight:roast_stuffed_hoglin' }
        ],
        recipe_book_tab: 'misc',
        container: {
            id: 'minecraft:golden_carrot'
        },
        result: {
            count: 1,
            id: 'allthemodium:allthemodium_carrot'
        }
    }).id('kubejs:cooking/allthemodium_carrot')

    // ========================================================================
    // 2. INDUSTRIAL FOREGOING - 3. STUPEŇ (Advanced Frame, Hydroponic Bed, Stasis Chamber)
    // ========================================================================
    event.remove({ output: 'industrialforegoing:machine_frame_advanced' })
    event.custom({
        type: 'industrialforegoing:dissolution_chamber',
        input: [
            { item: 'industrialforegoing:plastic' },
            { item: 'industrialforegoing:machine_frame_simple' },
            { item: 'industrialforegoing:plastic' },
            { item: 'allthemodium:allthemodium_ingot' },
            { item: 'allthemodium:allthemodium_ingot' },
            { item: 'iceandfire:fire_dragon_blood' },
            { item: 'mekanism:advanced_control_circuit' },
            { item: 'iceandfire:lightning_dragon_blood' }
        ],
        inputFluid: {
            amount: 500,
            fluid: 'industrialforegoing:pink_slime'
        },
        output: {
            count: 1,
            id: 'industrialforegoing:machine_frame_advanced'
        },
        processingTime: 300
    }).id('kubejs:dissolution/machine_frame_advanced')

    event.remove({ output: 'industrialforegoing:hydroponic_bed' })
    event.shaped('industrialforegoing:hydroponic_bed', [
        'PDP',
        'AMA',
        'GAG'
    ], {
        P: 'industrialforegoing:plastic',
        D: 'minecraft:dirt',
        A: 'allthemodium:allthemodium_nugget',
        M: 'industrialforegoing:machine_frame_advanced',
        G: 'minecraft:gold_ingot'
    })

    event.remove({ output: 'industrialforegoing:stasis_chamber' })
    event.shaped('industrialforegoing:stasis_chamber', [
        'SSS',
        'BMB',
        'VAV'
    ], {
        S: 'minecraft:soul_sand',
        B: Ingredient.of(dragonBloods),
        M: 'industrialforegoing:machine_frame_advanced',
        V: 'allthemodium:vibranium_ingot',
        A: 'mekanism:teleportation_core'
    })

    // ========================================================================
    // 3. ASTRAL SORCERY - 3. STUPEŇ (Attunement Altar s Allthemodiem a Dračí kostí)
    // ========================================================================
    event.remove({ output: 'astralsorcery:attunement_altar' })
    event.shaped('astralsorcery:attunement_altar', [
        ' A ',
        'BSB',
        'MMM'
    ], {
        A: 'astralsorcery:aquamarine',
        B: 'iceandfire:dragonbone',
        S: 'astralsorcery:starmetal_ingot',
        M: 'allthemodium:allthemodium_ingot'
    })

    // ========================================================================
    // 4. AE2 WIRELESS TERMINAL & QUANTUM BRIDGE CARD (AE2WTLib)
    // ========================================================================
    event.remove({ output: 'ae2:wireless_crafting_terminal' })
    event.shaped('ae2:wireless_crafting_terminal', [
        'RVR',
        'CTC',
        'SVS'
    ], {
        R: 'ae2:wireless_receiver',
        V: 'allthemodium:vibranium_ingot',
        C: 'ae2:calculation_processor',
        T: 'ae2:crafting_terminal',
        S: Ingredient.of(otherDragonScales)
    })

    event.remove({ output: 'ae2wtlib:quantum_bridge_card' })
    event.shaped('ae2wtlib:quantum_bridge_card', [
        'SVS',
        'VQV',
        'SBS'
    ], {
        S: Ingredient.of(otherDragonScales),
        V: 'allthemodium:vibranium_ingot',
        Q: 'ae2:quantum_ring',
        B: Ingredient.of(dragonBloods)
    })

    // ========================================================================
    // 5. SOPHISTICATED BACKPACKS (Max Tier Batoh & Stack Upgrade T4)
    // ========================================================================
    event.remove({ output: 'sophisticatedbackpacks:stack_upgrade_tier_4' })
    event.shaped('sophisticatedbackpacks:stack_upgrade_tier_4', [
        'VVV',
        'VSV',
        'BBB'
    ], {
        V: 'allthemodium:vibranium_ingot',
        S: 'sophisticatedbackpacks:stack_upgrade_tier_3',
        B: 'iceandfire:dragon_bone_block'
    })

    // ========================================================================
    // 6. APOTHIC SPAWNERS (Max Upgrade - Ignorování podmínek přes Vibranium)
    // ========================================================================
    event.remove({ id: 'apothic_spawners:spawner_modifiers/ignore_conditions' })
    event.custom({
        type: 'apothic_spawners:spawner_modifier',
        mainhand: {
            item: 'allthemodium:vibranium_block'
        },
        offhand: {
            item: 'iceandfire:summoning_crystal_fire'
        },
        consumes_offhand: false,
        stat_changes: [
            {
                type: 'apothic_spawners:ignore_conditions',
                value: true
            }
        ]
    })
})