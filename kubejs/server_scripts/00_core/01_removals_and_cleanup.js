// kubejs/server_scripts/00_core/01_removals_and_cleanup.js

ServerEvents.recipes(event => {
    // 0. ZÁKAZ ALLOY PAXELU
    event.remove({ output: 'allthemodium:alloy_paxel' })

    // ========================================================================
    // 1. MEKANISM (MekaSuit, Meka-Tool a jejich moduly)
    // ========================================================================
    const mekaRemovals = [
        'mekanism:meka_tool',
        'mekanism:mekasuit_helmet',
        'mekanism:mekasuit_bodyarmor',
        'mekanism:mekasuit_pants',
        'mekanism:mekasuit_boots',
        'mekanism:modification_station',
        'mekanism:module_base'
    ]
    mekaRemovals.forEach(item => event.remove({ output: item }))
    event.remove({ id: /^mekanism:module_.*/ })
    event.remove({ id: /^mekanism_extras:module_.*/ })

    // ========================================================================
    // 2. L_ENDER'S CATACLYSM (Smazání zbraní, zbroje ZŮSTÁVAJÍ jako 0-stat kosmetika!)
    // ========================================================================
    const cataclysmRemovals = [
        'cataclysm:the_incinerator',
        'cataclysm:tidal_claws',
        'cataclysm:soul_render',
        'cataclysm:the_annihilator',
        'cataclysm:the_immolator',
        'cataclysm:meat_shredder',
        'cataclysm:laser_gatling',
        'cataclysm:wither_assault_shoulder_weapon',
        'cataclysm:void_assault_shoulder_weapon',
        'cataclysm:void_forge',
        'cataclysm:infernal_forge',
        'cataclysm:ancient_spear',
        'cataclysm:astrape',
        'cataclysm:ceraunus',
        'cataclysm:brontes',
        'cataclysm:athame',
        'cataclysm:khopesh',
        'cataclysm:coral_spear',
        'cataclysm:coral_bardiche'
    ]
    cataclysmRemovals.forEach(item => event.remove({ output: item }))

    // ========================================================================
    // 3. ICE AND FIRE (Zbroje a Dragonforge ZŮSTÁVAJÍ, zbraně a nástroje SMAZÁNY!)
    // ========================================================================
    event.remove({ output: /^iceandfire:dragonsteel_.*_(sword|pickaxe|axe|shovel|hoe)$/ })
    event.remove({ output: /^iceandfire:dragonbone_(sword|pickaxe|axe|shovel|hoe|bow).*/ })
    event.remove({ output: /^iceandfire:(silver|copper|myrmex_desert|myrmex_jungle|hippocampus|dread|troll_weapon)_(sword|pickaxe|axe|shovel|hoe|slapper|column|frost|hammer|trunk).*/ })

    // ========================================================================
    // 4. INDUSTRIAL FOREGOING ČISTKA (Ochrana Apothic, Batohů a Gastronomie)
    // ========================================================================
    const ifRemovals = [
        'industrialforegoing:infinity_drill',
        'industrialforegoing:infinity_saw',
        'industrialforegoing:infinity_hammer',
        'industrialforegoing:infinity_trident',
        'industrialforegoing:infinity_nuke',
        'industrialforegoing:infinity_backpack',
        'industrialforegoing:infinity_launcher',
        'industrialforegoing:enchantment_factory',
        'industrialforegoing:enchantment_applicator',
        'industrialforegoing:enchantment_extractor',
        'industrialforegoing:mob_duplicator',
        'industrialforegoing:meat_feeder'
    ]
    ifRemovals.forEach(item => event.remove({ output: item }))

    // ========================================================================
    // 5. FLUX NETWORKS (Zákaz všech baterií - povolen jen Mekanism Induction Matrix)
    // ========================================================================
    const fluxBatteries = [
        'fluxnetworks:basic_flux_storage',
        'fluxnetworks:herculean_flux_storage',
        'fluxnetworks:gargantuan_flux_storage'
    ]
    fluxBatteries.forEach(battery => event.remove({ output: battery }))

    // ========================================================================
    // 6. AD ASTRA & GISELLE ADDON (Zákaz rafinerie, cryo freezeru a přímé výroby modulů)
    // ========================================================================
    event.remove({ output: 'ad_astra:fuel_refinery' })
    event.remove({ output: 'ad_astra:cryo_freezer' })
    event.remove({ type: 'ad_astra:refining' })
    event.remove({ type: 'ad_astra:cryo_freezing' })
    event.remove({ mod: 'ad_astra_giselle_addon' })

    // ========================================================================
    // 7. ŽELEZNÁ OPONA PRO UNOBTAINIUM (Zákaz tavení, drcení a 2x-5x linek)
    // ========================================================================
    event.remove({ output: 'allthemodium:unobtainium_ingot', type: 'minecraft:smelting' })
    event.remove({ output: 'allthemodium:unobtainium_ingot', type: 'minecraft:blasting' })
    event.remove({ output: 'allthemodium:unobtainium_dust' })
    event.remove({ id: /allthemodium:.*unobtainium.*from_dust/ })
    event.remove({ id: /mekanism:processing\/unobtainium\/.*/ })
    event.remove({ id: /allthemodium:mek_processing\/unobtainium\/.*/ })
    event.remove({ input: 'allthemodium:raw_unobtainium', type: 'industrialforegoing:dissolution_chamber' })
    event.remove({ input: 'allthemodium:unobtainium_ore', type: 'industrialforegoing:dissolution_chamber' })
})