/**
 * RPG global variables
 */
var allPokemon;
var starterID;
var starterSelected;

$(document).ready(function(){
	init();
});


/**
 * Pokemon Constructor
 */
function Pokemon(name, img, hp, attack) {

	var pokemon = {
		id: uniqueID(),
		name: name,
		img: img,
		hp: hp,
		attack: attack,
		buildHTML: function() {
			$pokemonImg = $("<img>")
				.attr("src", "assets/images/" + this.img)
				.attr("class", "img-responsive");

			$pokemonDiv = $("<div></div>")
				.addClass("pokemon")
				.data("index", this.id)
				.append($pokemonImg);

			return $pokemonDiv;
		},
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
 * initializes game
 */
function init() {
console.log("init()");
	allPokemon = [];
	starterSelected = false;
	createPokemon();
	displayStarterPokemon();
}
function createPokemon() {
console.log("createPokemon()");
	var bulbasaur = new Pokemon(
		"Bulbasaur",
		"001Bulbasaur.png",
		45,
		49);

	var charmander = new Pokemon(
		"Charmander",
		"004Charmander.png",
		39,
		52
	);
	var squirtle = new Pokemon(
		"Squirtle",
		"007Squirtle.png",
		44,
		48
	);
	var pikachu = new Pokemon(
		"Pikachu",
		"025Pikachu.png",
		35,
		55
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
		console.log(allPokemon[i].name);
		
		if (true) {

		}

		$pokemon = 
		allPokemon[i].buildHTML()
		.addClass("starter")
		.on("click", function() {
			//chose starter
			if (!starterSelected) {
				console.log($(this).data("index"));
				$indexVal = $(this).data("index");
				console.log(allPokemon[$indexVal].name + " selected");		
				starterID = $indexVal;
				starterSelected = true;
				$(this).parent().fadeOut( "slow", function() {
				    console.log("Animation complete.");
				    $(".pokemon").removeClass("starter");
				    $(this).remove();
				});
			}
			//chose challenger
			else {

			}
		});
		$wrapper = $("<div></div>")
				.addClass("col-md-3")
				.append($pokemon);
		$("#holdingStation div.panel-body").append($wrapper);
	}
}

