// kubejs/server_scripts/00_core/03_dragon_spawns.js

// ============================================================================
// 1. PŘEPSÁNÍ BIOME TAGŮ PRO GENERÁTOR DRAČÍCH STRUKTUR (IAF:CE 1.21.1)
// ============================================================================
ServerEvents.tags('worldgen/biome', event => {
    // Všechny biomy v dimenzi The Other (Allthemodium)
    const theOtherBiomes = [
        'allthemodium:the_other',
        'allthemodium:desert',
        'allthemodium:desert_hills',
        'allthemodium:badlands',
        'allthemodium:basalt_deltas'
    ]

    // Všechny biomy na planetě Glacio (Ad Astra)
    const glacioBiomes = [
        'ad_astra:glacio_ice_peaks',
        'ad_astra:glacio_snowy_barrens'
    ]

    // Vlastní tagy pro přepis struktur níže
    event.add('kubejs:the_other_dragon_biomes', theOtherBiomes)
    event.add('kubejs:glacio_dragon_biomes', glacioBiomes)

    // Vyčištění všech výchozích IAF biome tagů
    const fireAndLightningTags = [
        'iceandfire:has_structure/fire_dragon_roost',
        'iceandfire:has_structure/fire_dragon_cave',
        'iceandfire:has_structure/lightning_dragon_roost',
        'iceandfire:has_structure/lightning_dragon_cave'
    ]
    fireAndLightningTags.forEach(tag => {
        event.removeAll(tag)
        event.add(tag, theOtherBiomes)
    })

    const iceTags = [
        'iceandfire:has_structure/ice_dragon_roost',
        'iceandfire:has_structure/ice_dragon_cave'
    ]
    iceTags.forEach(tag => {
        event.removeAll(tag)
        event.add(tag, glacioBiomes)
    })

    // VYPNUTÍ GENERACE ROPY (Ad Astra Oil Well) - vyprázdnění biome tagu
    event.removeAll('ad_astra:has_structure/oil_well')
})

// ============================================================================
// 2. PŘÍMÉ PŘEPSÁNÍ STRUKTUR DRÁKŮ + VYPNUTÍ AD ASTRA ROPY (generateData)
// ============================================================================
ServerEvents.generateData('after_mods', event => {
    // A) Ohnivé a Bleskové struktury -> POUZE v The Other
    const theOtherStructures = [
        'fire_dragon_roost',
        'fire_dragon_cave',
        'lightning_dragon_roost',
        'lightning_dragon_cave'
    ]

    theOtherStructures.forEach(structName => {
        event.json(`iceandfire:worldgen/structure/${structName}`, {
            type: `iceandfire:${structName}`,
            biomes: '#kubejs:the_other_dragon_biomes',
            step: structName.includes('cave') ? 'underground_structures' : 'surface_structures',
            spawn_overrides: {},
            terrain_adaptation: structName.includes('roost') ? 'beard_thin' : 'none'
        })
    })

    // B) Ledové struktury -> POUZE na Glaciu
    const glacioStructures = [
        'ice_dragon_roost',
        'ice_dragon_cave'
    ]

    glacioStructures.forEach(structName => {
        event.json(`iceandfire:worldgen/structure/${structName}`, {
            type: `iceandfire:${structName}`,
            biomes: '#kubejs:glacio_dragon_biomes',
            step: structName.includes('cave') ? 'underground_structures' : 'surface_structures',
            spawn_overrides: {},
            terrain_adaptation: structName.includes('roost') ? 'beard_thin' : 'none'
        })
    })

    // C) Vypnutí generace Ad Astra Oil Well ve světě (prázdný seznam biomů)
    event.json('ad_astra:worldgen/structure_set/oil_well', {
        structures: [],
        placement: {
            type: 'minecraft:random_spread',
            salt: 9384752,
            spacing: 32,
            separation: 8
        }
    })
})

// ============================================================================
// 3. 100% POJISTKA PROTI ŽIVÝM DRAKŮM MIMO JEJICH DIMENZE
// ============================================================================
/*EntityEvents.spawned(event => {
    const { entity, level } = event
    const type = entity.type
    const dim = level.dimension.toString()

    // Ohnivý a Bleskový drak smí existovat VÝHRADNĚ v The Other
    if (type === 'iceandfire:fire_dragon' || type === 'iceandfire:lightning_dragon') {
        if (dim !== 'allthemodium:the_other') {
            entity.discard()
            event.cancel()
        }
    }

    // Ledový drak smí existovat VÝHRADNĚ na Glaciu
    if (type === 'iceandfire:ice_dragon') {
        if (dim !== 'ad_astra:glacio') {
            entity.discard()
            event.cancel()
        }
    }
})*/
