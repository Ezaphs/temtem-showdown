'use strict';

/**@type {{[k: string]: TypeData}} */
let BattleTypeChart = {
		"Neutral": {
		damageTaken: {
			"Neutral": 0,
			"Fire": 0,
			"Water": 0,
			"Nature": 0,
			"Electric": 0,
			"Earth": 0,
			"Mental": 1,
			"Wind": 0,
			"Digital": 0,
			"Melee": 0,
			"Crystal": 0,
			"Toxic": 0,
		},
	},
	"Fire": {
		damageTaken: {
			"Neutral": 0,
			"Fire": 2,
			"Water": 1,
			"Nature": 2,
			"Electric": 0,
			"Earth": 1,
			"Mental": 0,
			"Wind": 0,
			"Digital": 0,
			"Melee": 0,
			"Crystal": 2,
			"Toxic": 0,
		},
	},
	"Water": {
		damageTaken: {
			"Neutral": 0,
			"Fire": 2,
			"Water": 2,
			"Nature": 1,
			"Electric": 1,
			"Earth": 2,
			"Mental": 0,
			"Wind": 0,
			"Digital": 0,
			"Melee": 0,
			"Crystal": 0,
			"Toxic": 1,
		},
	},
	"Nature": {
		damageTaken: {
			"Neutral": 0,
			"Fire": 1,
			"Water": 2,
			"Nature": 2,
			"Electric": 2,
			"Earth": 2,
			"Mental": 0,
			"Wind": 0,
			"Digital": 0,
			"Melee": 0,
			"Crystal": 0,
			"Toxic": 1,
		},
	},
	"Electric": {
		damageTaken: {
			"Neutral": 0,
			"Fire": 0,
			"Water": 0,
			"Nature": 0,
			"Electric": 2,
			"Earth": 1,
			"Mental": 0,
			"Wind": 2,
			"Digital": 0,
			"Melee": 0,
			"Crystal": 1,
			"Toxic": 0,
		},
	},
	"Earth": {
		damageTaken: {
			"Neutral": 0,
			"Fire": 2,
			"Water": 1,
			"Nature": 1,
			"Electric": 2,
			"Earth": 0,
			"Mental": 0,
			"Wind": 1,
			"Digital": 0,
			"Melee": 1,
			"Crystal": 2,
			"Toxic": 2,
		},
	},
	"Mental": {
		damageTaken: {
			"Neutral": 2,
			"Fire": 0,
			"Water": 0,
			"Nature": 0,
			"Electric": 1,
			"Earth": 0,
			"Mental": 0,
			"Wind": 0,
			"Digital": 1,
			"Melee": 2,
			"Crystal": 1,
			"Toxic": 0,
		},
	},
	"Wind": {
		damageTaken: {
			"Neutral": 0,
			"Fire": 0,
			"Water": 0,
			"Nature": 0,
			"Electric": 1,
			"Earth": 2,
			"Mental": 0,
			"Wind": 2,
			"Digital": 0,
			"Melee": 0,
			"Crystal": 0,
			"Toxic": 0,
		},
	},
	"Digital": {
		damageTaken: {
			"Neutral": 0,
			"Fire": 0,
			"Water": 1,
			"Nature": 0,
			"Electric": 1,
			"Earth": 0,
			"Mental": 0,
			"Wind": 0,
			"Digital": 1,
			"Melee": 0,
			"Crystal": 0,
			"Toxic": 2,
		},
	},
	"Melee": {
		damageTaken: {
			"Neutral": 0,
			"Fire": 0,
			"Water": 0,
			"Nature": 0,
			"Electric": 0,
			"Earth": 0,
			"Mental": 1,
			"Wind": 0,
			"Digital": 1,
			"Melee": 2,
			"Crystal": 0,
			"Toxic": 0,
		},
	},
	"Crystal": {
		damageTaken: {
			"Neutral": 0,
			"Fire": 1,
			"Water": 0,
			"Nature": 0,
			"Electric": 2,
			"Earth": 1,
			"Mental": 2,
			"Wind": 0,
			"Digital": 0,
			"Melee": 1,
			"Crystal": 0,
			"Toxic": 2,
		},
	},
	"Toxic": {
		damageTaken: {
			"Neutral": 0,
			"Fire": 0,
			"Water": 2,
			"Nature": 2,
			"Electric": 0,
			"Earth": 0,
			"Mental": 0,
			"Wind": 1,
			"Digital": 0,
			"Melee": 0,
			"Crystal": 0,
			"Toxic": 2,
		},
	},
};

exports.BattleTypeChart = BattleTypeChart;
