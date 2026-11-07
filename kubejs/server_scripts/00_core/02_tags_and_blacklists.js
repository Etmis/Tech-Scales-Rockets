// kubejs/server_scripts/00_core/02_tags_and_blacklists.js

// ============================================================================
// 1. BLACKLIST ENTIT PRO APOTHIC SPAWNERS, CAPTURING A MOB IMPRISONMENT TOOL
// ============================================================================
ServerEvents.tags('entity_type', event => {
    const bossBlacklist = [
        'allthemodium:piglich',
        'twilightforest:naga',
        'twilightforest:lich',
        'twilightforest:minoshroom',
        'twilightforest:hydra',
        'twilightforest:knight_phantom',
        'twilightforest:ur_ghast',
        'twilightforest:alpha_yeti',
        'twilightforest:snow_queen',
        'iceandfire:fire_dragon',
        'iceandfire:ice_dragon',
        'iceandfire:lightning_dragon',
        'iceandfire:gorgon',
        'iceandfire:cyclops',
        'iceandfire:hydra',
        'cataclysm:ender_golem',
        'cataclysm:ender_guardian',
        'cataclysm:netherite_monstrosity',
        'cataclysm:ignis',
        'cataclysm:the_harbinger',
        'cataclysm:the_leviathan',
        'cataclysm:ancient_remnant',
        'cataclysm:maledictus',
        'cataclysm:scylla',
        'cataclysm:ignited_revenant',
        'cataclysm:aptrgangr',
        'cataclysm:clawdian',
        'cataclysm:the_prowler',
        'cataclysm:wadjet',
        'cataclysm:kobolediator',
        'cataclysm:coralssus',
        'cataclysm:amethyst_crab'
    ]

    event.add('apothic_spawners:blacklisted_from_spawners', bossBlacklist)
    event.add('c:bosses', bossBlacklist)
    event.add('c:capturing_not_supported', bossBlacklist)
    event.add('industrialforegoing:mob_duplicator_blacklist', bossBlacklist)
    event.add('industrialforegoing:mob_imprisonment_tool_blacklist', bossBlacklist)
})

// ============================================================================
// 2. OCHRANA UNOBTAINIA PŘED AUTO-SMELT, IF WASHING A MEKANISM 2x-5x LINKOU
// ============================================================================
ServerEvents.tags('item', event => {
    const unobtainiumOres = [
        'allthemodium:unobtainium_ore',
        'allthemodium:unobtainium_slate_ore'
    ]
    const unobtainiumRaws = [
        'allthemodium:raw_unobtainium',
        'allthemodium:raw_unobtainium_block'
    ]

    // Odebrání obecných i specifických tagů, podle kterých IF Washing Factory
    // a Mekanism Purification / Injection / Dissolution komory berou vstupy!
    event.remove('c:ores', unobtainiumOres)
    event.remove('c:ores/unobtainium', unobtainiumOres)
    event.remove('c:raw_materials', unobtainiumRaws)
    event.remove('c:raw_materials/unobtainium', unobtainiumRaws)
    event.remove('c:storage_blocks/raw_unobtainium', 'allthemodium:raw_unobtainium_block')
    event.remove('c:storage_blocks', 'allthemodium:raw_unobtainium_block')
})

// ============================================================================
// 3. BLACKLIST BLOKŮ PRO DIGITAL MINER, CARDBOARD BOX A ASTRAL MINERALIS
// ============================================================================
ServerEvents.tags('block', event => {
    const protectedOres = [
        'allthemodium:allthemodium_ore',
        'allthemodium:allthemodium_slate_ore',
        'allthemodium:vibranium_ore',
        'allthemodium:other_vibranium_ore',
        'allthemodium:unobtainium_ore',
        'allthemodium:unobtainium_slate_ore',
        'ad_astra:moon_desh_ore',
        'ad_astra:deepslate_desh_ore',
        'ad_astra:mars_ostrum_ore',
        'ad_astra:deepslate_ostrum_ore',
        'ad_astra:venus_calorite_ore',
        'ad_astra:deepslate_calorite_ore',
        'ad_astra:glacio_ice_shard_ore',
        'ad_astra:deepslate_ice_shard_ore',
        'ad_astra:moon_ice_shard_ore',
        'ad_astra:mars_ice_shard_ore'
    ]

    const bossAltars = [
        'cataclysm:altar_of_fire',
        'cataclysm:altar_of_abyss',
        'cataclysm:altar_of_amethyst',
        'cataclysm:cursed_tombstone',
        'cataclysm:emp',
        'cataclysm:mech_eye_spawner',
        'cataclysm:abyss_eye_spawner',
        'cataclysm:flame_eye_spawner',
        'cataclysm:monstrous_eye_spawner',
        'cataclysm:void_eye_spawner',
        'cataclysm:desert_eye_spawner',
        'cataclysm:cursed_eye_spawner'
    ]

    event.add('mekanism:miner_blacklist', protectedOres)
    event.add('mekanism:atomic_disassembler_ore_blacklist', protectedOres)
    event.remove('c:ores', protectedOres)
    event.add('c:relocation_not_supported', protectedOres)
    event.add('c:relocation_not_supported', bossAltars)
    event.add('mekanism:cardboard_blacklist', protectedOres)
    event.add('mekanism:cardboard_blacklist', bossAltars)
})

// ============================================================================
// 4. ZÁKAZ GISELLE ADDON VESMÍRNÝCH ENCHANTŮ V ENCHANTING TABLE A LOOTU
// ============================================================================
ServerEvents.tags('enchantment', event => {
    const spaceEnchantments = [
        'ad_astra_giselle_addon:space_breathing',
        'ad_astra_giselle_addon:space_fire_proof',
        'ad_astra_giselle_addon:acid_rain_proof',
        'ad_astra_giselle_addon:gravity_normalizing'
    ]

    event.remove('minecraft:in_enchanting_table', spaceEnchantments)
    event.remove('minecraft:non_treasure', spaceEnchantments)
    event.remove('minecraft:tradeable', spaceEnchantments)
    event.remove('minecraft:on_random_loot', spaceEnchantments)
})