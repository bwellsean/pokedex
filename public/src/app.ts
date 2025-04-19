const container: HTMLElement | any = document.getElementById("app");
const pokemons: number = 151;

interface IPokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}
const fetchData = (): void => {
  // Create a single card container first
  container.innerHTML = `<div class="card-container"></div>`;

  for (let i = 1; i <= pokemons; i++) {
    getPokemon(i);
  }
};

const allPokemon: IPokemon[] = [];
let fetchedCount = 0;

const getPokemon = async (id: number): Promise<void> => {
  const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: any = await data.json();
  const pokemonType: string = pokemon.types
    .map((poke: any) => poke.type.name)
    .sort((a: number, b: number) => a - b)
    .join(", ");
  const transformedPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: `${pokemon.sprites.front_default}`,
    type: pokemonType,
  };

  showPokemon(transformedPokemon);
  allPokemon.push(transformedPokemon);
  fetchedCount++;

  if (fetchedCount === pokemons) {
    renderAllPokemon();
  }
};

const renderAllPokemon = (): void => {
  allPokemon.sort((a, b) => a.id - b.id);

  const cardContainer = container.querySelector(".card-container");
  cardContainer.innerHTML = "";

  const fragment = document.createDocumentFragment();

  allPokemon.forEach((pokemon) => {
    const card = createPokemonCard(pokemon);
    fragment.appendChild(card);
  });

  cardContainer.appendChild(fragment);
};

//making an object to map colors to types, then I can do a lookup on the colors
const typeColor: any = {
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

const createGradientForTpyes = (types: string[]): string => {
  if (types.length === 1) {
    const color = typeColor[types[0]] || "gray";
    return color;
  } else if (types.length >= 2) {
    const color1 = typeColor[types[0]] || "gray";
    const color2 = typeColor[types[1]] || "black";
    return `linear-gradient(to right, ${color1}, ${color2})`;
  } else {
    const color = "gray";
    return color;
  }
};

const createPokemonCard = (pokemon: IPokemon): HTMLElement => {
  const card = document.createElement("div");
  const types = pokemon.type.split(", ");
  const colors = types.map((type) => typeColor[type] || "gray");
  const gradientBackground = createGradientForTpyes(types);
  card.style.background = gradientBackground;

  card.className = "card";

  card.innerHTML = `
    <div class="card-inner">
      <span class="card-id">#${pokemon.id}</span>
      <img class="card-image" src=${pokemon.image} alt=${pokemon.name} />
      <h2 class="card-name">${pokemon.name}</h2>
      <span class="card-details">${pokemon.type}</span>
    </div>
  `;

  // if (pokemon.type == "grass" || "") {
  //   card.style.background = "rgb(0, 255, 0)";
  // } else if (pokemon.type == "fire" || "") {
  //   card.style.background = "rgb(255, 0, 0)";
  // }

  return card;
};

const showPokemon = (pokemon: IPokemon): void => {
  let output: string = `
    <div class="card">
      <div class="card-inner">
        <span class="card-id">#${pokemon.id}</span>
        <img class="card-image" src=${pokemon.image} alt=${pokemon.name} />
        <h2 class="card-name">${pokemon.name}</h2>
        <span class="card-details">${pokemon.type}</span>
      </div>
    </div>
  `;

  // Append each card to the existing card container
  const cardContainer = container.querySelector(".card-container");
  cardContainer.innerHTML += output;
};

fetchData();

const button = document.getElementById("search-button") as HTMLButtonElement;
const input = document.getElementById("search") as HTMLInputElement;

button.addEventListener("click", (e: Event) => {
  const searchValue: string = input.value.toLowerCase();
  const cards = document.querySelectorAll<HTMLElement>(".card");

  cards.forEach((card: HTMLElement) => {
    const cardText = card.textContent?.toLowerCase() || "";
    const isMatch = cardText.includes(searchValue);
    card.style.display = isMatch ? "" : "none";
  });
});
