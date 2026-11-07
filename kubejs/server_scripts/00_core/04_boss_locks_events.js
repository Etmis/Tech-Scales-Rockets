// kubejs/server_scripts/00_core/04_boss_locks_events.js

// ============================================================================
// 1. THE HARBINGER LOCK (Requires Pellet of Antimatter instead of Nether Star)
// ============================================================================
ItemEvents.entityInteracted(event => {
    const { player, target, item, level } = event

    if (target.type === 'cataclysm:the_harbinger') {
        if (item.id === 'minecraft:nether_star') {
            player.tell('§cThe Harbinger\'s ancient core does not react to a mere Nether Star. It requires pure Antimatter (Pellet of Antimatter)!')
            event.cancel()
            return
        }

        if (item.id === 'mekanism:pellet_antimatter') {
            if (!target.persistentData.getBoolean('AntimatterActivated')) {
                item.count--
                target.persistentData.putBoolean('AntimatterActivated', true)
                target.mergeNbt('{Is_Act: 1b}')
                level.playSound(null, target.x, target.y, target.z, 'minecraft:entity.wither.spawn', 'hostile', 1.5, 0.5)
                player.tell('§dThe Harbinger\'s core has absorbed the Antimatter! Extermination protocols initialized!')
                event.cancel()
            }
        }
    }
})

// ============================================================================
// 2. ENDER GUARDIAN LOCK (Sleeps in shell until right-clicked with Void Eye)
// ============================================================================
EntityEvents.spawned('cataclysm:ender_guardian', event => {
    const { entity } = event
    if (!entity.persistentData.getBoolean('UnlockedByVoidEye')) {
        entity.mergeNbt('{NoAI: 1b, Invulnerable: 1b}')
    }
})

ItemEvents.entityInteracted(event => {
    const { player, target, item, level } = event

    if (target.type === 'cataclysm:ender_guardian') {
        if (!target.persistentData.getBoolean('UnlockedByVoidEye')) {
            if (item.id === 'cataclysm:void_eye') {
                item.count--
                target.persistentData.putBoolean('UnlockedByVoidEye', true)
                target.mergeNbt('{NoAI: 0b, Invulnerable: 0b}')
                level.playSound(null, target.x, target.y, target.z, 'minecraft:entity.ender_dragon.growl', 'hostile', 1.5, 0.7)
                player.tell('§5The Ender Guardian\'s shell shatters under the power of the cosmic Void Eye!')
                event.cancel()
            } else {
                player.tell('§5The Ender Guardian is sealed in an impenetrable void. You need a modified Void Eye (Phase 5) to awaken it!')
                event.cancel()
            }
        }
    }
})

// ============================================================================
// 3. GARANTOVANÉ 5MINUTOVÉ EFEKTY PRO ALLTHEMODIUM CARROT A APPLE (6000 ticků)
// ============================================================================
ItemEvents.foodEaten(event => {
    const { player, item } = event

    // A) Allthemodium Carrot (Fáze 3): Čistá Saturation na 5 minut
    if (item.id === 'allthemodium:allthemodium_carrot') {
        player.potionEffects.add('minecraft:saturation', 6000, 0, false, true)
    }

    // B) Allthemodium Apple (Fáze 7): Božský God-Mode na 5 minut
    if (item.id === 'allthemodium:allthemodium_apple') {
        player.potionEffects.add('minecraft:resistance', 6000, 3, false, true)       // Resistance IV
        player.potionEffects.add('minecraft:strength', 6000, 4, false, true)         // Strength V
        player.potionEffects.add('minecraft:absorption', 6000, 9, false, true)       // Absorption X
        player.potionEffects.add('minecraft:speed', 6000, 2, false, true)            // Speed III
        player.potionEffects.add('minecraft:haste', 6000, 3, false, true)            // Haste IV
        player.potionEffects.add('minecraft:regeneration', 6000, 3, false, true)     // Regeneration IV
        player.potionEffects.add('minecraft:fire_resistance', 6000, 0, false, true)  // Fire Immunity
    }
})