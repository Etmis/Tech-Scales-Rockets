// kubejs/server_scripts/02_systems/mining_dim_ores.js

var miningDimOres = [
    // ========================================================================
    // 1. MEKANISM RUDY (Stone: Y 130-250 | Deepslate: Y 65-130)
    // ========================================================================
    {
        path: 'mekanism_osmium_ore',
        id: 'allthemodium:mekanism_osmium_ore',
        min: 65, max: 250, size: 9, count: 18,
        stoneReplaces: "mekanism:osmium_ore",
        deepslateReplaces: "mekanism:deepslate_osmium_ore",
        endStoneReplaces: null,
        netherrackReplaces: null
    },
    {
        path: 'mekanism_tin_ore',
        id: 'allthemodium:mekanism_tin_ore',
        min: 65, max: 250, size: 8, count: 14,
        stoneReplaces: "mekanism:tin_ore",
        deepslateReplaces: "mekanism:deepslate_tin_ore",
        endStoneReplaces: null,
        netherrackReplaces: null
    },
    {
        path: 'mekanism_lead_ore',
        id: 'allthemodium:mekanism_lead_ore',
        min: 65, max: 200, size: 8, count: 10,
        stoneReplaces: "mekanism:lead_ore",
        deepslateReplaces: "mekanism:deepslate_lead_ore",
        endStoneReplaces: null,
        netherrackReplaces: null
    },
    {
        path: 'mekanism_uranium_ore',
        id: 'allthemodium:mekanism_uranium_ore',
        min: 65, max: 160, size: 7, count: 8,
        stoneReplaces: "mekanism:uranium_ore",
        deepslateReplaces: "mekanism:deepslate_uranium_ore",
        endStoneReplaces: null,
        netherrackReplaces: null
    },
    {
        path: 'mekanism_fluorite_ore',
        id: 'allthemodium:mekanism_fluorite_ore',
        min: 65, max: 160, size: 10, count: 8,
        stoneReplaces: "mekanism:fluorite_ore",
        deepslateReplaces: "mekanism:deepslate_fluorite_ore",
        endStoneReplaces: null,
        netherrackReplaces: null
    },

    // ========================================================================
    // 2. ICE AND FIRE RUDY (Stříbro)
    // ========================================================================
    {
        path: 'iaf_silver_ore',
        id: 'allthemodium:iaf_silver_ore',
        min: 65, max: 220, size: 8, count: 8,
        stoneReplaces: "iceandfire:silver_ore",
        deepslateReplaces: "iceandfire:deepslate_silver_ore",
        endStoneReplaces: null,
        netherrackReplaces: null
    },

    // ========================================================================
    // 3. ASTRAL SORCERY (Vzácná Rock Crystal Ore ve spodní Deepslate vrstvě)
    // ========================================================================
    {
        path: 'astral_rock_crystal_ore',
        id: 'allthemodium:astral_rock_crystal_ore',
        min: 65, max: 95, size: 2, count: 2,
        stoneReplaces: "astralsorcery:rock_crystal_ore",
        deepslateReplaces: "astralsorcery:rock_crystal_ore",
        endStoneReplaces: null,
        netherrackReplaces: null
    },

    // ========================================================================
    // 4. NETHER QUARTZ (Pro AE2 a craftění v Netherrack vrstvě Mining Dimenze)
    // ========================================================================
    {
        path: 'nether_quartz_ore',
        id: 'allthemodium:nether_quartz_ore',
        min: -64, max: 30, size: 14, count: 16,
        stoneReplaces: null,
        deepslateReplaces: null,
        endStoneReplaces: null,
        netherrackReplaces: "minecraft:nether_quartz_ore"
    }
]

