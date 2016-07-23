/**
 * RPG global variables
 */
var allPokemon;
var starterID;
var starterSelected;
var challengerID;
var challengerSelected;

$(document).ready(function(){
	init();
	createPokemon();
	displayStarterPokemon();
});


/**
 * Pokemon Constructor
 * @param {string} name the pokemon's name
 * @param {string} img the relative path to the pokemon's img
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
		move: move,
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
function Move(name, basepwr, type) {
	var move = {
		name: name,
		basepwr: basepwr,
		type: type
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
 * @param {number} basehp the pokemon's base hit point stat
 * @param {number} baseattack the pokemon's base attack stat
 * @param {number} basedefense the pokemon's base defense stat
 * @param {number} basespattack the pokemon's base special attack stat
 * @param {number} basespdefense the pokemon's base special defense stat
 * @param {number} level the pokemon's power level
 */

	var razorleaf = new Move("Vine Whip",  45, "grass");
	var bulbasaur = new Pokemon(
		"Bulbasaur",
		"assets/images/001Bulbasaur.png",
		45,
		49,
		49,
		65,
		65,
		15,
		razorleaf
	);

	var ember = new Move("Ember",  40, "fire");
	var charmander = new Pokemon(
		"Charmander",
		"assets/images/004Charmander.png",
		39,
		52,
		43,
		60,
		50,
		15,
		ember
	);
	var bubble = new Move("Bubble",  40, "water");
	var squirtle = new Pokemon(
		"Squirtle",
		"assets/images/007Squirtle.png",
		44,
		48,
		65,
		50,
		64,
		15,
		bubble
	);
	var thundershock = new Move("ThunderShock", 40, "electric");
	var pikachu = new Pokemon(
		"Pikachu",
		"assets/images/025Pikachu.png",
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
console.log(allPokemon[starterID].name + " selected");
					$(this).parent().fadeOut("slow", function() {
						$("#player").append(allPokemon[starterID].buildHTML());
						addButton();
						$("#battlefield").parent().switchClass("col-md-12", "col-md-9", 100);
						$("#holdingStation .pokemon").parent().fadeOut( "slow", 
							displayChallengers()
						);
					});
				}
			});
		$wrapper = 
			$("<div></div>")
			.addClass("col-md-3")
			.append($pokemon);
		$("#holdingStation div.panel-body").append($wrapper);
	}
}
function addButton() {
	allPokemon[starterID].currentHP = allPokemon[starterID].calculateHP();
	$("#actions").append("<button class='btn'>" + allPokemon[starterID].move.name + "</button>")
		.on("click", 
			function() {
				if (starterSelected !== true || challengerSelected !== true ){
					console.log("no one to attack");
					return;
				}
				if(allPokemon[starterID].currentHP <= 0) {
					return;
				}

				console.log("attack");
				console.log(allPokemon[starterID]);
				console.log(allPokemon[challengerID]);
				console.log(allPokemon[challengerID].currentHP);

				console.log(allPokemon[starterID].name + " used " + allPokemon[starterID].move.name);
				console.log("p2HP: " + allPokemon[challengerID].currentHP);

				//TODO: use the Pokemon Object damage functions
				allPokemon[challengerID].currentHP = allPokemon[challengerID].currentHP - 12;

				console.log("p2HP: " + allPokemon[challengerID].currentHP);
				$("#challenger .hp").text(allPokemon[challengerID].currentHP);

				if (allPokemon[challengerID].currentHP > 0) {
					console.log(allPokemon[challengerID].name + " used " + allPokemon[challengerID].move.name);
					//TODO: use the Pokemon Object damage functions
					allPokemon[starterID].currentHP = allPokemon[starterID].currentHP - 5;
					console.log("p1HP: " + allPokemon[starterID].currentHP);
					$("#player .hp").text(allPokemon[starterID].currentHP);
					if (allPokemon[starterID].currentHP <= 0) {
						//game over, reset()
						console.log(allPokemon[starterID].name + " fainted.");
						console.log("game over, you lost");
					}
				}
				else {
					console.log(allPokemon[challengerID].name + " fainted.");
					allPokemon[challengerID].defeated = true;
					challengerSelected = false;
					challengerID = -1;
					allPokemon[starterID].HP = allPokemon[starterID].calculateHP();
					$("#challenger").fadeOut("slow", function () {
						$(this).empty();
					});
					$("#actions .button").unbind("click");

					displayChallengers();
				}
			}
		);
}

function displayChallengers() {
console.log("displayChallengers()");
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
console.log(allPokemon[challengerID].name + " selected");
								$(this).parent().fadeOut( "slow", function() {
								    $("#challenger").append(allPokemon[challengerID].buildHTML()).fadeIn("slow");
								    $(this).remove();
								    battle();
								});
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
			console.log("you won the game!");
			//TODO: level up the starter Pokemon
		}
	});

}

function battle() {
console.log("battle");
	if (starterSelected !== true || challengerSelected !== true ){
		console.log("exiting");
		return;
	}
	console.log(allPokemon[starterID]);
	console.log(allPokemon[challengerID]);
	//allPokemon[starterID].currentHP = allPokemon[starterID].calculateHP();
	console.log(allPokemon[challengerID].name + " currentHP:" + allPokemon[challengerID].calculateHP());
	allPokemon[challengerID].currentHP = allPokemon[challengerID].calculateHP();
	console.log(allPokemon[challengerID].currentHP);
	
	$("#player table").remove();
	$("#player").append(allPokemon[starterID].buildStatsHTML());
	$("#player table .hp").text(allPokemon[starterID].currentHP);
	$("#challenger").append(allPokemon[challengerID].buildStatsHTML());
}
