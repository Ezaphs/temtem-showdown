'use strict';

/**@type {{[k: string]: PureEffectData}} */
let BattleStatuses = {
	brn: {
		name: 'brn',
		id: 'brn',
		num: 0,
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'flameorb') {
				this.add('-status', target, 'brn', '[from] item: Flame Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'brn');
			}
			this.effectData.time = 1;
		},
		onAnySetStatus(status, pokemon) {
			if (status.id === 'cld' || status.id === 'frz') {
				if (pokemon === this.effectData.target) {
					pokemon.removeVolatile('brn');
				}
			}
		},
		// Damage reduction is handled directly in the sim/battle.js damage function
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.removeVolatile('brn');
			}
		},
	},
	slp: {
		name: 'slp',
		id: 'slp',
		num: 0,
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'slp', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'slp', '[from] move: ' + sourceEffect.name);
			} else {
				this.add('-status', target, 'slp');
			}
			this.effectData.time = 1;
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			pokemon.statusData.time--;
			this.add('cant', pokemon, 'slp');
			if (move.sleepUsable) {
				return;
			}
			return false;
		},
		onHit(target, source, move) {
			if (move.category !== 'Status') {
				target.removeVolatile('slp');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.removeVolatile('slp');
			}
		},
	},
	cld: {
		name: 'cold',
		id: 'cld',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'cld', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'cld');
			}
			this.effectData.time = 1;
		},
		onAnySetStatus(status, pokemon) {
			if (status.id === 'brn') {
				if (pokemon === this.effectData.target) {
					pokemon.removeVolatile('cld');
				}
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.removeVolatile('cld');
			}
		},
	},
	frz: {
		name: 'frz',
		id: 'frz',
		num: 0,
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
			this.effectData.time = 1;
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['defrost']) return;
			this.add('cant', pokemon, 'frz');
			return false;
		},
		onAnySetStatus(status, pokemon) {
			if (status.id === 'brn') {
				if (pokemon === this.effectData.target) {
					pokemon.removeVolatile('frz');
				}
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.removeVolatile('frz');
			}
		},
	},
	psn: {
		name: 'psn',
		id: 'psn',
		num: 0,
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'psn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'psn');
			}
			this.effectData.time = 1;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.removeVolatile('psn');
			}
		},
	},
	trapped: {
		name: 'trapped',
		id: 'trapped',
		num: 0,
		onStart(pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectData.sourceEffect, '[of] ' + source);
			this.effectData.time = 1;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.removeVolatile('trapped');
			}
		},
		onTrapPokemon(pokemon) {
			if (this.effectData.source && this.effectData.source.isActive) pokemon.tryTrap();
		},
	},
	doomed: {
		name: 'doomed',
		id: 'doomed',
		num: 0,
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'doomed', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'doomed');
			}
			this.effectData.time = 1;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.damage(pokemon.hp);
				pokemon.removeVolatile('Doomed');
			}
		},
	},
	seized: {
		name: 'seized',
		id: 'seized',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'seized', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'seized');
			}
			this.effectData.time = 1;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.removeVolatile('seized');
			}
		},
	},
	regenerated: {
		name: 'regenerated',
		id: 'regenerated',
		num: 0,
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'regenerated', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'regenerated');
			}
			this.effectData.time = 1;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 10);
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.removeVolatile('regenerated');
			}
		},
	},
	alerted: {
		name: 'alerted',
		id: 'alerted',
		num: 0,
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'alerted', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'alerted');
			}
			this.effectData.time = 1;
		},
		onAnySetStatus(status, pokemon) {
			if (status.id === 'slp') {
				if (pokemon === this.effectData.target) {
					this.add('-fail', pokemon, 'slp', '[from] Alerted', '[msg]');
				} else {
					this.add('-fail', pokemon, 'slp', '[from] Alerted');
				}
				return null;
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.removeVolatile('alerted');
			}
		},
	},
	evading: {
		name: 'evading',
		id: 'evading',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'evading', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'evading');
			}
			this.effectData.time = 1;
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (move.category !== 'Status') {
				this.add('-immune', target, '[from] Evading');
				pokemon.removeVolatile('evading');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.removeVolatile('evading');
			}
		},
	},
	nullified: {
		name: 'nullified',
		id: 'nullified',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'nullified', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'nullified');
			}
			this.effectData.time = 1;
		},
		onEffectiveness: function (typeMod, target, type, move) {
			return 0;
		},
		onModifyDamage: function (damage, source, target, move) {
			if(move.type = source.getTypes()) {
				return this.chainModify(1.5);
			}
		},
		onModifyMovePriority: -5,
		onModifyMove: function (move) {
			move.type = '';
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.removeVolatile('nullified');
			}
		},
	},
	immune: {
		name: 'immune',
		id: 'immune',
		num: 0,
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'immune', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'immune');
			}
			this.effectData.time = 1;
		},
		onAnySetStatus(status, pokemon) {
			if (pokemon === this.effectData.target) {
				this.add('-fail', pokemon, 'immune', '[from] Immune', '[msg]');
			} else {
				this.add('-fail', pokemon, 'immune', '[from] Immune');
			}
			return null;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.removeVolatile('immune');
			}
		},
	},
	vigorized: {
		name: 'vigorized',
		id: 'vigorized',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'vigorized', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'vigorized');
			}
			this.effectData.time = 1;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.removeVolatile('vigorized');
			}
		},
	},
	exhausted: {
		name: 'exhausted',
		id: 'exhausted',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'exhausted', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'exhausted');
			}
			this.effectData.time = 1;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			pokemon.statusData.time--;
			if (pokemon.statusData.time <= 0) {
				pokemon.removeVolatile('exhausted');
			}
		},
	},
	

	mustrecharge: {
		name: 'mustrecharge',
		id: 'mustrecharge',
		num: 0,
		duration: 2,
		onBeforeMovePriority: 11,
		onBeforeMove(pokemon) {
			this.add('cant', pokemon, 'recharge');
			pokemon.removeVolatile('mustrecharge');
			pokemon.removeVolatile('truant');
			return null;
		},
		onStart(pokemon) {
			this.add('-mustrecharge', pokemon);
		},
		onLockMove: 'recharge',
	},
	futuremove: {
		// this is a slot condition
		name: 'futuremove',
		id: 'futuremove',
		num: 0,
		duration: 3,
		onResidualOrder: 3,
		onEnd(target) {
			const data = this.effectData;
			// time's up; time to hit! :D
			const move = this.dex.getMove(data.move);
			if (target.fainted || target === data.source) {
				this.hint(`${move.name} did not hit because the target is ${(data.fainted ? 'fainted' : 'the user')}.`);
				return;
			}

			this.add('-end', target, 'move: ' + move.name);
			target.removeVolatile('Protect');
			target.removeVolatile('Endure');

			if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
				data.moveData.infiltrates = true;
			}
			if (data.source.hasAbility('normalize') && this.gen >= 6) {
				data.moveData.type = 'Normal';
			}
			if (data.source.hasAbility('adaptability') && this.gen >= 6) {
				data.moveData.stab = 2;
			}
			const hitMove = new this.dex.Data.Move(data.moveData);

			this.trySpreadMoveHit([target], data.source, /** @type {ActiveMove} */(/** @type {unknown} */(hitMove)));
		},
	},
	healreplacement: {
		// this is a slot condition
		name: 'healreplacement',
		id: 'healreplacement',
		num: 0,
		onStart(side, source, sourceEffect) {
			this.effectData.sourceEffect = sourceEffect;
			this.add('-activate', source, 'healreplacement');
		},
		onSwitchInPriority: 1,
		onSwitchIn(target) {
			if (!target.fainted) {
				target.heal(target.maxhp);
				this.add('-heal', target, target.getHealth, '[from] move: ' + this.effectData.sourceEffect, '[zeffect]');
				target.side.removeSlotCondition(target, 'healreplacement');
			}
		},
	},
	stall: {
		// Protect, Detect, Endure counter
		name: 'stall',
		id: 'stall',
		num: 0,
		duration: 2,
		counterMax: 729,
		onStart() {
			this.effectData.counter = 3;
		},
		onStallMove(pokemon) {
			// this.effectData.counter should never be undefined here.
			// However, just in case, use 1 if it is undefined.
			let counter = this.effectData.counter || 1;
			this.debug("Success chance: " + Math.round(100 / counter) + "%");
			let success = this.randomChance(1, counter);
			if (!success) delete pokemon.volatiles['stall'];
			return success;
		},
		onRestart() {
			// @ts-ignore
			if (this.effectData.counter < this.effect.counterMax) {
				this.effectData.counter *= 3;
			}
			this.effectData.duration = 2;
		},
	},
	gem: {
		name: 'gem',
		id: 'gem',
		num: 0,
		duration: 1,
		affectsFainted: true,
		onBasePower(basePower, user, target, move) {
			this.debug('Gem Boost');
			return this.chainModify([0x14CD, 0x1000]);
		},
	},

	// weather is implemented here since it's so important to the game

	raindance: {
		name: 'RainDance',
		id: 'raindance',
		num: 0,
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source && source.hasItem('damprock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('rain water boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Fire') {
				this.debug('rain fire suppress');
				return this.chainModify(0.5);
			}
		},
		onStart(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				if (this.gen <= 5) this.effectData.duration = 0;
				this.add('-weather', 'RainDance', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'RainDance');
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'RainDance', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	primordialsea: {
		name: 'PrimordialSea',
		id: 'primordialsea',
		num: 0,
		effectType: 'Weather',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Fire' && move.category !== 'Status') {
				this.debug('Primordial Sea fire suppress');
				this.add('-fail', attacker, move, '[from] Primordial Sea');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('Rain water boost');
				return this.chainModify(1.5);
			}
		},
		onStart(battle, source, effect) {
			this.add('-weather', 'PrimordialSea', '[from] ability: ' + effect, '[of] ' + source);
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'PrimordialSea', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	sunnyday: {
		name: 'SunnyDay',
		id: 'sunnyday',
		num: 0,
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source && source.hasItem('heatrock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Water') {
				this.debug('Sunny Day water suppress');
				return this.chainModify(0.5);
			}
		},
		onStart(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				if (this.gen <= 5) this.effectData.duration = 0;
				this.add('-weather', 'SunnyDay', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'SunnyDay');
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'frz') return false;
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'SunnyDay', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	desolateland: {
		name: 'DesolateLand',
		id: 'desolateland',
		num: 0,
		effectType: 'Weather',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Water' && move.category !== 'Status') {
				this.debug('Desolate Land water suppress');
				this.add('-fail', attacker, move, '[from] Desolate Land');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
		},
		onStart(battle, source, effect) {
			this.add('-weather', 'DesolateLand', '[from] ability: ' + effect, '[of] ' + source);
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'frz') return false;
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'DesolateLand', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	sandstorm: {
		name: 'Sandstorm',
		id: 'sandstorm',
		num: 0,
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source && source.hasItem('smoothrock')) {
				return 8;
			}
			return 5;
		},
		// This should be applied directly to the stat before any of the other modifiers are chained
		// So we give it increased priority.
		onModifySpDPriority: 10,
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType('Rock') && this.field.isWeather('sandstorm')) {
				return this.modify(spd, 1.5);
			}
		},
		onStart(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				if (this.gen <= 5) this.effectData.duration = 0;
				this.add('-weather', 'Sandstorm', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Sandstorm');
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'Sandstorm', '[upkeep]');
			if (this.field.isWeather('sandstorm')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	hail: {
		name: 'Hail',
		id: 'hail',
		num: 0,
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source && source.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onStart(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				if (this.gen <= 5) this.effectData.duration = 0;
				this.add('-weather', 'Hail', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Hail');
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'Hail', '[upkeep]');
			if (this.field.isWeather('hail')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	deltastream: {
		name: 'DeltaStream',
		id: 'deltastream',
		num: 0,
		effectType: 'Weather',
		duration: 0,
		onEffectiveness(typeMod, target, type, move) {
			if (move && move.effectType === 'Move' && move.category !== 'Status' && type === 'Flying' && typeMod > 0) {
				this.add('-activate', '', 'deltastream');
				return 0;
			}
		},
		onStart(battle, source, effect) {
			this.add('-weather', 'DeltaStream', '[from] ability: ' + effect, '[of] ' + source);
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'DeltaStream', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},

	dynamax: {
		name: 'Dynamax',
		id: 'dynamax',
		num: 0,
		noCopy: true,
		duration: 3,
		onStart(pokemon) {
			pokemon.removeVolatile('substitute');
			if (pokemon.illusion) this.singleEvent('End', this.dex.getAbility('Illusion'), pokemon.abilityData, pokemon);
			this.add('-start', pokemon, 'Dynamax');
			if (pokemon.canGigantamax) this.add('-formechange', pokemon, pokemon.canGigantamax);
			if (pokemon.species === 'Shedinja') return;

			// Changes based on dynamax level, 2 is max (at LVL 10)
			const ratio = 2;

			pokemon.maxhp = Math.floor(pokemon.maxhp * ratio);
			pokemon.hp = Math.floor(pokemon.hp * ratio);
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onBeforeSwitchOut(pokemon) {
			pokemon.removeVolatile('dynamax');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.id === 'behemothbash' || move.id === 'behemothblade' || move.id === 'dynamaxcannon') {
				return this.chainModify(2);
			}
		},
		onDragOutPriority: 2,
		onDragOut(pokemon) {
			this.add('-block', pokemon, 'Dynamax');
			return null;
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dynamax');
			if (pokemon.canGigantamax) this.add('-formechange', pokemon, pokemon.template.species);
			if (pokemon.species === 'Shedinja') return;
			pokemon.hp = pokemon.getUndynamaxedHP();
			pokemon.maxhp = pokemon.baseMaxhp;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
	},

	// Arceus and Silvally's actual typing is implemented here.
	// Their true typing for all their formes is Normal, and it's only
	// Multitype and RKS System, respectively, that changes their type,
	// but their formes are specified to be their corresponding type
	// in the Pokedex, so that needs to be overridden.
	// This is mainly relevant for Hackmons Cup and Balanced Hackmons.
	arceus: {
		name: 'Arceus',
		id: 'arceus',
		num: 493,
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'multitype' && this.gen >= 8) return types;
			/** @type {string | undefined} */
			let type = 'Normal';
			if (pokemon.ability === 'multitype') {
				type = pokemon.getItem().onPlate;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
	silvally: {
		name: 'Silvally',
		id: 'silvally',
		num: 773,
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'rkssystem' && this.gen >= 8) return types;
			/** @type {string | undefined} */
			let type = 'Normal';
			if (pokemon.ability === 'rkssystem') {
				type = pokemon.getItem().onMemory;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
};

exports.BattleStatuses = BattleStatuses;
