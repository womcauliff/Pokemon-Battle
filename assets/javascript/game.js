$(document).ready(function(){

	var bulbasaur = {
		name: "Bulbasaur",
		img: "001Bulbasaur.png",
		hp: 45,
		attack: 49
	};

	var charmander = {
		name: "Charmander",
		img: "004Charmander.png",
		hp: 39,
		attack: 52
	};

	var squirtle = {
		name: "Squirtle",
		img: "007Squirtle.png",
		hp: 44,
		attack: 48
	};

	var pikachu = {
		name: "Pikachu",
		img: "025Pikachu.png",
		hp: 35,
		attack: 55
	}

	var allPokemon = [];
	allPokemon[0] = bulbasaur;
	allPokemon[1] = charmander;
	allPokemon[2] = squirtle;
	allPokemon[3] = pikachu;
	var starter;

	// Add all pokemon to holding station
	for (var i = 0; i < allPokemon.length; i++) {
		console.log(allPokemon[i].name);
		
		$pokemonImg = $("<img>")
			.attr("src", "assets/images/" + allPokemon[i].img)
			.attr("class", "img-responsive");

		$pokemonDiv = $("<div></div>")
			.addClass("pokemon")
			.data("index", i)
			.append($pokemonImg);

		$wrapper = $("<div></div>")
			.addClass("col-md-3")
			.append($pokemonDiv);

		$("#holdingStation").append($wrapper);
	}
	


	$(".pokemon").on("click", function() {
		$indexVal = $(this).data("index");
		console.log(allPokemon[$indexVal].name + " selected");
		starter = allPokemon[$indexVal];
		$(this).addClass("starter");
	})

});