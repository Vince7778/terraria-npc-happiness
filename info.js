const biomeList = ["forest", "hallow", "underground", "desert", "jungle", "ocean", "snow", "mushroom"];

const biomeProps = {
    forest: {
        name: "Forest",
        order: 10,
    },
    hallow: {
        name: "Hallow",
        order: 20,
    },
    underground: {
        name: "Underground",
        order: 30,
    },
    desert: {
        name: "Desert",
        order: 40,
    },
    jungle: {
        name: "Jungle",
        order: 50,
    },
    ocean: {
        name: "Ocean",
        order: 60,
    },
    snow: {
        name: "Snow",
        order: 70,
    },
    mushroom: {
        name: "Glowing Mushroom",
        order: 80,
    },
}

const npcList = ["guide", "merchant", "zoologist", "golfer", "nurse", "tavernkeep", "partygirl", "wizard",
                 "demolitionist", "tinkerer", "clothier", "dyetrader", "armsdealer", "steampunker", "dryad",
                 "painter", "witchdoctor", "stylist", "angler", "pirate", "mechanic", "taxcollector",
                 "cyborg", "santa", "truffle", "princess"];

const npcProps = {
    guide: {
        name: "Guide",
        biome: {
            liked: "forest",
            disliked: "ocean",
        },
        neighbors: {
            loved: [],
            liked: ["clothier", "zoologist"],
            disliked: ["steampunker"],
            hated: ["painter"],
        },
        order: 10,
    },
    merchant: {
        name: "Merchant",
        biome: {
            liked: "forest",
            disliked: "desert",
        },
        neighbors: {
            loved: [],
            liked: ["golfer", "nurse"],
            disliked: ["taxcollector"],
            hated: ["angler"],
        },
        order: 20,
    },
    zoologist: {
        name: "Zoologist",
        biome: {
            liked: "forest",
            disliked: "desert",
        },
        neighbors: {
            loved: ["witchdoctor"],
            liked: ["golfer"],
            disliked: ["angler"],
            hated: ["armsdealer"],
        },
        order: 30,
    },
    golfer: {
        name: "Golfer",
        biome: {
            liked: "forest",
            disliked: "underground",
        },
        neighbors: {
            loved: ["angler"],
            liked: ["painter", "zoologist"],
            disliked: ["pirate"],
            hated: ["merchant"],
        },
        order: 40,
    },
    nurse: {
        name: "Nurse",
        biome: {
            liked: "hallow",
            disliked: "snow",
        },
        neighbors: {
            loved: ["armsdealer"],
            liked: ["wizard"],
            disliked: ["dryad", "partygirl"],
            hated: ["zoologist"],
        },
        order: 50,
    },
    tavernkeep: {
        name: "Tavernkeep",
        biome: {
            liked: "hallow",
            disliked: "snow",
        },
        neighbors: {
            loved: ["demolitionist"],
            liked: ["tinkerer"],
            disliked: ["guide"],
            hated: ["dyetrader"],
        },
        order: 60,
    },
    partygirl: {
        name: "Party Girl",
        biome: {
            liked: "hallow",
            disliked: "underground",
        },
        neighbors: {
            loved: ["wizard"],
            liked: ["stylist"],
            disliked: ["merchant"],
            hated: ["taxcollector"],
        },
        order: 70,
    },
    wizard: {
        name: "Wizard",
        biome: {
            liked: "hallow",
            disliked: "ocean",
        },
        neighbors: {
            loved: ["golfer"],
            liked: ["merchant"],
            disliked: ["witchdoctor"],
            hated: ["cyborg"],
        },
        order: 80,
    },
    demolitionist: {
        name: "Demolitionist",
        biome: {
            liked: "underground",
            disliked: "ocean",
        },
        neighbors: {
            loved: ["tavernkeep"],
            liked: ["mechanic"],
            disliked: ["armsdealer", "tinkerer"],
            hated: [],
        },
        order: 90,
    },
    tinkerer: {
        name: "Goblin Tinkerer",
        biome: {
            liked: "underground",
            disliked: "jungle",
        },
        neighbors: {
            loved: ["mechanic"],
            liked: ["dyetrader"],
            disliked: ["clothier"],
            hated: ["stylist"],
        },
        order: 100,
    },
    clothier: {
        name: "Clothier",
        biome: {
            liked: "underground",
            disliked: "hallow",
        },
        neighbors: {
            loved: ["truffle"],
            liked: ["taxcollector"],
            disliked: ["nurse"],
            hated: ["mechanic"],
        },
        order: 110,
    },
    dyetrader: {
        name: "Dye Trader",
        biome: {
            liked: "desert",
            disliked: "forest",
        },
        neighbors: {
            loved: [],
            liked: ["armsdealer", "painter"],
            disliked: ["steampunker"],
            hated: ["pirate"],
        },
        order: 120,
    },
    armsdealer: {
        name: "Arms Dealer",
        biome: {
            liked: "desert",
            disliked: "snow",
        },
        neighbors: {
            loved: ["nurse"],
            liked: ["steampunker"],
            disliked: ["golfer"],
            hated: ["demolitionist"],
        },
        order: 130,
    },
    steampunker: {
        name: "Steampunker",
        biome: {
            liked: "desert",
            disliked: "jungle",
        },
        neighbors: {
            loved: ["cyborg"],
            liked: ["painter"],
            disliked: ["dryad", "wizard", "partygirl"],
            hated: [],
        },
        order: 140,
    },
    dryad: {
        name: "Dryad",
        biome: {
            liked: "jungle",
            disliked: "desert",
        },
        neighbors: {
            loved: [],
            liked: ["witchdoctor", "truffle"],
            disliked: ["angler", "zoologist"],
            hated: ["golfer"],
        },
        order: 150,
    },
    painter: {
        name: "Painter",
        biome: {
            liked: "jungle",
            disliked: "forest",
        },
        neighbors: {
            loved: ["dryad"],
            liked: ["partygirl"],
            disliked: ["truffle", "cyborg"],
            hated: [],
        },
        order: 160,
    },
    witchdoctor: {
        name: "Witch Doctor",
        biome: {
            liked: "jungle",
            disliked: "hallow",
        },
        neighbors: {
            loved: [],
            liked: ["dryad", "guide"],
            disliked: ["nurse"],
            hated: ["truffle"],
        },
        order: 170,
    },
    stylist: {
        name: "Stylist",
        biome: {
            liked: "ocean",
            disliked: "snow",
        },
        neighbors: {
            loved: ["dyetrader"],
            liked: ["pirate"],
            disliked: ["tavernkeep"],
            hated: ["tinkerer"],
        },
        order: 180,
    },
    angler: {
        name: "Angler",
        biome: {
            liked: "ocean",
            disliked: "desert",
        },
        neighbors: {
            loved: [],
            liked: ["demolitionist", "partygirl", "taxcollector"],
            disliked: [],
            hated: ["tavernkeep"],
        },
        order: 190,
    },
    pirate: {
        name: "Pirate",
        biome: {
            liked: "ocean",
            disliked: "underground",
        },
        neighbors: {
            loved: ["angler"],
            liked: ["tavernkeep"],
            disliked: ["stylist"],
            hated: ["guide"],
        },
        order: 200,
    },
    mechanic: {
        name: "Mechanic",
        biome: {
            liked: "snow",
            disliked: "underground",
        },
        neighbors: {
            loved: ["tinkerer"],
            liked: ["cyborg"],
            disliked: ["armsdealer"],
            hated: ["clothier"],
        },
        order: 210,
    },
    taxcollector: {
        name: "Tax Collector",
        biome: {
            liked: "snow",
            disliked: "hallow",
        },
        neighbors: {
            loved: ["merchant"],
            liked: ["partygirl"],
            disliked: ["demolitionist", "mechanic"],
            hated: ["santa"],
        },
        order: 220,
    },
    cyborg: {
        name: "Cyborg",
        biome: {
            liked: "snow",
            disliked: "jungle",
        },
        neighbors: {
            loved: [],
            liked: ["steampunker", "pirate", "stylist"],
            disliked: ["zoologist"],
            hated: ["wizard"],
        },
        order: 230,
    },
    santa: {
        name: "Santa Claus",
        biome: {
            liked: "snow",
            disliked: "desert", // special case: Santa has different bonuses
        },
        neighbors: {
            loved: [],
            liked: [],
            disliked: [],
            hated: ["taxcollector"],
        },
        order: 240,
    },
    princess: {
        name: "Princess",
        biome: {
            liked: "n/a",
            disliked: "n/a",
        },
        neighbors: { // special case: loves up to 3 neighbors, hates being lonely
            loved: [],
            liked: [],
            disliked: [],
            hated: [],
        },
        order: 245,
    },
    truffle: {
        name: "Truffle",
        biome: {
            liked: "mushroom",
            disliked: "forest", // special case: literally can't live in non-mushroom
        },
        neighbors: {
            loved: ["guide"],
            liked: ["dryad"],
            disliked: ["clothier"],
            hated: ["witchdoctor"],
        },
        order: 250,
    },
}

const qualityColors = {
    loved: {
        bg: "primary",
        text: "white",
    },
    liked: {
        bg: "success",
        text: "white",
    },
    disliked: {
        bg: "warning",
        text: "body",
    },
    hated: {
        bg: "danger",
        text: "white",
    },
    horrendous: {
        bg: "dark",
        text: "white",
    }
}

const prefImpacts = {
    loved: 0.90,
    liked: 0.95,
    disliked: 1.05,
    hated: 1.10,
    horrendous: 1000.0,
}

const sortInds = {
    loved: 0, 
    liked: 1, 
    disliked: 2, 
    hated: 3,
    horrendous: 4,
}