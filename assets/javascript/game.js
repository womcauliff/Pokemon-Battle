/**
 * RPG global variables
 */
var allPokemon;
var starterID;
var starterSelected;
var challengerID;
var challengerSelected;

$(document).ready(function(){
	$("img.preloaded").remove();
	$("audio")[0].play();
	$("audio")[0].loop = true;
	p1();
	init();
	createPokemon();
	displayStarterPokemon();
});

/**
 * Intro Animations
 */
function p1() {
	$("#theater img")
		.attr("src", "assets/images/intro1.gif");
	setTimeout(p2, 2000);
}
function p2() {
	$("#theater img")
		.attr("src", "assets/images/intro2.gif");
	setTimeout(p3, 5000);
}
function p3() {
	$("#theater img")
		.attr("src", "assets/images/intro3.gif");
	setTimeout(p4, 2000);
}
function p4() {
	$("#theater img")
		.attr("src", "assets/images/intro4.gif");
	setTimeout(function() {
		$("#theater").slideUp( "slow", function() {
    		// Animation complete.
    		$("#theater").remove();
    		$(".container").css('visibility', 'visible');
  		});
	}, 2700);

}

/**
 * Pokemon Constructor
 * @param {string} name the pokemon's name
 * @param {string} img the relative path to the pokemon's img
 * @param {string[]} type array containing the pokemon's type(s)
 * @param {string[]} weaknesses array containing the pokemon's weakness types
 * @param {string[]} resistances array containing the pokemon's resistance types
 * @param {number} basehp the pokemon's base hit point stat
 * @param {number} baseattack the pokemon's base attack stat
 * @param {number} basedefense the pokemon's base defense stat
 * @param {number} basespattack the pokemon's base special attack stat
 * @param {number} basespdefense the pokemon's base special defense stat
 * @param {number} level the pokemon's power level
 * @param {Object} move the pokemon's attacking move
 */
function Pokemon(name, 
				img,
				type,
				weaknesses,
				resistances, 
				basehp, 
				baseattack, 
				basedefense,
				basespattack,
				basespdefense,
				level, 
				move) {

	var pokemon = {
		id: uniqueID(),
		name: name,
		img: img,
		type: type,
		weaknesses: weaknesses,
		resistances: resistances,
		basehp: basehp,
		baseattack: baseattack,
		basedefense: basedefense,
		basespattack: basespattack,
		basespdefense: basespdefense,
		level: level,
		currentHP: 0,
		defeated: false,
		buildHTML: function() {
			$pokemonImg = $("<img>")
				.attr("src", this.img)
				.attr("class", "img-responsive");

			$pokemonDiv = $("<div></div>")
				.addClass("pokemon")
				.data("index", this.id)
				.append($pokemonImg);

			return $pokemonDiv;
		},
		buildStatsHTML: function() {
			return $("<table></table>")
				.addClass("table")
				.append($("<thead><tr><th>Level</th><th>HP</th></tr></thead>"))
				.append($("<tbody><tr><td class='level'>" 
					+ this.level
					+ "</td><td class='hp'>"
					+ this.calculateHP()
					+ "</td></tr></tbody>"));
		},
		calculateHP: function() {
			return Math.floor((((basehp) * 2) * level) / 100) + level + 10;
		},
		move: move
	};

	return pokemon;
}
/**
 * Helper function for Pokemon Object: Generates unique id
 */
var uniqueID = (function() {
   var id = 0; // This is the private persistent value
   // The outer function returns a nested function that has access
   // to the persistent value.  It is this nested function we're storing
   // in the variable uniqueID above.
   return function() { return id++; };  // Return and increment
})();

/**
 * Constructor for Move Object
 */
function Move(name, basepwr, type, category) {
	var move = {
		name: name,
		basepwr: basepwr,
		type: type,
		category: category
	}

	return move;
}

/**
 * initializes game
 */
