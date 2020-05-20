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
                 "cyborg", "santa", "truffle"];

const npcProps = {
    guide: {
        name: "Guide",
        biome: {
            liked: "forest",
            disliked: "ocean",
        },
        order: 10,
    },
    merchant: {
        name: "Merchant",
        biome: {
            liked: "forest",
            disliked: "desert",
        },
        order: 20,
    },
    zoologist: {
        name: "Zoologist",
        biome: {
            liked: "forest",
            disliked: "desert",
        },
        order: 30,
    },
    golfer: {
        name: "Golfer",
        biome: {
            liked: "forest",
            disliked: "underground",
        },
        order: 40,
    },
    nurse: {
        name: "Nurse",
        biome: {
            liked: "hallow",
            disliked: "snow",
        },
        order: 50,
    },
    tavernkeep: {
        name: "Tavernkeep",
        biome: {
            liked: "hallow",
            disliked: "snow",
        },
        order: 60,
    },
    partygirl: {
        name: "Party Girl",
        biome: {
            liked: "hallow",
            disliked: "underground",
        },
        order: 70,
    },
    wizard: {
        name: "Wizard",
        biome: {
            liked: "hallow",
            disliked: "ocean",
        },
        order: 80,
    },
    demolitionist: {
        name: "Demolitionist",
        biome: {
            liked: "underground",
            disliked: "ocean",
        },
        order: 90,
    },
    tinkerer: {
        name: "Goblin Tinkerer",
        biome: {
            liked: "underground",
            disliked: "jungle",
        },
        order: 100,
    },
    clothier: {
        name: "Clothier",
        biome: {
            liked: "underground",
            disliked: "hallow",
        },
        order: 110,
    },
    dyetrader: {
        name: "Dye Trader",
        biome: {
            liked: "desert",
            disliked: "forest",
        },
        order: 120,
    },
    armsdealer: {
        name: "Arms Dealer",
        biome: {
            liked: "desert",
            disliked: "snow",
        },
        order: 130,
    },
    steampunker: {
        name: "Steampunker",
        biome: {
            liked: "desert",
            disliked: "jungle",
        },
        order: 140,
    },
    dryad: {
        name: "Dryad",
        biome: {
            liked: "jungle",
            disliked: "desert",
        },
        order: 150,
    },
    painter: {
        name: "Painter",
        biome: {
            liked: "jungle",
            disliked: "forest",
        },
        order: 160,
    },
    witchdoctor: {
        name: "Witch Doctor",
        biome: {
            liked: "jungle",
            disliked: "hallow",
        },
        order: 170,
    },
    stylist: {
        name: "Stylist",
        biome: {
            liked: "ocean",
            disliked: "snow",
        },
        order: 180,
    },
    angler: {
        name: "Angler",
        biome: {
            liked: "ocean",
            disliked: "desert",
        },
        order: 190,
    },
    pirate: {
        name: "Pirate",
        biome: {
            liked: "ocean",
            disliked: "underground",
        },
        order: 200,
    },
    mechanic: {
        name: "Mechanic",
        biome: {
            liked: "snow",
            disliked: "underground",
        },
        order: 210,
    },
    taxcollector: {
        name: "Tax Collector",
        biome: {
            liked: "snow",
            disliked: "hallow",
        },
        order: 220,
    },
    cyborg: {
        name: "Cyborg",
        biome: {
            liked: "snow",
            disliked: "jungle",
        },
        order: 230,
    },
    santa: {
        name: "Santa Claus",
        biome: {
            liked: "snow",
            disliked: "desert", // special case: Santa has different bonuses
        },
        order: 240,
    },
    truffle: {
        name: "Truffle",
        biome: {
            liked: "mushroom",
            disliked: "forest", // special case: literally can't live in non-mushroom
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
}