ServerEvents.generateData('after_mods', allthemods => {
    let addMiningDimOre = (path, id, min, max, size, count, stoneReplaces, deepslateReplaces, endStoneReplaces, netherrackReplaces) => {
        
        let jsonPlaced = JsonIO.toObject({
            "feature": id,
            "placement": [
              {
                "count": count,
                "type": "minecraft:count"
              },
              {
                "type": "minecraft:in_square"
              },
              {
                "height": {
                  "min_inclusive": {
                    "absolute": min
                  },
                  "max_inclusive": {
                    "absolute": max
                  },
                  "type": "minecraft:trapezoid"
                },
                "type": "minecraft:height_range"
              },
              {
                "type": "minecraft:biome"
              }
            ]
          })
        let jsonConfigured = JsonIO.toObject({
            type: "minecraft:ore",
            config: {
              "size": size,
              "discard_chance_on_air_exposure": 0.0,
              "targets": []
            }
          })

        let jsonForge = JsonIO.toObject({
            type: "neoforge:add_features",
            biomes: "#allthemodium:mining_features/mining_biomes",
            "features": [id],
            "step": "underground_ores"
        })
        if(stoneReplaces !== null){
            jsonConfigured.config.targets.push(
              JsonIO.toObject({
                "target": {
                  "predicate_type": "minecraft:tag_match",
                  "tag": "minecraft:stone_ore_replaceables"
                },
                "state": {
                  "Name": stoneReplaces
                }
              }))
        }
        if(deepslateReplaces !== null){
          jsonConfigured.config.targets.push(
            JsonIO.toObject({
              "target": {
                "predicate_type": "minecraft:tag_match",
                "tag": "minecraft:deepslate_ore_replaceables"
              },
              "state": {
                "Name": deepslateReplaces
              }
            }))
        }
        if(endStoneReplaces !== null){
            jsonConfigured.config.targets.push(
                JsonIO.toObject({
                    "target": {
                    "predicate_type": "minecraft:block_match",
                    "block": "minecraft:end_stone"
                    },
                    "state": {
                        "Name": endStoneReplaces
                    }
                })
            )
        }
        if(netherrackReplaces !== null){
            jsonConfigured.config.targets.push(
            JsonIO.toObject({
                "target": {
                "predicate_type": "minecraft:block_match",
                "block": "minecraft:netherrack"
                },
                "state": {
                    "Name": netherrackReplaces
                }
            }))
        }  
        allthemods.json(`allthemodium:worldgen/placed_feature/${path}.json`, jsonPlaced)
        allthemods.json(`allthemodium:worldgen/configured_feature/${path}.json`, jsonConfigured)
        allthemods.json(`allthemodium:neoforge/biome_modifier/allthemodium/dim_ores/${path}.json`, jsonForge)
    }
    miningDimOres.forEach(ore => {
        addMiningDimOre(ore.path, ore.id, ore.min, ore.max, ore.size, ore.count, ore.stoneReplaces, ore.deepslateReplaces, ore.endStoneReplaces, ore.netherrackReplaces);
    })

    // ========================================================================
    // OPRAVA A POSÍLENÍ ALLTHEMODIA V DEEP DARKU (Uvnitř Deepslatu i na stěnách)
    // ========================================================================
    allthemods.json('kubejs:worldgen/configured_feature/deep_dark_atm_ore.json', JsonIO.toObject({
        "type": "minecraft:ore",
        "config": {
            "size": 4,
            "discard_chance_on_air_exposure": 1.0,
            "targets": [
                {
                    "target": {
                        "predicate_type": "minecraft:tag_match",
                        "tag": "minecraft:deepslate_ore_replaceables"
                    },
                    "state": {
                        "Name": "allthemodium:allthemodium_slate_ore"
                    }
                },
                {
                    "target": {
                        "predicate_type": "minecraft:block_match",
                        "block": "minecraft:sculk"
                    },
                    "state": {
                        "Name": "allthemodium:allthemodium_slate_ore"
                    }
                }
            ]
        }
    }))

    allthemods.json('kubejs:worldgen/placed_feature/deep_dark_atm_ore.json', JsonIO.toObject({
        "feature": "kubejs:deep_dark_atm_ore",
        "placement": [
            { "count": 1, "type": "minecraft:count" },
            { "type": "minecraft:in_square" },
            {
                "height": {
                    "min_inclusive": { "absolute": -64 },
                    "max_inclusive": { "absolute": 10 },
                    "type": "minecraft:uniform"
                },
                "type": "minecraft:height_range"
            },
            { "type": "minecraft:biome" }
        ]
    }))

    allthemods.json('kubejs:neoforge/biome_modifier/deep_dark_atm_ore.json', JsonIO.toObject({
        "type": "neoforge:add_features",
        "biomes": "minecraft:deep_dark",
        "features": ["kubejs:deep_dark_atm_ore"],
        "step": "underground_ores"
    }))
})