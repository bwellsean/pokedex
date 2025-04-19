"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var container = document.getElementById("app");
var pokemons = 151;
var fetchData = function () {
    // Create a single card container first
    container.innerHTML = "<div class=\"card-container\"></div>";
    for (var i = 1; i <= pokemons; i++) {
        getPokemon(i);
    }
};
var allPokemon = [];
var fetchedCount = 0;
var getPokemon = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var data, pokemon, pokemonType, transformedPokemon;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://pokeapi.co/api/v2/pokemon/".concat(id))];
            case 1:
                data = _a.sent();
                return [4 /*yield*/, data.json()];
            case 2:
                pokemon = _a.sent();
                pokemonType = pokemon.types
                    .map(function (poke) { return poke.type.name; })
                    .sort(function (a, b) { return a - b; })
                    .join(", ");
                transformedPokemon = {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: "".concat(pokemon.sprites.front_default),
                    type: pokemonType,
                };
                showPokemon(transformedPokemon);
                allPokemon.push(transformedPokemon);
                fetchedCount++;
                if (fetchedCount === pokemons) {
                    renderAllPokemon();
                }
                return [2 /*return*/];
        }
    });
}); };
var renderAllPokemon = function () {
    allPokemon.sort(function (a, b) { return a.id - b.id; });
    var cardContainer = container.querySelector(".card-container");
    cardContainer.innerHTML = "";
    var fragment = document.createDocumentFragment();
    allPokemon.forEach(function (pokemon) {
        var card = createPokemonCard(pokemon);
        fragment.appendChild(card);
    });
    cardContainer.appendChild(fragment);
};
//making an object to map colors to types, then I can do a lookup on the colors
var typeColor = {
    grass: "rgb(0, 255, 0)",
    fire: "rgb(255, 0, 0)",
    water: "rgb(0, 150, 255)",
    bug: "rgb(100, 255, 20)",
    normal: "rgb(195, 195, 195)",
    poison: "rgb(255, 0, 255)",
    electric: "rgb(255, 238, 0)",
    fairy: "rgb(233, 147, 250)",
    ground: "rgb(153, 69, 0)",
    fighting: "rgb(195, 133, 126)",
    psychic: "rgb(102, 0, 102)",
    rock: "rgb(100,100,100)",
    ghost: "rgb(0,0,0)",
    ice: "rgb(38, 201, 255)",
    flying: "rgb(146, 137, 184)",
    dragon: "rgb(18, 5, 73)",
    mew: "rgb(139, 163, 0)",
    mewTwo: "rgb(139, 163, 0)",
};
var createGradientForTpyes = function (types) {
    if (types.length === 1) {
        var color = typeColor[types[0]] || "gray";
        return color;
    }
    else if (types.length >= 2) {
        var color1 = typeColor[types[0]] || "gray";
        var color2 = typeColor[types[1]] || "black";
        return "linear-gradient(to right, ".concat(color1, ", ").concat(color2, ")");
    }
    else {
        var color = "gray";
        return color;
    }
};
var createPokemonCard = function (pokemon) {
    var card = document.createElement("div");
    var types = pokemon.type.split(", ");
    var colors = types.map(function (type) { return typeColor[type] || "gray"; });
    var gradientBackground = createGradientForTpyes(types);
    card.style.background = gradientBackground;
    card.className = "card";
    card.innerHTML = "\n    <div class=\"card-inner\">\n      <span class=\"card-id\">#".concat(pokemon.id, "</span>\n      <img class=\"card-image\" src=").concat(pokemon.image, " alt=").concat(pokemon.name, " />\n      <h2 class=\"card-name\">").concat(pokemon.name, "</h2>\n      <span class=\"card-details\">").concat(pokemon.type, "</span>\n    </div>\n  ");
    // if (pokemon.type == "grass" || "") {
    //   card.style.background = "rgb(0, 255, 0)";
    // } else if (pokemon.type == "fire" || "") {
    //   card.style.background = "rgb(255, 0, 0)";
    // }
    return card;
};
var showPokemon = function (pokemon) {
    var output = "\n    <div class=\"card\">\n      <div class=\"card-inner\">\n        <span class=\"card-id\">#".concat(pokemon.id, "</span>\n        <img class=\"card-image\" src=").concat(pokemon.image, " alt=").concat(pokemon.name, " />\n        <h2 class=\"card-name\">").concat(pokemon.name, "</h2>\n        <span class=\"card-details\">").concat(pokemon.type, "</span>\n      </div>\n    </div>\n  ");
    // Append each card to the existing card container
    var cardContainer = container.querySelector(".card-container");
    cardContainer.innerHTML += output;
};
fetchData();
var button = document.getElementById("search-button");
var input = document.getElementById("search");
button.addEventListener("click", function (e) {
    var searchValue = input.value.toLowerCase();
    var cards = document.querySelectorAll(".card");
    cards.forEach(function (card) {
        var _a;
        var cardText = ((_a = card.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "";
        var isMatch = cardText.includes(searchValue);
        card.style.display = isMatch ? "" : "none";
    });
});
