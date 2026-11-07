// kubejs/server_scripts/02_systems/heart_canisters_apothic.js

ServerEvents.recipes(event => {
    // ========================================================================
    // 1. BAUBLEY HEART CANISTERS (Řady životů Fáze 1B -> Fáze 6 + Gastronomie)
    // ========================================================================

    // Základní Canister (Fáze 1B - vyžaduje Carminite a Osmium)
    event.remove({ output: 'bhc:canister' })
    event.shaped('bhc:canister', [
        ' O ',
        'ICI',
        ' I '
    ], {
        O: 'mekanism:ingot_osmium',
        I: 'minecraft:iron_ingot',
        C: 'twilightforest:carminite'
    })

    // Fáze 1B: Red Heart Canister (2. řada životů - Carminite + Twilight Delight + Brewin' And Chewin')
    event.remove({ output: 'bhc:red_heart_canister' })
    event.shaped('bhc:red_heart_canister', [
        'FCF',
        'RNR',
        'BMB'
    ], {
        F: 'twilightforest:meef_stroganoff',
        C: 'twilightforest:carminite',
        R: 'bhc:red_heart',
        N: 'bhc:canister',
        B: 'minecraft:bone',
        M: 'brewinandchewin:mead'
    })

    // Fáze 3: Yellow (Orange) Heart Canister (3. řada životů - Allthemodium + Dračí kosti + Fermentovaný nápoj)
    event.remove({ output: 'bhc:yellow_heart_canister' })
    event.shaped('bhc:yellow_heart_canister', [
        'DAD',
        'YRY',
        'DKD'
    ], {
        D: 'iceandfire:dragonbone',
        A: 'allthemodium:allthemodium_ingot',
        Y: 'bhc:yellow_heart',
        R: 'bhc:red_heart_canister',
        K: 'brewinandchewin:bloody_mary'
    })

    // Fáze 4: Green Heart Canister (4. řada životů - Desh + Ostrum + End's Delight Dračí hostina)
    event.remove({ output: 'bhc:green_heart_canister' })
    event.shaped('bhc:green_heart_canister', [
        'DOD',
        'GYG',
        'DED'
    ], {
        D: 'ad_astra:desh_ingot',
        O: 'ad_astra:ostrum_ingot',
        G: 'bhc:green_heart',
        Y: 'bhc:yellow_heart_canister',
        E: 'ends_delight:dragon_leg_with_sauce'
    })

    // Fáze 6: Blue Heart Canister (5. řada životů - Cursium + Void Core + Ignitium + Ocean's Delight)
    event.remove({ output: 'bhc:blue_heart_canister' })
    event.shaped('bhc:blue_heart_canister', [
        'CIC',
        'BGB',
        'VSV'
    ], {
        C: 'cataclysm:cursium_ingot',
        I: 'cataclysm:ignitium_ingot',
        B: 'bhc:blue_heart',
        G: 'bhc:green_heart_canister',
        V: 'cataclysm:void_core',
        S: 'oceansdelight:guardian_soup'
    })

    // ========================================================================
    // 2. APOTHIC ENCHANTING (Knihovny Fáze 1A -> Fáze 6)
    // ========================================================================

    // Fáze 1A: HellShelf & SeaShelf (Naga Scale + Aquamarine z Astral Sorcery)
    event.remove({ output: 'apothic_enchanting:hellshelf' })
    event.shaped('apothic_enchanting:hellshelf', [
        'NNN',
        'SBS',
        'NAN'
    ], {
        N: 'minecraft:nether_bricks',
        S: 'twilightforest:naga_scale',
        B: 'minecraft:bookshelf',
        A: 'astralsorcery:aquamarine'
    })

    event.remove({ output: 'apothic_enchanting:seashelf' })
    event.shaped('apothic_enchanting:seashelf', [
        'PPP',
        'SBS',
        'PAP'
    ], {
        P: 'minecraft:prismarine_bricks',
        S: 'twilightforest:naga_scale',
        B: 'minecraft:bookshelf',
        A: 'astralsorcery:aquamarine'
    })

    // Fáze 2: Dormant Deepshelf (Allthemodium + Echo Shard)
    event.remove({ output: 'apothic_enchanting:dormant_deepshelf' })
    event.shaped('apothic_enchanting:dormant_deepshelf', [
        'CEC',
        'ABA',
        'CEC'
    ], {
        C: 'minecraft:cracked_deepslate_tiles',
        E: 'minecraft:echo_shard',
        A: 'allthemodium:allthemodium_ingot',
        B: 'apothic_enchanting:hellshelf'
    })

    // Fáze 3: Endshelf (Vibranium + Dragon Bone)
    event.remove({ output: 'apothic_enchanting:endshelf' })
    event.shaped('apothic_enchanting:endshelf', [
        'EEE',
        'VBV',
        'DDD'
    ], {
        E: 'minecraft:end_stone_bricks',
        V: 'allthemodium:vibranium_ingot',
        B: 'apothic_enchanting:echoing_deepshelf',
        D: 'iceandfire:dragonbone'
    })

    // Fáze 4: Pearlescent Endshelf (Desh + Ostrum)
    event.remove({ output: 'apothic_enchanting:pearl_endshelf' })
    event.shaped('apothic_enchanting:pearl_endshelf', [
        'DOD',
        'PBP',
        'DOD'
    ], {
        D: 'ad_astra:desh_plate',
        O: 'ad_astra:ostrum_plate',
        P: 'minecraft:ender_pearl',
        B: 'apothic_enchanting:endshelf'
    })

    // Fáze 6: Draconic Endshelf (Unobtainium + Ignitium + Void Core + Cursium)
    event.remove({ output: 'apothic_enchanting:draconic_endshelf' })
    event.shaped('apothic_enchanting:draconic_endshelf', [
        'UIU',
        'VBV',
        'UCU'
    ], {
        U: 'allthemodium:unobtainium_ingot',
        I: 'cataclysm:ignitium_ingot',
        V: 'cataclysm:void_core',
        B: 'apothic_enchanting:pearl_endshelf',
        C: 'cataclysm:cursium_ingot'
    })
})