function init() {
	console.log("init()");
	allPokemon = [];
	starterID = -1;
	challengerID = -1;
	starterSelected = false;
	challengerSelected = false;
}
function createPokemon() {
	console.log("createPokemon()");
/*
 * @param {string[]} type array containing the pokemon's type(s)
 * @param {string[]} weaknesses array containing the pokemon's weakness types
 * @param {string[]} resistances array containing the pokemon's resistance types
 * @param {number} basehp the pokemon's base hit point stat
 * @param {number} baseattack the pokemon's base attack stat
 * @param {number} basedefense the pokemon's base defense stat
 * @param {number} basespattack the pokemon's base special attack stat
 * @param {number} basespdefense the pokemon's base special defense stat
 * @param {number} level the pokemon's power level
 */

	var vinewhip = new Move("Vine Whip",  45, "grass", "physical");
	var bulbasaur = new Pokemon(
		"Bulbasaur",
		"assets/images/001Bulbasaur.png",
		["grass", "poison"],
		["flying", "fire", "psychic", "ice"],
		["fighting", "water", "grass", "electric", "fairy"],
		45,
		49,
		49,
		65,
		65,
		15,
		vinewhip
	);

	var ember = new Move("Ember",  40, "fire", "special");
	var charmander = new Pokemon(
		"Charmander",
		"assets/images/004Charmander.png",
		["fire"],
		["ground", "rock", "water"],
		["bug", "steel", "fire", "grass", "ice", "fairy"],
		39,
		52,
		43,
		60,
		50,
		15,
		ember
	);
	var bubble = new Move("Bubble",  40, "water", "special");
	var squirtle = new Pokemon(
		"Squirtle",
		"assets/images/007Squirtle.png",
		["water"],
		["grass", "electric"],
		["steel", "fire", "water", "ice"],
		44,
		48,
		65,
		50,
		64,
		15,
		bubble
	);
	var thundershock = new Move("ThunderShock", 40, "electric", "special");
	var pikachu = new Pokemon(
		"Pikachu",
		"assets/images/025Pikachu.png",
		["electric"],
		["ground"],
		["flying", "steel", "electric"],
		35,
		55,
		40,
		50,
		50,
		15,
		thundershock
	);
	allPokemon[bulbasaur.id] = bulbasaur;
	allPokemon[charmander.id] = charmander;
	allPokemon[squirtle.id] = squirtle;
	allPokemon[pikachu.id] = pikachu;
}
function displayStarterPokemon() {
	console.log("displayStarterPokemon()");
	// Add all pokemon to holding station
	for (var i = 0; i < allPokemon.length; i++) {
		$pokemon = 
			allPokemon[i].buildHTML()
			.addClass("starter")
			// Add Click Listeners for starter selection
			.on("click", function() {
				if (!starterSelected) {
					starterSelected = true;
					starterID = $(this).data("index");
					$(this).parent().fadeOut("slow", function() {
						$("#player").append(allPokemon[starterID].buildHTML());
						addButton();
						$("#battlefield").parent().switchClass("col-md-12", "col-md-9", 100);
						$("#holdingStation .pokemon").parent()
							.fadeOut( 
								"slow", 
								displayChallengers()
							);
						addDescription($("<p>You chose " + allPokemon[starterID].name + ".</p>"));
						addDescription($("<p>Click on a challenger to battle.</p>"));
					});
				}
			});
		$wrapper = 
			$("<div></div>")
			.addClass("col-md-3")
			.append($pokemon);
		$wrapper.append("<h4>" + allPokemon[i].name + "</h4>");
		$("#holdingStation div.panel-body").append($wrapper);
	}
}
function addButton() {
	allPokemon[starterID].currentHP = allPokemon[starterID].calculateHP();
	$("#actions").append("<button class='btn'>" + allPokemon[starterID].move.name + "</button>")
		.on("click", 
			function() {
				if (starterSelected !== true || challengerSelected !== true ){
					addDescription($("<p>There's no one to attack.</p>"), true);
					return;
				}
				if(allPokemon[starterID].currentHP <= 0) {
					return;
				}

				addDescription(
					$("<p>"
						+ allPokemon[starterID].name 
						+ " used " + allPokemon[starterID].move.name
						+ ".</p>"),
					true);

				var userDamage = damageCalculator(starterID, challengerID);
				console.log("userDamage " + userDamage);
				allPokemon[challengerID].currentHP = allPokemon[challengerID].currentHP - Math.floor(userDamage);
								

				if (allPokemon[challengerID].currentHP > 0) {
					$("#challenger .hp").text(allPokemon[challengerID].currentHP);
					addDescription($("<p>" 
						+ allPokemon[challengerID].name 
						+ " used " + allPokemon[challengerID].move.name
						+ ".</p>"));
					var challengerDamage = damageCalculator(challengerID, starterID);
					addDescription
					console.log("challengerDamage " + challengerDamage);
					allPokemon[starterID].currentHP = allPokemon[starterID].currentHP - Math.floor(challengerDamage);
					
					if(allPokemon[starterID].currentHP < 0) {
						allPokemon[starterID].currentHP = 0;
					}
					
					$("#player .hp").text(allPokemon[starterID].currentHP);
					if (allPokemon[starterID].currentHP === 0) {
						//game over, reset()
						addDescription($("<p>" + allPokemon[starterID].name + " fainted.</p>"
							+ "<p>You lost!</p>"));
						addDescription($("<p>Refresh to try again.</p>"));
					}
				}
				else {
					//remove challenger pokemon
					addDescription($("<p>" + allPokemon[challengerID].name + " fainted.</p>"));
					allPokemon[challengerID].defeated = true;
					challengerSelected = false;
					challengerID = -1;

					//level up the starter pokemon
					allPokemon[starterID].level = allPokemon[starterID].level + 15;
					$("#player table .level").text(allPokemon[starterID].level);
					addDescription($("<p>" 
						+ allPokemon[starterID].name 
						+ " reached level " + allPokemon[starterID].level
						+ "!</p>"));

					//allPokemon[starterID].HP = allPokemon[starterID].calculateHP();
					$("#challenger").fadeOut("slow", function () {
						$(this).empty();
					});
					$("#actions .button").unbind("click");

					displayChallengers();
				}
			}
		);
}

