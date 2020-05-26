'use strict';

/**@type {{[k: string]: TemplateData}} */
let BattlePokedex = {
	oree: {
		num: 2,
		name: "Oree",
		types: ["Digital"],
		baseStats: {hp: 61, sta: 74, spe: 35, atk: 65, def: 44, spa: 32, spd: 31},
		abilities: {0: "Attack T"},
		evos: ["zaobian"],
	},
	zaobian: {
		num: 3,
		name: "Zaobian",
		types: ["Digital"],
		baseStats: {hp: 75, sta: 90, spe: 51, atk: 84, def: 50, spa: 42, spd: 44},
		abilities: {0: "Attack T"},
		prevo: "oree",
	},
	platypet: {
		num: 7,
		name: "Platypet",
		types: ["Water", "Toxic"],
		baseStats: {hp: 55, sta: 39, spe: 65, atk: 45, def: 31, spa: 67, spd: 56},
		abilities: {0: "Toxic Affinity", 1: "Amphibian"},
		evos: ["platox"],
	},
	platox: {
		num: 8,
		name: "Platox",
		types: ["Water", "Toxic"],
		baseStats: {hp: 62, sta: 44, spe: 74, atk: 50, def: 35, spa: 76, spd: 63},
		abilities: {0: "Resistant", 1: "Resilient"},
		evos: ["platimous"],
		prevo: "platypet",
	},
	platimous: {
		num: 9,
		name: "Platimous",
		types: ["Water", "Toxic"],
		baseStats: {hp: 71, sta: 49, spe: 82, atk: 56, def: 39, spa: 90, spd: 70},
		abilities: {0: "Zen", 1: "Determined"},
		prevo: "platox",
	},
	swali: {
		num: 10,
		name: "Swali",
		types: ["Nature"],
		baseStats: {hp: 44, sta: 65, spe: 35, atk: 50, def: 40, spa: 55, spd: 60},
		abilities: {0: "Mithridatism", 1: "Shared Pain"},
		evos: ["loali"],
	},
	loali: {
		num: 11,
		name: "Loali",
		types: ["Nature", "Wind"],
		baseStats: {hp: 55, sta: 80, spe: 80, atk: 60, def: 50, spa: 70, spd: 90},
		abilities: {0: "Toxic Farewell", 1: "Botanist"},
		prevo: "swali",
	},
	tateru: {
		num: 12,
		name: "Tateru",
		types: ["Neutral"],
		baseStats: {hp: 79, sta: 85, spe: 60, atk: 78, def: 66, spa: 54, spd: 66},
		abilities: {0: "Soft Touch", 1: "Resilient"},
	},
	paharo: {
		num: 16,
		name: "Paharo",
		types: ["Wind"],
		baseStats: {hp: 48, sta: 18, spe: 60, atk: 40, def: 40, spa: 50, spd: 50},
		abilities: {0: "Hover", 1: "Friendship"},
		evos: ["paharac"],
	},
	paharac: {
		num: 17,
		name: "Paharac",
		types: ["Wind"],
		baseStats: {hp: 60, sta: 30, spe: 70, atk: 50, def: 55, spa: 60, spd: 60},
		abilities: {0: "Caffeinated", 1: "Camaraderie"},
		evos: ["granpah"],
		prevo: "paharo",
	},
	granpah: {
		num: 18,
		name: "Granpah",
		types: ["Wind"],
		baseStats: {hp: 69, sta: 36, spe: 78, atk: 55, def: 61, spa: 72, spd: 66},
		abilities: {0: "Last Rush", 1: "Bully"},
		prevo: "paharac",
	},
	bunbun: {
		num: 21,
		name: "Bunbun",
		types: ["Earth", "Crystal"],
		baseStats: {hp: 72, sta: 40, spe: 69, atk: 50, def: 36, spa: 64, spd: 43},
		abilities: {0: "Caffeinated", 1: "Resilient"},
		evos: ["mudrid"],
	},
	mudrid: {
		num: 22,
		name: "Mudrid",
		types: ["Earth", "Crystal"],
		baseStats: {hp: 85, sta: 44, spe: 95, atk: 60, def: 42, spa: 80, spd: 50},
		abilities: {0: "Receptive", 1: "Resistant"},
		prevo: "bunbun",
	},
	hidody: {
		num: 23,
		name: "Hidody",
		types: ["Nature"],
		baseStats: {hp: 49, sta: 70, spe: 39, atk: 42, def: 39, spa: 62, spd: 55},
		abilities: {0: "Botanist", 1: "Electric Synthesize"},
		evos: ["taifu"],
	},
	taifu: {
		num: 24,
		name: "Taifu",
		types: ["Nature"],
		baseStats: {hp: 60, sta: 87, spe: 45, atk: 50, def: 45, spa: 85, spd: 89},
		abilities: {0: "Toxic Farewell", 1: "Resilient"},
		prevo: "hidody",
	},
	fomu: {
		num: 25,
		name: "Fomu",
		types: ["Water"],
		baseStats: {hp: 40, sta: 60, spe: 40, atk: 30, def: 35, spa: 65, spd: 70},
		abilities: {0: "Hydrologist", 1: "Amphibian"},
		evos: ["wiplump"],
	},
	wiplump: {
		num: 26,
		name: "Wiplump",
		types: ["Water", "Wind"],
		baseStats: {hp: 66, sta: 80, spe: 70, atk: 40, def: 50, spa: 95, spd: 80},
		abilities: {0: "Patient", 1: "Plethoric"},
		prevo: "fomu",
	},
	skail: {
		num: 27,
		name: "Skail",
		types: ["Neutral"],
		baseStats: {hp: 57, sta: 43, spe: 60, atk: 45, def: 50, spa: 32, spd: 41},
		abilities: {0: "Scavenger", 1: "Furor"},
		evos: ["skunch"],
	},
	skunch: {
		num: 28,
		name: "Skunch",
		types: ["Neutral", "Melee"],
		baseStats: {hp: 72, sta: 62, spe: 75, atk: 70, def: 70, spa: 45, spd: 60},
		abilities: {0: "Bully", 1: "Brawny"},
		prevo: "skail",
	},
	houchic: {
		num: 32,
		name: "Houchic",
		types: ["Mental"],
		baseStats: {hp: 38, sta: 44, spe: 66, atk: 40, def: 41, spa: 72, spd: 52},
		abilities: {0: "Mental Alliance", 1: "Soft Touch"},
		evos: ["tental"],
	},
	tental: {
		num: 33,
		name: "Tental",
		types: ["Mental"],
		baseStats: {hp: 41, sta: 51, spe: 76, atk: 42, def: 50, spa: 81, spd: 62},
		abilities: {0: "Avenger", 1: "Water Affinity"},
		prevo: "houchic",
	},
	orphyll: {
		num: 35,
		name: "Orphyll",
		types: ["Nature", "Toxic"],
		baseStats: {hp: 42, sta: 48, spe: 75, atk: 68, def: 64, spa: 27, spd: 40},
		abilities: {0: "Apothecary", 1: "Toxic Affinity"},
		evos: ["nidrasil"],
	},
	nidrasil: {
		num: 36,
		name: "Nidrasil",
		types: ["Nature", "Toxic"],
		baseStats: {hp: 77, sta: 52, spe: 61, atk: 88, def: 80, spa: 36, spd: 51},
		abilities: {0: "Toxic Farewell", 1: "Tri-Apothecary"},
		prevo: "orphyll",
	},
	banapi: {
		num: 37,
		name: "Banapi",
		types: ["Fire"],
		baseStats: {hp: 42, sta: 40, spe: 70, atk: 50, def: 50, spa: 40, spd: 41},
		abilities: {0: "Settling", 1: "Pyromaniac"},
		evos: ["capyre"],
	},
	capyre: {
		num: 38,
		name: "Capyre",
		types: ["Fire"],
		baseStats: {hp: 55, sta: 55, spe: 88, atk: 71, def: 68, spa: 45, spd: 47},
		abilities: {0: "Last Rush", 1: "Resilient"},
		prevo: "banapi",
	},
	lapinite: {
		num: 39,
		name: "Lapinite",
		types: ["Crystal"],
		baseStats: {hp: 58, sta: 31, spe: 46, atk: 44, def: 63, spa: 55, spd: 56},
		abilities: {0: "Electric Synthesize", 1: "Scavenger"},
		evos: ["azuroc"],
	},
	azuroc: {
		num: 40,
		name: "Azuroc",
		types: ["Crystal"],
		baseStats: {hp: 64, sta: 34, spe: 50, atk: 58, def: 69, spa: 60, spd: 62},
		abilities: {0: "Fainted Curse", 1: "Mirroring"},
		evos: ["zenoreth"],
		prevo: "lapinite",
	},
	zenoreth: {
		num: 41,
		name: "Zenoreth",
		types: ["Crystal"],
		baseStats: {hp: 71, sta: 35, spe: 56, atk: 67, def: 87, spa: 65, spd: 69},
		abilities: {0: "Channeler", 1: "Wrecked Farewell"},
		prevo: "azuroc",
	},
	bigu: {
		num: 44,
		name: "Bigu",
		types: ["Nature"],
		baseStats: {hp: 55, sta: 68, spe: 20, atk: 65, def: 38, spa: 41, spd: 42},
		abilities: {0: "Warm-Blooded", 1: "Amphibian"},
		evos: ["babawa"],
	},
	babawa: {
		num: 45,
		name: "Babawa",
		types: ["Nature", "Water"],
		baseStats: {hp: 85, sta: 92, spe: 40, atk: 79, def: 57, spa: 51, spd: 44},
		abilities: {0: "Mucous", 1: "Withdrawal"},
		prevo: "bigu",
	},
	kaku: {
		num: 48,
		name: "Kaku",
		types: ["Nature"],
		baseStats: {hp: 69, sta: 48, spe: 35, atk: 35, def: 60, spa: 60, spd: 50},
		abilities: {0: "Caffeinated", 1: "Mithridatism"},
		evos: ["saku"],
	},
	saku: {
		num: 49,
		name: "Saku",
		types: ["Nature", "Wind"],
		baseStats: {hp: 82, sta: 60, spe: 40, atk: 40, def: 62, spa: 66, spd: 70},
		abilities: {0: "Botanist", 1: "Air Specialist"},
		prevo: "kaku",
	},
	valash: {
		num: 50,
		name: "Valash",
		types: ["Neutral", "Crystal"],
		baseStats: {hp: 58, sta: 57, spe: 90, atk: 74, def: 56, spa: 74, spd: 56},
		abilities: {0: "Determined", 1: "Scavenger"},
	},
	barnshe: {
		num: 53,
		name: "Barnshe",
		types: ["Mental", "Wind"],
		baseStats: {hp: 50, sta: 51, spe: 65, atk: 60, def: 40, spa: 75, spd: 79},
		abilities: {0: "Neutrality", 1: "Air Specialist"},
	},
	gyalis: {
		num: 54,
		name: "Gyalis",
		types: ["Crystal", "Melee"],
		baseStats: {hp: 86, sta: 44, spe: 100, atk: 85, def: 61, spa: 23, spd: 61},
		abilities: {0: "Resistant", 1: "Mirroring"},
	},
	occlura: {
		num: 55,
		name: "Occlura",
		types: ["Crystal"],
		baseStats: {hp: 50, sta: 39, spe: 50, atk: 45, def: 43, spa: 38, spd: 65},
		abilities: {0: "Scavenger", 1: "Warm-Blooded"},
		evos: ["myx"],
	},
	myx: {
		num: 56,
		name: "Myx",
		types: ["Crystal", "Mental"],
		baseStats: {hp: 51, sta: 59, spe: 65, atk: 51, def: 43, spa: 94, spd: 80},
		abilities: {0: "Puppet Master", 1: "Rejuvenate"},
		prevo: "occlura",
	},
	raiber: {
		num: 57,
		name: "Raiber",
		types: ["Fire"],
		baseStats: {hp: 57, sta: 35, spe: 42, atk: 40, def: 61, spa: 59, spd: 38},
		abilities: {0: "Camaraderie", 1: "Rested"},
		evos: ["raize"],
	},
	raize: {
		num: 58,
		name: "Raize",
		types: ["Fire"],
		baseStats: {hp: 66, sta: 46, spe: 40, atk: 46, def: 74, spa: 69, spd: 43},
		abilities: {0: "Demoralize", 1: "Furor"},
		evos: ["raican"],
		prevo: "raiber",
	},
	raican: {
		num: 59,
		name: "Raican",
		types: ["Fire"],
		baseStats: {hp: 77, sta: 49, spe: 60, atk: 77, def: 77, spa: 51, spd: 50},
		abilities: {0: "Motivator", 1: "Prideful"},
		prevo: "raize",
	},
	pewki: {
		num: 60,
		name: "Pewki",
		types: ["Water"],
		baseStats: {hp: 70, sta: 32, spe: 33, atk: 42, def: 45, spa: 31, spd: 10},
		abilities: {0: "Hydrologist", 1: "Rested"},
		evos: ["piraniant"],
	},
	piraniant: {
		num: 61,
		name: "Piraniant",
		types: ["Water"],
		baseStats: {hp: 80, sta: 50, spe: 55, atk: 77, def: 85, spa: 65, spd: 37},
		abilities: {0: "Energy Reserve", 1: "Patient"},
		prevo: "pewki",
	},
	saipat: {
		num: 69,
		name: "Saipat",
		types: ["Water", "Melee"],
		baseStats: {hp: 92, sta: 42, spe: 70, atk: 80, def: 50, spa: 70, spd: 40},
		abilities: {0: "Amphibian", 1: "Toxic Affinity"},
	},
	crystle: {
		num: 72,
		name: "Crystle",
		types: ["Crystal"],
		baseStats: {hp: 60, sta: 41, spe: 33, atk: 61, def: 69, spa: 46, spd: 42},
		abilities: {0: "Amphibian", 1: "Rested"},
		evos: ["sherald"],
	},
	sherald: {
		num: 73,
		name: "Sherald",
		types: ["Crystal"],
		baseStats: {hp: 68, sta: 45, spe: 43, atk: 69, def: 78, spa: 51, spd: 48},
		abilities: {0: "Provident", 1: "Mirroring"},
		prevo: "crystle",
	},
	hocus: {
		num: 79,
		name: "Hocus",
		types: ["Mental"],
		baseStats: {hp: 49, sta: 61, spe: 65, atk: 55, def: 34, spa: 55, spd: 34},
		abilities: {0: "Soft Touch", 1: "Mirroring"},
		evos: ["pocus"],
	},
	pocus: {
		num: 80,
		name: "Pocus",
		types: ["Mental"],
		baseStats: {hp: 60, sta: 73, spe: 78, atk: 69, def: 36, spa: 77, spd: 38},
		abilities: {0: "Dreaded Alarm", 1: "Rejuvenate"},
		prevo: "hocus",
	},
	sparzy: {
		num: 82,
		name: "Sparzy",
		types: ["Electric"],
		baseStats: {hp: 70, sta: 80, spe: 85, atk: 85, def: 46, spa: 42, spd: 46},
		abilities: {0: "Last Rush"},
	},
	mushi: {
		num: 84,
		name: "Mushi",
		types: ["Toxic"],
		baseStats: {hp: 48, sta: 33, spe: 68, atk: 48, def: 36, spa: 48, spd: 29},
		abilities: {0: "Resistant", 1: "Resilient"},
		evos: ["mushook"],
	},
	mushook: {
		num: 85,
		name: "Mushook",
		types: ["Toxic", "Melee"],
		baseStats: {hp: 67, sta: 45, spe: 81, atk: 81, def: 80, spa: 49, spd: 41},
		abilities: {0: "Parrier", 1: "Tireless"},
		prevo: "mushi",
	},
	magmis: {
		num: 86,
		name: "Magmis",
		types: ["Fire"],
		baseStats: {hp: 52, sta: 51, spe: 37, atk: 55, def: 42, spa: 45, spd: 35},
		abilities: {0: "Thick Skin", 1: "Caffeinated"},
		evos: ["mastione"],
	},
	mastione: {
		num: 87,
		name: "Mastione",
		types: ["Fire"],
		baseStats: {hp: 69, sta: 62, spe: 52, atk: 91, def: 65, spa: 62, spd: 37},
		abilities: {0: "Bully", 1: "Pyromaniac"},
		prevo: "magmis",
	},
	umishi: {
		num: 88,
		name: "Umishi",
		types: ["Water"],
		baseStats: {hp: 51, sta: 76, spe: 80, atk: 21, def: 34, spa: 63, spd: 45},
		abilities: {0: "Caffeinated", 1: "Shared Pain"},
		evos: ["ukama"],
	},
	ukama: {
		num: 89,
		name: "Ukama",
		types: ["Water"],
		baseStats: {hp: 68, sta: 90, spe: 100, atk: 34, def: 51, spa: 76, spd: 54},
		abilities: {0: "Hydrologist", 1: "Plethoric"},
		prevo: "umishi",
	},
	smazee: {
		num: 92,
		name: "Smazee",
		types: ["Melee"],
		baseStats: {hp: 49, sta: 55, spe: 66, atk: 69, def: 44, spa: 37, spd: 37},
		abilities: {0: "Friendship", 1: "Fever Rush"},
		evos: ["baboong"],
	},
	baboong: {
		num: 93,
		name: "Baboong",
		types: ["Melee"],
		baseStats: {hp: 54, sta: 61, spe: 75, atk: 79, def: 51, spa: 41, spd: 41},
		abilities: {0: "Warm-Blooded", 1: "Brawny"},
		prevo: "smazee",
	},
	spriole: {
		num: 102,
		name: "Spriole",
		types: ["Nature"],
		baseStats: {hp: 72, sta: 38, spe: 65, atk: 42, def: 70, spa: 37, spd: 31},
		abilities: {0: "Botanist", 1: "Camaraderie"},
		evos: ["deendre"],
	},
	deendre: {
		num: 103,
		name: "Deendre",
		types: ["Nature"],
		baseStats: {hp: 80, sta: 42, spe: 70, atk: 48, def: 74, spa: 42, spd: 35},
		abilities: {0: "Settling", 1: "Mithridatism"},
		evos: ["cerneaf"],
		prevo: "spriole",
	},
	cerneaf: {
		num: 104,
		name: "Cerneaf",
		types: ["Nature"],
		baseStats: {hp: 91, sta: 44, spe: 79, atk: 60, def: 88, spa: 43, spd: 46},
		abilities: {0: "Settling", 1: "Callosity"},
		prevo: "deendre",
	},
	toxolotl: {
		num: 105,
		name: "Toxolotl",
		types: ["Toxic"],
		baseStats: {hp: 59, sta: 40, spe: 47, atk: 50, def: 64, spa: 65, spd: 37},
		abilities: {0: "Toxic Farewell", 1: "Power Nap"},
		evos: ["noxolotl"],
	},
	noxolotl: {
		num: 106,
		name: "Noxolotl",
		types: ["Toxic"],
		baseStats: {hp: 72, sta: 49, spe: 61, atk: 61, def: 78, spa: 85, spd: 45},
		abilities: {0: "Trance", 1: "Toxic Skin"},
		prevo: "toxolotl",
	},
	blooze: {
		num: 107,
		name: "Blooze",
		types: ["Toxic"],
		baseStats: {hp: 68, sta: 50, spe: 33, atk: 43, def: 52, spa: 46, spd: 54},
		abilities: {0: "Bully", 1: "Toxic Skin"},
		evos: ["goolder"],
	},
	goolder: {
		num: 108,
		name: "Goolder",
		types: ["Toxic"],
		baseStats: {hp: 120, sta: 70, spe: 10, atk: 64, def: 56, spa: 68, spd: 56},
		abilities: {0: "Punching Bag", 1: "Strong Liver"},
		prevo: "blooze",
	},
	zephyruff: {
		num: 109,
		name: "Zephyruff",
		types: ["Toxic", "Wind"],
		baseStats: {hp: 58, sta: 34, spe: 68, atk: 43, def: 47, spa: 50, spd: 51},
		abilities: {0: "Toxic Affinity", 1: "Air Specialist"},
		evos: ["volarend"],
	},
	volarend: {
		num: 110,
		name: "Volarend",
		types: ["Toxic", "Wind"],
		baseStats: {hp: 64, sta: 38, spe: 74, atk: 51, def: 61, spa: 68, spd: 96},
		abilities: {0: "Aerobic", 1: "Anaerobic"},
		prevo: "zephyruff",
	},
	ganki: {
		num: 113,
		name: "Ganki",
		types: ["Electric", "Wind"],
		baseStats: {hp: 38, sta: 46, spe: 61, atk: 57, def: 38, spa: 62, spd: 73},
		abilities: {0: "Cold-Natured", 1: "Botanophobia"},
		evos: ["gazuma"],
	},
	gazuma: {
		num: 114,
		name: "Gazuma",
		types: ["Electric", "Wind"],
		baseStats: {hp: 46, sta: 53, spe: 67, atk: 68, def: 43, spa: 81, spd: 91},
		abilities: {0: "Fast Charge", 1: "Receptive"},
		prevo: "ganki",
	},
	oceara: {
		num: 115,
		name: "Oceara",
		types: ["Water"],
		baseStats: {hp: 64, sta: 42, spe: 100, atk: 54, def: 51, spa: 110, spd: 65},
		abilities: {0: "Hydrologist", 1: "Mithridatism"},
	},
	shuine: {
		num: 122,
		name: "Shuine",
		types: ["Crystal", "Water"],
		baseStats: {hp: 43, sta: 90, spe: 81, atk: 67, def: 49, spa: 72, spd: 60},
		abilities: {0: "Guardian", 1: "Immunity"},
	},
	nessla: {
		num: 123,
		name: "Nessla",
		types: ["Water", "Electric"],
		baseStats: {hp: 45, sta: 58, spe: 66, atk: 76, def: 50, spa: 70, spd: 72},
		abilities: {0: "Hydrologist", 1: "Electric Synthesize"},
	},
	kalazu: {
		num: 127,
		name: "Kalazu",
		types: ["Water"],
		baseStats: {hp: 63, sta: 24, spe: 28, atk: 54, def: 70, spa: 38, spd: 44},
		abilities: {0: "Mithridatism", 1: "Hydrologist"},
		evos: ["kalabyss"],
	},
	kalabyss: {
		num: 128,
		name: "Kalabyss",
		types: ["Water", "Toxic"],
		baseStats: {hp: 82, sta: 37, spe: 37, atk: 75, def: 100, spa: 65, spd: 55},
		abilities: {0: "Botanophobia", 1: "Loneliness"},
		prevo: "kalazu",
	},
	adoroboros: {
		num: 129,
		name: "Adoroboros",
		types: ["Toxic", "Mental"],
		baseStats: {hp: 66, sta: 66, spe: 60, atk: 29, def: 42, spa: 70, spd: 110},
		abilities: {0: "Synergy Master", 1: "Toxic Skin"},
	},
	tuwai: {
		num: 130,
		name: "Tuwai",
		types: ["Wind"],
		baseStats: {hp: 54, sta: 47, spe: 58, atk: 62, def: 45, spa: 60, spd: 47},
		abilities: {0: "Resilient", 1: "Spoilsport"},
		evos: ["tuvine"],
	},
	tuvine: {
		num: 133,
		name: "Tuvine",
		types: ["Wind", "Crystal"],
		baseStats: {hp: 57, sta: 47, spe: 65, atk: 65, def: 111, spa: 56, spd: 47},
		abilities: {0: "Receptive", 1: "Determined"},
		prevo: "tuwai",
	},
	kinu: {
		num: 137,
		name: "Kinu",
		types: ["Nature", "Mental"],
		baseStats: {hp: 47, sta: 74, spe: 74, atk: 53, def: 41, spa: 69, spd: 96},
		abilities: {0: "Benefactor", 1: "Protector"},
	},
	vulvir: {
		num: 138,
		name: "Vulvir",
		types: ["Fire", "Earth"],
		baseStats: {hp: 59, sta: 54, spe: 57, atk: 47, def: 64, spa: 47, spd: 31},
		abilities: {0: "Caffeinated", 1: "Camaraderie"},
		evos: ["vulor"],
	},
	vulor: {
		num: 139,
		name: "Vulor",
		types: ["Fire", "Earth"],
		baseStats: {hp: 65, sta: 59, spe: 63, atk: 49, def: 71, spa: 49, spd: 32},
		abilities: {0: "Individualist", 1: "Pyromaniac"},
		evos: ["vulcrane"],
		prevo: "vulvir",
	},
	vulcrane: {
		num: 140,
		name: "Vulcrane",
		types: ["Fire", "Earth"],
		baseStats: {hp: 76, sta: 65, spe: 73, atk: 74, def: 86, spa: 64, spd: 35},
		abilities: {0: "Receptive", 1: "Vigorous"},
		prevo: "vulor",
	},
	pigepic: {
		num: 141,
		name: "Pigepic",
		types: ["Wind"],
		baseStats: {hp: 54, sta: 72, spe: 58, atk: 60, def: 72, spa: 45, spd: 72},
		abilities: {0: "Friendship", 1: "Fainted Curse"},
	},
	anahir: {
		num: 161,
		name: "Anahir",
		types: ["Crystal", "Fire"],
		baseStats: {hp: 54, sta: 36, spe: 31, atk: 50, def: 101, spa: 50, spd: 101},
		abilities: {0: "Flawed Crystal", 1: "Trauma"},
	},
};

exports.BattlePokedex = BattlePokedex;
