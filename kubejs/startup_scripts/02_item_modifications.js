// kubejs/startup_scripts/02_item_modifications.js

const $ItemAttributeModifiers = Java.loadClass('net.minecraft.world.item.component.ItemAttributeModifiers')
const $Attributes = Java.loadClass('net.minecraft.world.entity.ai.attributes.Attributes')
const $AttributeModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier')
const $EquipmentSlotGroup = Java.loadClass('net.minecraft.world.entity.EquipmentSlotGroup')
const $ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const $FoodProperties = Java.loadClass('net.minecraft.world.food.FoodProperties')

ItemEvents.modification(event => {
    // ========================================================================
    // 1. VYNULOVÁNÍ STATŮ VEDLEJŠÍCH ZBROJÍ (Ice and Fire & Cataclysm -> 0 Armor)
    // ========================================================================
    const zeroModifier = new $AttributeModifier(
        $ResourceLocation.fromNamespaceAndPath('kubejs', 'cosmetic_zero_armor'),
        0.0,
        $AttributeModifier.Operation.ADD_VALUE
    )
    const zeroAttributes = $ItemAttributeModifiers.builder()
        .add($Attributes.ARMOR, zeroModifier, $EquipmentSlotGroup.ARMOR)
        .build()

    const cosmeticArmors = [
        /^iceandfire:armor_.*_(helmet|chestplate|leggings|boots)$/,
        /^iceandfire:tide_.*_(helmet|chestplate|leggings|boots)$/,
        /^iceandfire:dragonsteel_.*_(helmet|chestplate|leggings|boots)$/,
        'cataclysm:ignitium_helmet',
        'cataclysm:ignitium_chestplate',
        'cataclysm:ignitium_elytra_chestplate',
        'cataclysm:ignitium_leggings',
        'cataclysm:ignitium_boots',
        'cataclysm:cursium_helmet',
        'cataclysm:cursium_chestplate',
        'cataclysm:cursium_leggings',
        'cataclysm:cursium_boots',
        'cataclysm:bone_reptile_helmet',
        'cataclysm:bone_reptile_chestplate',
        'cataclysm:monstrous_helm',
        'cataclysm:bloom_stone_pauldrons'
    ]

    cosmeticArmors.forEach(selector => {
        event.modify(selector, item => {
            item.setAttributeModifiersWithTooltip(zeroAttributes.modifiers())
        })
    })

    // ========================================================================
    // 2. ZÁKLADNÍ FOOD PROPERTIES PRO CARROT & APPLE (5min efekty řeší server skript!)
    // ========================================================================
    event.modify('allthemodium:allthemodium_carrot', item => {
        item.setFood(new $FoodProperties.Builder()
            .nutrition(20)
            .saturationModifier(1.2)
            .alwaysEdible()
            .build()
        )
    })

    event.modify('allthemodium:allthemodium_apple', item => {
        item.setFood(new $FoodProperties.Builder()
            .nutrition(20)
            .saturationModifier(2.0)
            .alwaysEdible()
            .build()
        )
    })
})