// kubejs/server_scripts/02_systems/mekanism_tiers_cycle.js

ServerEvents.recipes(event => {
    // 1. Všech 9 typů továren a jejich výchozí 1-slotové stroje z Fáze 0
    const factoryTypes = {
        smelting: 'mekanism:energized_smelter',
        enriching: 'mekanism:enrichment_chamber',
        crushing: 'mekanism:crusher',
        compressing: 'mekanism:osmium_compressor',
        combining: 'mekanism:combiner',
        purifying: 'mekanism:purification_chamber',
        injecting: 'mekanism:chemical_injection_chamber',
        infusing: 'mekanism:metallurgic_infuser',
        sawing: 'mekanism:precision_sawmill'
    }

    // ========================================================================
    // 2. ZÁKLADNÍ MEKANISM TIERY (Fáze 1A -> Konec Fáze 4: 3, 5, 7, 9 slotů)
    // ========================================================================
    const baseTiers = [
        {
            name: 'basic',
            prevTier: null,
            circuit: 'mekanism:basic_control_circuit',
            catalyst: 'twilightforest:naga_scale',           // Fáze 1A: Naga Scales
            secondary: 'industrialforegoing:plastic',        // Fáze 0/1A: IF Plastic
            coreItem: '#minecraft:planks'
        },
        {
            name: 'advanced',
            prevTier: 'basic',
            circuit: 'mekanism:advanced_control_circuit',
            catalyst: 'allthemodium:allthemodium_ingot',     // Fáze 2: Allthemodium
            secondary: 'mekanism:ingot_osmium',
            coreItem: 'mekanism:basic_tier_installer'
        },
        {
            name: 'elite',
            prevTier: 'advanced',
            circuit: 'mekanism:elite_control_circuit',
            catalyst: 'allthemodium:vibranium_ingot',        // Fáze 4: Vibranium + Desh
            secondary: 'ad_astra:desh_ingot',
            coreItem: 'mekanism:advanced_tier_installer'
        },
        {
            name: 'ultimate',
            prevTier: 'elite',
            circuit: 'mekanism:ultimate_control_circuit',
            catalyst: 'iceandfire:dragonsteel_ice_ingot',    // Konec Fáze 4: Ice Dragonsteel + Calorite
            secondary: 'ad_astra:calorite_ingot',
            coreItem: 'mekanism:elite_tier_installer'
        }
    ]

    baseTiers.forEach(tier => {
        const installerId = `mekanism:${tier.name}_tier_installer`

        // A) Upravený recept na Tier Installer
        event.remove({ output: installerId })
        event.shaped(installerId, [
            'MCM',
            'SPS',
            'MCM'
        ], {
            M: tier.catalyst,
            C: tier.circuit,
            S: tier.secondary,
            P: tier.coreItem
        })

        // B) Upravený recept na všech 9 Factory bloků daného Tieru
        Object.entries(factoryTypes).forEach(([typeKey, baseMachine]) => {
            const factoryId = `mekanism:${tier.name}_${typeKey}_factory`
            const coreMachine = tier.prevTier
                ? `mekanism:${tier.prevTier}_${typeKey}_factory`
                : baseMachine

            event.remove({ output: factoryId })
            event.shaped(factoryId, [
                'MCM',
                'SIS',
                'MCM'
            ], {
                M: tier.catalyst,
                C: tier.circuit,
                S: tier.secondary,
                I: coreMachine
            })
        })
    })

    // ========================================================================
    // 3. MEKANISM: EXTRAS TIERY (Fáze 5 -> Fáze 7: 11, 13, 15, 17 slotů)
    // ========================================================================
    const extraTiers = [
        {
            name: 'absolute', // 11 slotů (Fáze 5/6: Ancient Remnant + Monstrosity)
            prevNamespace: 'mekanism',
            prevTier: 'ultimate',
            circuit: 'mekanism_extras:absolute_control_circuit',
            catalyst: 'cataclysm:ancient_metal_ingot',
            secondary: 'ad_astra:calorite_ingot',
            bossCore: 'cataclysm:monstrous_horn',
            prevInstaller: 'mekanism:ultimate_tier_installer'
        },
        {
            name: 'supreme',  // 13 slotů (Fáze 6: Unobtainium + Ignis + Leviathan)
            prevNamespace: 'mekanism_extras',
            prevTier: 'absolute',
            circuit: 'mekanism_extras:supreme_control_circuit',
            catalyst: 'allthemodium:unobtainium_ingot',
            secondary: 'cataclysm:ignitium_ingot',
            bossCore: 'cataclysm:abyssal_egg',
            prevInstaller: 'mekanism_extras:absolute_tier_installer'
        },
        {
            name: 'cosmic',   // 15 slotů (Fáze 6: Unobtainium + Ender Guardian + Maledictus)
            prevNamespace: 'mekanism_extras',
            prevTier: 'supreme',
            circuit: 'mekanism_extras:cosmic_control_circuit',
            catalyst: 'allthemodium:unobtainium_ingot',
            secondary: 'cataclysm:cursium_ingot',
            bossCore: 'cataclysm:void_core',
            prevInstaller: 'mekanism_extras:supreme_tier_installer'
        },
        {
            name: 'infinite', // 17 slotů (Fáze 7: Antihmota + Harbinger + Masterchef Apple)
            prevNamespace: 'mekanism_extras',
            prevTier: 'cosmic',
            circuit: 'mekanism_extras:infinite_control_circuit',
            catalyst: 'mekanism:pellet_antimatter',
            secondary: 'cataclysm:witherite_ingot',
            bossCore: 'allthemodium:allthemodium_apple',
            prevInstaller: 'mekanism_extras:cosmic_tier_installer'
        }
    ]

    extraTiers.forEach(tier => {
        const installerId = `mekanism_extras:${tier.name}_tier_installer`

        // A) Upravený recept na Extras Tier Installer
        event.remove({ output: installerId })
        event.shaped(installerId, [
            'MCM',
            'BPB',
            'MSM'
        ], {
            M: tier.catalyst,
            C: tier.circuit,
            B: tier.bossCore,
            S: tier.secondary,
            P: tier.prevInstaller
        })

        // B) Upravený recept na všech 9 Extras Factory bloků daného Tieru
        Object.keys(factoryTypes).forEach(typeKey => {
            const factoryId = `mekanism_extras:${tier.name}_${typeKey}_factory`
            const coreMachine = `${tier.prevNamespace}:${tier.prevTier}_${typeKey}_factory`

            event.remove({ output: factoryId })
            event.shaped(factoryId, [
                'MCM',
                'BIB',
                'MSM'
            ], {
                M: tier.catalyst,
                C: tier.circuit,
                B: tier.bossCore,
                S: tier.secondary,
                I: coreMachine
            })
        })
    })
})