/*

Ratings and how they work:

-1: Detrimental
	  An ability that severely harms the user.
	ex. Defeatist, Slow Start

 0: Useless
	  An ability with no overall benefit in a singles battle.
	ex. Color Change, Plus

 1: Ineffective
	  An ability that has minimal effect or is only useful in niche situations.
	ex. Light Metal, Suction Cups

 2: Useful
	  An ability that can be generally useful.
	ex. Flame Body, Overcoat

 3: Effective
	  An ability with a strong effect on the user or foe.
	ex. Chlorophyll, Natural Cure

 4: Very useful
	  One of the more popular abilities. It requires minimal support to be effective.
	ex. Adaptability, Magic Bounce

 5: Essential
	  The sort of ability that defines metagames.
	ex. Imposter, Shadow Tag

*/

'use strict';

/**@type {{[k: string]: AbilityData}} */
let BattleAbilities = {
	"aerobic": {
		id: "aerobic",
		name: "Aerobic",
		shortDesc: "When attacking with Wind, gets SPDEF- and SPD +.",
		onAfterMoveSecondary(target, source, move) {
			if (move.type === 'Wind') {
				this.add('-ability', source, 'Aerobic', 'boost');
				this.boost({spd: -1, spe: 1}, source, source);
			}
		},
	},
	"airspecialist": {
		id: "airspecialist",
		name: "Air Specialist",
		shortDesc: "+15% damage with Wind techniques.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Wind') {
				this.debug('Air Specialist boost');
				return this.chainModify(1.15);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Wind') {
				this.debug('Air Specialist boost');
				return this.chainModify(1.15);
			}
		},
		onAfterMove(target, source, move) {
			if (move.type === 'Wind') {
				this.add('-activate', target, 'ability: Air Specialist');
			}
		},
	},
	"amphibian": {
		id: "amphibian",
		name: "Amphibian",
		shortDesc: "When attacked with a Water technique, increases SPD by 1 stage.",
		onAfterDamage(damage, target, source, effect) {
			if (effect && effect.type === 'Water') {
				this.boost({spd: 1});
			}
		},
	},
	"anaerobic": {
		id: "anaerobic",
		name: "Anaerobic",
		shortDesc: "When attacking with Toxic, gets SPDEF+ and SPATK-.",
		onAfterMoveSecondary(target, source, move) {
			if (move.type === 'Toxic') {
				this.add('-ability', source, 'Anaerobic', 'boost');
				this.boost({spd: 1, spa: -1}, source, source);
			}
		},
	},
	"apothecary": {
		id: "apothecary",
		name: "Apothecary",
		shortDesc: "When attacking with a special technique, the target gets Poisoned Status condition for 1 turn if it's a rival or Regenerate Status condition for 1 turn if it's an ally.",
		onSourceHit(target, source, move) {
			if (source.side === target.side) target.trySetStatus('regenerated', source);
			else target.trySetStatus('psn', source, null, 1);
		},
	},
	"avenger": {
		id: "avenger",
		name: "Avenger",
		shortDesc: "When an ally is knocked-out, increases SPATK and SPD by 1 stage.",
		onAllyFaint(target) {
			this.boost({spa: 1, spd: 1}, source, source);
		}
	},
	"benefactor": {
		id: "benefactor",
		name: "Benefactor",
		shortDesc: "When an ally is damaged, restores 10% of max HP.",
		onAllyAfterDamage(damage, target, source) {
			if (target == this.effectData.target || !this.effectData.target.hp) return;
			this.heal(this.effectData.target.baseMaxhp/10, this.effectData.target);
		}
	},
	"botanist": {
		id: "botanist",
		name: "Botanist",
		shortDesc: "+15% damage with Nature techniques.",
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Nature') {
				this.debug('Botanist boost');
				return this.chainModify(1.15);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Nature') {
				this.debug('Botanist boost');
				return this.chainModify(1.15);
			}
		},
		onAfterMove(target, source, move) {
			if (move.type === 'Nature') {
				this.add('-activate', target, 'ability: Botanist');
			}
		},
	},
	"botanophobia": {
		id: "botanophobia",
		name: "Botanophobia",
		shortDesc: "When attacked with a Nature technique, increases damage by 50%.",
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Nature') mod *= 1.5;
			return this.chainModify(mod);
			this.add('-activate', target, 'ability: Botanophobia');
		},
	},
	"brawny": {
		id: "brawny",
		name: "Brawny",
		shortDesc: "Physical techniques do 20% more damage.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.modify(atk, 1.2);
		},
	},
	"bully": {
		id: "bully",
		name: "Bully",
		shortDesc: "While allies outnumber rivals, techniques inflict +30% damage.",
		onModifyDamage(damage, source, target, move) {
			let foeSide = source.side.pokemon.length;
			let allySide = target.side.pokemon.length;
			if (allySide > foeSide) return this.chainModify(1.3);
		},
		onAfterMove(target, source, move) {
			let foeSide = source.side.pokemon.length;
			let allySide = target.side.pokemon.length;
			if (allySide > foeSide) this.add('-activate', target, 'ability: Bully');
		},
	},
	"caffeinated": {
		id: "caffeinated",
		name: "Caffeinated",
		shortDesc: "Prevents the Asleep Status condition.",
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[from] ability: Caffeinated');
			return false;
		},
	},
	"callosity": {
		id: "callosity",
		name: "Callosity",
		shortDesc: "When attacked by a physical technique, increases DEF by 1 stage.",
		onAfterDamage(damage, target, source, effect) {
			if (effect && effect.category === 'Physical') {
				this.boost({def: 1});
			}
		},
	},
	"camaraderie": {
		id: "camaraderie",
		name: "Camaraderie",
		shortDesc: "When attacked, reduces 50% damage if both allies are part of the same evolutionary line.",
		//WIP
	},
	"channeler": {
		id: "channeler",
		name: "Channeler",
		shortDesc: "Damage done with Special techniques is increased by 25%.",
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.modify(spa, 1.25);
		},
	},
	"coldnatured": {
		id: "coldnatured",
		name: "Cold-Natured",
		shortDesc: "Instead of getting Cold, the Temtem gets Frozen.",
		//WIP
	},
	"demoralize": {
		id: "demoralize",
		name: "Demoralize",
		shortDesc: "When entering the battlefield, decreases enemy team SPD by 1 stage.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Demoralize', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else if (target.hasAbility(['Inner Focus', 'Oblivious', 'Own Tempo', 'Scrappy'])) {
					this.add('-immune', target, `[from] ability: ${this.dex.getAbility(target.ability).name}`);
				} else {
					this.boost({spd: -1}, target, pokemon, null, true);
				}
			}
		},
	},
	"determined": {
		id: "determined",
		name: "Determined",
		shortDesc: "Prevents negative stat stage changes.",
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			for (let i in boost) {
				// @ts-ignore
				if (boost[i] < 0) {
					// @ts-ignore
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(/** @type {ActiveMove} */(effect)).secondaries) {
				this.add("-fail", target, "unboost", "[from] ability: Determined", "[of] " + target);
			}
		},
	},
	"electricsynthesize": {
		id: "electricsynthesize",
		name: "Electric Synthesize",
		shortDesc: "When attacked with an Electric technique, restores HP instead of receiving damage.",
		//WIP
	},
	"energyreserve": {
		id: "energyreserve",
		name: "Energy Reserve",
		shortDesc: "If HP is below 25% by the end of the turn, gets Vigorized for 2 turns.",
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				this.add('-activate', target, 'ability: Energy Reserve');
				pokemon.addVolatile('vigorized');
			}
		},
	},
	"faintedcurse": {
		id: "faintedcurse",
		name: "Fainted Curse",
		shortDesc: "When knocked-out, the attacker loses 40% of max HP.",
		onAfterDamageOrder: 1,
		onAfterDamage(damage, target, source, move) {
			if (source && source !== target && move && !target.hp) {
				this.add('-activate', target, 'ability: Fainted Curse');
				this.damage(source.baseMaxhp / 2.5, source, target);
			}
		},
	},
	"fastcharge": {
		id: "fastcharge",
		name: "Fast Charge",
		shortDesc: "When a Digital ally enters the battlefield, gets SPD +2.",
		onAllySwitchIn(pokemon) {
			if(pokemon.type == 'Digital') {
				this.add('-activate', target, 'ability: Fast Charge');
				this.boost({spd:2}, this.effectData.target, this.effectData.target);
			}
		}
	},
	"feverrush": {
		id: "feverrush",
		name: "Fever Rush",
		shortDesc: "When getting a Status condition, increases ATK by 1 stage.",
		onAfterSetStatus(status, target, source, effect) {
			this.add('-activate', target, 'ability: Fever Rush');
			this.boost({atk:1}, target);
		},
	},
	"flawedcrystal": {
		id: "flawedcrystal",
		name: "Flawed Crystal",
		shortDesc: "When attacked by a Mental, Toxic, or Electric Technique, increases damage by 50%.",
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Mental' || move.type === 'Toxic' || move.type === 'Electric') mod *= 1.5;
			return this.chainModify(mod);
		},
		onAfterMove(target, source, move) {
			if (move.type === 'Mental' || move.type === 'Toxic' || move.type === 'Electric') this.add('-activate', target, 'ability: Flawed Crystal');
		}
	},
	"friendship": {
		id: "friendship",
		name: "Friendship",
		shortDesc: "Immune to ally's offensive techniques.",
		onTryHit(target, source, move) {
			if (target !== source && target.side === source.side && move.category !== 'Status') {
				this.add('-activate', target, 'ability: Friendship');
				return null;
			}
		},
	},
	"furor": {
		id: "furor",
		name: "Furor",
		shortDesc: "When HP is below 33%, techniques do 33% more damage.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 3) {
				this.debug('Furor boost');
				return this.chainModify(1.33);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 3) {
				this.debug('Furor boost');
				return this.chainModify(1.33);
			}
		},
		onAfterMove(target, source, move) {
			if (target.hp <= target.maxhp / 3) this.add('-activate', target, 'ability: Furor');
		}
	},
	"guardian": {
		id: "guardian",
		name: "Guardian",
		shortDesc: "Prevents the cold, burned, poisoned and doomed Status condition on the ally.",
		onAllySetStatus(status, target, source, effect) {
			if (target !== source) {
				if (status.id === 'psn' || status.id === 'brn') {
					this.debug('Guardian interrupts status');
					this.add('-activate', this.effectData.target, 'ability: Guardian', '[of] ' + target);
					return null;
				}
			}
		},
		onAllyTryAddVolatile(status, target) {
			if (target !== source) {
				if (status.id === 'cold' || status.id === 'doomed') {
					this.debug('Guardian blocking status');
					this.add('-activate', this.effectData.target, 'ability: Guardian', '[of] ' + target);
					return null;
				}
			}
		},
	},
	"hover": {
		id: "hover",
		name: "Hover",
		shortDesc: "When attacked with an Earth technique, reduces damage by 50%.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Earth') return this.chainModify(0.5);
		},
		onAfterMove(target, source, move) {
			if (move.type === 'Earth') this.add('-activate', target, 'ability: Hover');
		}
	},
	"hydrologist": {
		id: "hydrologist",
		name: "Hydrologist",
		shortDesc: "+15% damage with Water techniques.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Hydrologist boost');
				return this.chainModify(1.15);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Hydrologist boost');
				return this.chainModify(1.15);
			}
		},
		onAfterMove(target, source, move) {
			if (move.type === 'Water') {
				this.add('-activate', target, 'ability: Hydrologist');
			}
		},
	},
	"immunity": {
		id: "immunity",
		name: "Immunity",
		shortDesc: "Resists damage from Toxic techniques.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Toxic') return this.chainModify(0.5);
		},
		onAfterMove(target, source, move) {
			if (move.type === 'Toxic') this.add('-activate', target, 'ability: Immunity');
		}
	},
	"individualist": {
		id: "individualist",
		name: "Individualist",
		shortDesc: "Techniques targeting the ally will fail.",
		onAnyTryMove(target, source, effect) {
			if (target !== this.effectData.target && target.side === this.effectData.target.side) {
				this.add('-activate', target, 'ability: Individualist');
				return false;
			}
		},
	},
	"lastrush": {
		id: "lastrush",
		name: "Last Rush",
		shortDesc: "Increases ATK, SPATK and SPD by 50% while being the last standing allied Temtem.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (target.side.pokemon.length === 1) return this.chainModify(1.5);
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (target.side.pokemon.length === 1) return this.chainModify(1.5);
		},
		onModifySpDPriority: 5,
		onModifySpD(atk, attacker, defender, move) {
			if (target.side.pokemon.length === 1) return this.chainModify(1.5);
		},
		onAllyFaint(target, source, move) {
			if (target.side.pokemon.length === 1) this.add('-activate', target, 'ability: Last Rush');
		},
		onStart(target) {
			if (target.side.pokemon.length === 1) this.add('-activate', target, 'ability: Last Rush');
		}
	},
	"loneliness": {
		id: "loneliness",
		name: "Loneliness",
		shortDesc: "Synergies won't work on both allies.",
		//WIP
	},
	"mentalalliance": {
		id: "mentalalliance",
		name: "Mental Alliance",
		shortDesc: "Increases SPATK by 15% if an ally is Mental.",
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.side.active.length === 1) {
				return;
			}
			for (const allyActive of pokemon.side.active) {
				if (allyActive && allyActive.position !== pokemon.position && !allyActive.fainted && allyActive.hasType(['Mental'])) {
					return this.chainModify(1.15);
				}
			}
		},
		onAfterMove(pokemon, source, move) {
			if (pokemon.side.active.length === 1) {
				return;
			}
			for (const allyActive of pokemon.side.active) {
				if (allyActive && allyActive.position !== pokemon.position && !allyActive.fainted && allyActive.hasType(['Mental'])) {
					this.add('-activate', target, 'ability: Mental Alliance');
				}
			}
		}
	},
	"mirroring": {
		id: "mirroring",
		name: "Mirroring",
		shortDesc: "When attacked with a Special technique, the attacker gets 20% knockback damage.",
		onAfterDamageOrder: 1,
		onAfterDamage(damage, target, source, move) {
			if (source && source !== target && move && move.effectType === 'Move' && move.category === 'Special') {
				this.damage(damage / 5, source, target);
			}
		},
	},
	"mithridatism": {
		id: "mithridatism",
		name: "Mithridatism",
		shortDesc: "Prevents the Poisoned Status condition.",
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'psn') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[from] ability: Mithraditism');
			return false;
		},
	},
	"motivator": {
		id: "motivator",
		name: "Motivator",
		shortDesc: "At the start of the turn, allies restore 10% of STA.",
		//WIP
	},
	"mucous": {
		id: "mucous",
		name: "Mucous",
		shortDesc: "Resists damage from Electric techniques and prevents the cold and burned Status condition.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Electric') return this.chainModify(0.5);
		},
		onAfterMove(target, source, move) {
			if (move.type === 'Electric') this.add('-activate', target, 'ability: Mucous');
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[from] ability: Mucous');
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'cold') {
				this.add('-immune', target, '[from] ability: Mucous');
				return null;
			}
		},
	},
	"neutrality": {
		id: "neutrality",
		name: "Neutrality",
		shortDesc: "Prevents all Status Conditions.",
		onSetStatus(status, target, source, effect) {
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[from] ability: Neutrality');
			return false;
		},
		onTryAddVolatile(status, target) {
			this.add('-immune', target, '[from] ability: Neutrality');
			return null;
		},
	},
	"parrier": {
		id: "parrier",
		name: "Parrier",
		shortDesc: "Damage taken from physical techniques is reduced by 30%.",
		onModifyDefPriority: 6,
		onModifyDef(def) {
			return this.chainModify(1.3);
		},
		onAfterMove(target, source, move) {
			if (move.category === 'Physical') this.add('-activate', target, 'ability: Parrier');
		}
	},
	"patient": {
		id: "patient",
		name: "Patient",
		shortDesc: "Restores 10% of max STA when using a Hold technique.",
		//WIP Requires Stamina
	},
	"plethoric": {
		id: "plethoric",
		name: "Plethoric",
		shortDesc: "Temtem has 30% more SPD when HP is full.",
		onModifySpDPriority: 6,
		onModifySpD(spd) {
			if (this.effectData.target.hp >= this.effectData.target.baseMaxhp) return this.chainModify(1.3);
		},
		onStart(target) {
			if (this.effectData.target.hp >= this.effectData.target.baseMaxhp) this.add('-activate', target, 'ability: Plethoric');
		},
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (this.effectData.target.hp >= this.effectData.target.baseMaxhp) this.add('-activate', target, 'ability: Plethoric');
		},
	},
	"powernap": {
		id: "powernap",
		name: "Power Nap",
		shortDesc: "At the start of the turn, restores 15% of max HP of an Asleep Temtem.",
		//WIP Needs Info
	},
	"prideful": {
		id: "prideful",
		name: "Prideful",
		shortDesc: "When attacking, gets ATK+, SPATK+ and SPD+ if the target gets knocked-out.",
		onSourceFaint(target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: 1, spa:1, spd:1}, source);
			}
		},
	},
	"protector": {
		id: "protector",
		name: "Protector",
		shortDesc: "When entering the battlefield, the ally gets DEF+ and SDPEF+.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.active) {
				if (!target || !this.isAdjacent(target, pokemon) || target === pokemon) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Protector', 'boost');
					activated = true;
				}
				this.boost({def:1, spd: 1}, target, pokemon, null, true);
			}
		},
	},
	"provident": {
		id: "provident",
		name: "Provident",
		shortDesc: "When attacked by a Fire, Earth, or Melee technique, increases SPDEF by 1 Stage.",
		onAfterDamage(damage, target, source, effect) {
			if (effect && (effect.type === 'Fire' || effect.type === 'Earth' || effect.type === 'Melee')) {
				this.boost({spd: 1});
			}
		},
	},
	"punchingbag": {
		id: "punchingbag",
		name: "Punching Bag",
		shortDesc: "Damage taken from Melee techniques is reduced by 30%",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Melee') return this.chainModify(0.7);
		},
		onAfterMove(target, source, move) {
			if (move.type === 'Melee') this.add('-activate', target, 'ability: Punching Bag');
		}
	},
	"puppetmaster": {
		id: "puppetmaster",
		name: "Puppet Master",
		shortDesc: "While HP is below 40%, received rival techniques get redirected to the ally.",
		onSourceBeforeTurn(pokemon) {
			if (pokemon.hp < pokemon.maxhp / 2.5) {
				for (const target of pokemon.side.active) {
					if (!target || !this.isAdjacent(target, pokemon) || target === pokemon) continue;
					this.add('-activate', pokemon, 'ability: Puppet Master');
					target.addVolatile('spotlight');
				}
			}
		}
	},
	"pyromaniac": {
		id: "pyromaniac",
		name: "Pyromaniac",
		shortDesc: "+15% damage with Fire techniques.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Pyromaniac boost');
				return this.chainModify(1.15);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Pyromaniac boost');
				return this.chainModify(1.15);
			}
		},
		onAfterMove(target, source, move) {
			if (move.type === 'Fire') {
				this.add('-activate', target, 'ability: Pyromaniac');
			}
		},
	},
	"receptive": {
		id: "receptive",
		name: "Receptive",
		shortDesc: "When getting a favorable status condition, increases its turns by 1.",
		//WIP Requires Status
	},
	"rejuvenate": {
		id: "rejuvenate",
		name: "Rejuvenate",
		shortDesc: "When attacking with a physical technique, restore 15% of max HP.",
		onAfterMoveSecondary(target, source, move) {
			if (move.category === 'Physical') {
				this.add('-activate', target, 'ability: Rejuvenate');
				this.heal((source.baseMaxhp * 3)/20, source);
			}
		},
	},
	"resilient": {
		id: "resilient",
		name: "Resilient",
		shortDesc: "Cannot be knocked-out due to overexertion.",
		//WIP Requires Stamina
	},
	"resistant": {
		id: "resistant",
		name: "Resistant",
		shortDesc: "When getting a negative status condition, decreases its turns by 1.",
		//WIP Requires Status
	},
	"rested": {
		id: "rested",
		name: "Rested",
		shortDesc: "Increases ATK and SPATK by 30% during the first 2 turns the Temtem is on the battlefield.",
		onStart(pokemon) {
			pokemon.addVolatile('rested');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['rested'];
			this.add('-end', pokemon, 'Rested', '[silent]');
		},
		effect: {
			duration: 2,
			onStart(target) {
				this.add('-start', target, 'ability: Rested');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(1.3);
			},
			onModifySpA(spe, pokemon) {
				return this.chainModify(1.3);
			},
			onEnd(target) {
				this.add('-end', target, 'Rested');
			},
		},
	},
	"scavenger": {
		id: "scavenger",
		name: "Scavenger",
		shortDesc: "Restores 15% of max HP if another Temtem is knocked-out.",
		onAnyFaintPriority: 1,
		onAnyFaint() {
			this.heal((this.effectData.target.baseMaxhp * 3)/20, this.effectData.target);
		},
	},
	"settling": {
		id: "settling",
		name: "Settling",
		shortDesc: "Increases ATK by 8% for each turn the Temtem stays on the battlefield.",
		onStart(pokemon) {
			pokemon.addVolatile('settling');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['settling'];
			this.add('-end', pokemon, 'Settling', '[silent]');
		},
		effect: {
			onStart(target) {
				this.add('-start', target, 'ability: Settling');
				this.effectData.multi = 1.0;
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(this.effectData.multi);
			},
			onResidualOrder: 9,
			onResidual(pokemon) {
				this.effectData.multi += 0.08;
				this.add('-activate', target, 'ability: Settling');
			},
			onEnd(target) {
				this.add('-end', target, 'Settling');
			},
		},
	},
	"sharedpain": {
		id: "sharedpain",
		name: "Shared Pain",
		shortDesc: "When receiving a consecutive attack in the same turn, the technique gets redirected to the ally.",
		//WIP Just difficult
	},
	"softtouch": {
		id: "softtouch",
		name: "Soft Touch",
		shortDesc: "When attacking an Asleep Status condition target, it won't wake up.",
		//WIP Requires Status
	},
	"spoilsport": {
		id: "spoilsport",
		name: "Spoilsport",
		shortDesc: "+25% damage with multi-target techniques.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.target === 'allAdjacentFoes') {
				return this.chainModify(1.25);
			}
		},
	},
	"strongliver": {
		id: "strongliver",
		name: "Strong Liver",
		shortDesc: "When attacked with a Toxic techniques, restores HP instead of receiving damage.",
		//WIP Effort
	},
	"synergymaster": {
		id: "synergymaster",
		name: "Synergy Master",
		shortDesc: "Damage done with synergy techniques is increased by 25% while the Temtem participate in the synergy.",
		//WIP Requires Synergy
	},
	"thickskin": {
		id: "thickskin",
		name: "Thick Skin",
		shortDesc: "When attacked by a Fire technique, reduces damage by 50%.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire') return this.chainModify(0.5);
		},
		onAfterMove(target, source, move) {
			if (move.type === 'Fire') this.add('-activate', target, 'ability: Thick Skin');
		}
	},
	"tireless": {
		id: "tireless",
		name: "Tireless",
		shortDesc: "Prevents the overexertion turn penalization.",
		//WIP Requires Stamina
	},
	"toxicaffinity": {
		id: "toxicaffinity",
		name: "Toxic Affinity",
		shortDesc: "Toxic techniques get a damage boost of the same type.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Toxic') {
				this.debug('Toxic Affinity boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Toxic') {
				this.debug('Toxic Affinity boost');
				return this.chainModify(1.5);
			}
		},
		onAfterMove(target, source, move) {
			if (move.type === 'Toxic') {
				this.add('-activate', target, 'ability: Toxic Affinity');
			}
		},
	},
	"toxicfarewell": {
		id: "toxicfarewell",
		name: "Toxic Farewell",
		shortDesc: "When knocked-out, the attacker gets the Poisoned Status condition for 3 turns.",
		onAfterDamageOrder: 1,
		onAfterDamage(damage, target, source, move) {
			if (source && source !== target && move && !target.hp) {
				this.trySetStatus('psn', source);
			}
		},
	},
	"toxicskin": {
		id: "toxicskin",
		name: "Toxic Skin",
		shortDesc: "When attacked with a physical technique, the attacker gets Poisoned Status condition for 2 turns.",
		onAfterDamage(damage, target, source, move) {
			if (move && move.category === 'Physical') {
				source.trySetStatus('psn', target, null, 2);
				target.statusData.time = 2;
				target.statusData.startTime = 2;
			}
		},
	},
	"trance": {
		id: "trance",
		name: "Trance",
		shortDesc: "When attacked, gets asleep Status condition for 2 turns, SPATK +2 and SPDEF +2 if HP is below 30%.",
		//WIP Needs Info
	},
	"trauma": {
		id: "trauma",
		name: "Trauma",
		shortDesc: "Decreases DEF by 1 stage if hit by a physical technique, and decreases SPDEF by 1 stage if hit by a special technique.",
		onAfterDamage(damage, target, source, effect) {
			if (effect && effect.effectType === 'Move' && effect.id !== 'confused') {
				if(effect.category === 'Physical') this.boost({def: -1});
				if(effect.category === 'Special') this.boost({spd: -1});
			}
		},
	},
	"triapothecary": {
		id: "triapothecary",
		name: "Tri-Apothecary",
		shortDesc: "When attacking with a special technique, the target gets poisoned for 3 turns if it's a rival or regenerating for 3 turns if it's an ally.",
	},
	"vigorous": {
		id: "vigorous",
		name: "Vigorous",
		shortDesc: "Damage done when overexerting is increased by 50%.",
		//WIP Needs Stamina
	},
	"warmblooded": {
		id: "warmblooded",
		name: "Warm-Blooded",
		shortDesc: "Prevents the cold Status condition.",
		//WIP Effort
	},
	"wateraffinity": {
		id: "wateraffinity",
		name: "Water Affinity",
		shortDesc: "Water techniques get a damage boost of the same type.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Water Affinity boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Water Affinity boost');
				return this.chainModify(1.5);
			}
		},
		onAfterMove(target, source, move) {
			if (move.type === 'Water') {
				this.add('-activate', target, 'ability: Water Affinity');
			}
		},
	},
	"withdrawal": {
		id: "withdrawal",
		name: "Withdrawal",
		shortDesc: "When resting, restores 15% of max HP and removes the asleep Status condition.",
		//WIP Requires Stamina
	},
	"wreckedfarewell": {
		id: "wreckedfarewell",
		name: "Wrecked Farewell",
		shortDesc: "When knocked-out by overexerting damage, every Temtem loses 25% of max HP.",
		//WIP Requires Stamina
	},
	"zen": {
		id: "zen",
		name: "Zen",
		shortDesc: "When getting the Asleep status condition, gets DEF +1 and SPDEF +1.",
		onAfterSetStatus(status, target, source, effect) {
			if (!source) return;
			if (status.id === 'slp') {
				this.add('-activate', target, 'ability: Zen');
				target.boost({spd: -1, spe: 1}, target);
			}
		},
	},
};

exports.BattleAbilities = BattleAbilities;
