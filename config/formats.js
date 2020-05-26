'use strict';

// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js

/**@type {(FormatsData | {section: string, column?: number})[]} */
let Formats = [

	// Sw/Sh Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "Temtem Singles",
	},
	{
		name: "[Gen 8] VGC Temtem",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656317/">Anything Goes</a>`,
		],
		gameType: 'doubles',
		forcedLevel: 50,
		mod: 'gen8',
		ruleset: ['Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', 'Species Clause', 'Nickname Clause'],
		onSwitchIn(pokemon) {
			if(pokemon.permaboosts) {
				this.boost(pokemon.permaboosts, pokemon);
			}
			if(pokemon.permavolatiles) {
				for(const vola in pokemon.permavolatiles) {
					pokemon.addVolatile(vola);
					if(pokemon.volatiles[vola].time) pokemon.volatiles[vola].time = pokemon.permavolatiles[vola].time;
					pokemon.volatiles[vola].age = pokemon.permavolatiles[vola].age;
				}
			}
		}
	},
	{
		name: "[Gen 8] Custom Game",

		mod: 'gen8',
		maxLevel: 9999,
		gameType: 'doubles',
		trunc(n) { return Math.trunc(n); },
		defaultLevel: 100,
		teamLength: {
			validate: [1, 24],
			battle: 24,
		},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
		
	},
];

exports.Formats = Formats;
