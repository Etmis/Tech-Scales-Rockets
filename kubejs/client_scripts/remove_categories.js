// KubeJS RecipeViewerEvents pro Minecraft 1.21.1 (Neoforge)

RecipeViewerEvents.removeCategories(event => {
    // 1. Skrytí kategorií tagů v EMI / JEI
    event.remove('emi:tag')
    
    // 2. Skrytí uncrafting kategorie z Twilight Forest
    event.remove('twilightforest:uncrafting')

    event.remove('ae2:p2p_attunement')

    event.remove('minecraft:tag_recipes/item')
    
    event.remove('minecraft:tag_recipes/block')
})