/**
 * damageCalculator:
 * This function has been adapted from the
 * actual damage equation featured in the Pokémon RPG.
 * (http://bulbapedia.bulbagarden.net/wiki/Damage#Damage_modification)
 * due to the fact that HP regeneration is not possible 
 * in this app, adjustments were made to the formula
 * to give the player an increased advantage.
 */
function damageCalculator(p1ID, p2ID){
	console.log("damageCalculator()");
	var level = allPokemon[p1ID].level;
	var attack = 0;
	var defense = 0;
	var base = allPokemon[p1ID].move.basepwr;


	//added to give player advantage
	if (p1ID == starterID) {
		level = level * 3.5;
	}

	// If move's category is physical, 
	/// use player's attack
	// and opponent's defense stats
	if (allPokemon[p1ID].move.category === "physical") {
		attack = allPokemon[p1ID].baseattack;
		defense = allPokemon[p2ID].basedefense;
	}
	// else if move's category is special, 
	// use player's special attack
	// and opponent's special defense stats
	else {
		attack = allPokemon[p1ID].basespattack;
		defense = allPokemon[p2ID].basespdefense;
	}

	// first half of damage calculation
	var dmg = (((2 * level + 10)/250) * (attack/defense) * base + 2);

	// Calculate damage modifier
	var modifier = 1;

	// determine if same-type attack-bonus
	var STAB = 1;
	var typeEffectiveness = 1;
	var criticalHit = 1;
	var other = 1;
	var random = 1;

	for (var i = 0; i < allPokemon[p1ID].type.length; i++) {
		if (allPokemon[p1ID].move.type === allPokemon[p1ID].type[i]) {
			STAB = 1.5;
			break;
		}
	}

	//check if move type matches opponent's resistances
	for (var i = 0; i < allPokemon[p2ID].resistances.length; i++) {
		if(allPokemon[p1ID].move.type === allPokemon[p2ID].resistances[i]) {
			typeEffectiveness = typeEffectiveness * .5;

			//added to give player advantage
			if (p1ID == starterID) {
				typeEffectiveness = typeEffectiveness * .90;
			}
			addDescription($("<p>It's not very effective..</p>"));
		}
	}

	//check if move type matches opponent's weaknesses
	for (var i = 0; i < allPokemon[p2ID].weaknesses.length; i++) {
		if(allPokemon[p1ID].move.type === allPokemon[p2ID].weaknesses[i]) {
			typeEffectiveness = typeEffectiveness * 2;
			//added to give player advantage
			if (p1ID == challengerID) {
				typeEffectiveness = typeEffectiveness * 1;
			}

			addDescription($("<p>It's super effective!</p>"));
		}
	};

	//ignoring critical hits for now
	criticalHit = 1;

	//ignoring ability to hold items
	other = 1;

	//calculating random decimal in the range of [0.85, 1]
	var max = 1.0;
	var min = 0.85;
	random = Math.random() * (max - min) + min;

	//calculating modifier, updating damage value
	modifier = STAB * typeEffectiveness * criticalHit * other * random;
	dmg = dmg * modifier;
	return dmg;
}

