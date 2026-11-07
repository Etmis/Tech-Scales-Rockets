// kubejs/server_scripts/01_progression/phase_5_cataclysm_keys.js

ServerEvents.recipes(event => {
    // 1. ANCIENT REMNANT
    event.remove({ output: 'cataclysm:necklace_of_the_desert' })
    event.shaped('cataclysm:necklace_of_the_desert', [
        'DSD',
        'DND',
        ' B '
    ], {
        D: 'ad_astra:desh_plate',
        S: 'astralsorcery:starmetal_ingot',
        N: 'minecraft:nether_star',
        B: 'iceandfire:dragonbone'
    })

    // 2. IGNIS
    event.remove({ output: 'cataclysm:burning_ashes' })
    event.shaped('cataclysm:burning_ashes', [
        ' S ',
        'OFO',
        ' B '
    ], {
        S: 'iceandfire:dragonsteel_fire_ingot',
        O: 'ad_astra:ostrum_plate',
        F: 'twilightforest:fiery_blood',
        B: 'iceandfire:fire_dragon_blood'
    })

    // 3. THE LEVIATHAN
    event.remove({ output: 'cataclysm:abyssal_sacrifice' })
    event.shaped('cataclysm:abyssal_sacrifice', [
        'CCC',
        'OER',
        'IHI'
    ], {
        C: 'ad_astra:calorite_ingot',
        O: 'oceansdelight:guardian_soup',
        E: 'minecraft:heart_of_the_sea',
        R: 'farmersdelight:salmon_roll',
        I: 'ad_astra:ice_shard',
        H: 'iceandfire:ice_dragon_blood'
    })

    // 4. ENDER GUARDIAN
    event.remove({ output: 'cataclysm:void_eye' })
    event.shaped('cataclysm:void_eye', [
        'COC',
        'OEO',
        'CBC'
    ], {
        C: 'ad_astra:calorite_plate',
        O: 'ad_astra:ostrum_plate',
        E: 'astralsorcery:celestial_crystal',
        B: 'iceandfire:ice_dragon_blood'
    })
})

// BOSS PROGRESSION LOCKS
EntityEvents.drops('cataclysm:ignited_revenant', event => {
    event.drops.removeIf(drop => drop.item.id === 'cataclysm:burning_ashes')
})

BlockEvents.rightClicked('cataclysm:cursed_tombstone', event => {
    const { player, item } = event
    if (item.id !== 'iceandfire:dragonsteel_ice_ingot') {
        player.tell('§bThe frozen tomb of Maledictus remains sealed! Right-click the tombstone with an Ice Dragonsteel Ingot (from Glacio) to break the seal.')
        event.cancel()
    } else {
        item.count--
        player.tell('§bThe glacial seal shatters under the power of Ice Dragonsteel! Maledictus rises!')
    }
})

EntityEvents.spawned('cataclysm:netherite_monstrosity', event => {
    const { entity } = event
    if (!entity.persistentData.getBoolean('UnlockedByOstrum')) {
        entity.mergeNbt('{NoAI: 1b, Invulnerable: 1b}')
    }
})

ItemEvents.entityInteracted(event => {
    const { player, target, item, level } = event
    if (target.type === 'cataclysm:netherite_monstrosity' && !target.persistentData.getBoolean('UnlockedByOstrum')) {
        if (item.id === 'ad_astra:ostrum_plate') {
            item.count--
            target.persistentData.putBoolean('UnlockedByOstrum', true)
            target.mergeNbt('{NoAI: 0b, Invulnerable: 0b}')
            level.playSound(null, target.x, target.y, target.z, 'minecraft:entity.iron_golem.repair', 'hostile', 1.5, 0.5)
            player.tell('§6The forge awakens! The Netherite Monstrosity absorbed the Ostrum Plate and roars to life!')
            event.cancel()
        } else {
            player.tell('§cThe Netherite Monstrosity is dormant. Right-click it with an Ostrum Plate (from Mars) to ignite its core!')
            event.cancel()
        }
    }
})