function displayChallengers() {
	console.log("displayChallengers()");
	$("audio").animate({volume: 0.0}, 500, function(){
		console.log("muted");
		$("audio")[0].pause();
	});
	
	$("#holdingStation .panel-body").empty();
	$("#holdingStation").switchClass("panel-primary", "panel-danger", 100);
	$("#holdingStation div.panel-heading").text("Challenger Pokémon (click to battle)");

	var gameWon = true;
	$("#holdingStation").parent().switchClass("col-md-12", "col-md-3", 1000, "easeInOutQuad", function(){
		for (var i = 0; i < allPokemon.length; i++) {
			if (i !== starterID) {

				var challenger;

				//Pokemon has already been defeated
				if(allPokemon[i].defeated === true) {
					challenger =
						allPokemon[i].buildHTML()
						.addClass("defeated");

				}
				//Pokemon can be challenged
				else {
					gameWon = false;
					challenger = 
						allPokemon[i].buildHTML()
						.addClass("challenger")
						// Add Click Listeners for challenger selection
						.on("click", function(){
							if (!challengerSelected) {
								challengerSelected = true;
								challengerID = $(this).data("index");
								$(this).parent().fadeOut( "slow", function() {
								    $("#challenger").append(allPokemon[challengerID].buildHTML()).fadeIn("slow");
								    $(this).remove();
								    setUpBattle();
								});
								addDescription($("<p>Click the button to attack.</p>"), true);
							}
						});
				}

				$wrapper = $("<div></div>")
					.addClass("col-md-12")
					.append(challenger);
				$("#holdingStation div.panel-body").append($wrapper.fadeIn("slow"));
			}
		}
		if (gameWon === true) {
			addDescription($("<p>You've become a Pokémon Master!</p>"));
			addDescription($("<p>Refresh to play again.</p>"));
		}
	});

}

function setUpBattle() {
console.log("setUpBattle()");
	if (starterSelected !== true || challengerSelected !== true ){
		console.log("exiting");
		return;
	}
	//allPokemon[starterID].currentHP = allPokemon[starterID].calculateHP(); //reset HP for new battle

	allPokemon[challengerID].currentHP = allPokemon[challengerID].calculateHP();
	
	$("#player table").remove();
	$("#player").append(allPokemon[starterID].buildStatsHTML());
	$("#player table .hp").text(allPokemon[starterID].currentHP);
	$("#challenger").append(allPokemon[challengerID].buildStatsHTML());
}

function addDescription(desc, empty) {
	if (empty === true) {
		$("#description").empty();
	}
	$("#description").append(desc);
}
