const pokemons = [
  {
    name: 'turtwig',
    data: {}
  },
  {
    name: 'grotle',
    data: {}
  },
  {
    name: 'torterra',
    data: {}
  },
  {
    name: 'chimchar',
    data: {}
  },
  {
    name: 'monferno',
    data: {}
  },
  {
    name: 'infernape',
    data: {}
  },
  {
    name: 'piplup',
    data: {}
  },
  {
    name: 'prinplup',
    data: {}
  },
  {
    name: 'empoleon',
    data: {}
  },
  {
    name: 'gengar',
    data: {}
  },
  {
    name: 'emolga',
    data: {}
  },
  {
    name: 'sylveon',
    data: {}
  }
];

async function getPokemonData(pokemonName) {
  const apiURL = 'https://pokeapi.co/api/v2/pokemon';
  const apiRes = await fetch(`${apiURL}/${pokemonName}`);
  const pokemonJSON = await apiRes.json();

  const pokemon = {
    id: pokemonJSON.id,
    types: [],
    stats: [],
    abilities: [],
    sprite: pokemonJSON.sprites.other.home.front_default,
    icon: pokemonJSON.sprites.versions['generation-vii'].icons.front_default
  };

  pokemonJSON.stats.forEach(e => {
    const baseStat = {
      name: e.stat.name,
      value: e.base_stat
    };
    pokemon.stats.push(baseStat);
  });

  pokemonJSON.types.forEach(e => {
    const type = e.type.name;
    pokemon.types.push(type);
  });

  pokemonJSON.abilities.forEach(e => {
    const ability = e.ability.name.replace('-', ' ');
    pokemon.abilities.push(ability);
  });

  pokemons.find(e => e.name === pokemonName).data = pokemon;

  return pokemon;
}

function listCreate() {
  const pokemonList = document.getElementById('pokemonList');
  const ul = document.createElement('ul');

  pokemons.forEach(async pkmn => {
    const pokemon = await getPokemonData(pkmn.name);
    const li = document.createElement('li');
    const img = document.createElement('img');
    const span = document.createElement('span');

    span.textContent = pkmn.name;
    img.src = pokemon.icon;
    li.className = `pokemon ${pkmn.data.types[0]}`;
    li.onclick = () => selectPokemon(pkmn.name); // quando clicar na li que é isso aqui aí chama a selectPokemon() né?isso, passando o name como argumento
    // MANEIRA ANTIGA SEM CALLBACK
    // li.onclick = function() {
    //   return selectPokemon(pkmn.name)
    // }

    li.append(img);
    li.append(span);
    ul.append(li);
  });

  console.log({ pokemons });

  pokemonList.append(ul);
}

function selectPokemon(pokemonName) {
  const pokemon = pokemons.find(e => e.name === pokemonName);

  const divPokemonName = document.getElementById('pokemon-name');
  divPokemonName.textContent = pokemon.name;

  const divPokemonId = document.getElementById('pokemon-id');
  divPokemonId.textContent = `#${pokemon.data.id}`;

  const divPokemonTypes = document.getElementById('pokemon-types');
  divPokemonTypes.innerHTML = '';

  pokemon.data.types.forEach(type => {
    const span = document.createElement('span');
    span.className = 'pokemonType';
    span.textContent = type;
    divPokemonTypes.append(span);
  });

  const imgPkmn = document.getElementById('pokemonImage');
  imgPkmn.src = pokemon.data.sprite;

  const colorType = document.getElementById('type-change');
  colorType.className = `topCard ${pokemon.data.types[0]}`;

  const hp = document.getElementById('hp');
  hp.textContent = `HP: ${pokemon.data.stats.find(e => e.name === 'hp').value}`;

  const atk = document.getElementById('attack');
  atk.textContent = `Attack: ${
    pokemon.data.stats.find(e => e.name === 'attack').value
  }`;

  const defense = document.getElementById('defense');
  defense.textContent = `Defense: ${
    pokemon.data.stats.find(e => e.name === 'defense').value
  }`;

  const spAtk = document.getElementById('spAtk');
  spAtk.textContent = `Sp. Atk: ${
    pokemon.data.stats.find(e => e.name === 'special-attack').value
  }`;

  const spDef = document.getElementById('spDef');
  spDef.textContent = `Sp. Def: ${
    pokemon.data.stats.find(e => e.name === 'special-defense').value
  }`;

  const speed = document.getElementById('speed');
  speed.textContent = `Speed: ${
    pokemon.data.stats.find(e => e.name === 'speed').value
  }`;

  const total = document.getElementById('total');
  let totalValue = 0;

  pokemon.data.stats.forEach(stat => (totalValue += stat.value));

  total.textContent = `Total: ${totalValue}`;

  const ulAbilities = document.getElementById('abilities');
  ulAbilities.innerHTML = '';

  pokemon.data.abilities.forEach(ability => {
    const li = document.createElement('li');
    li.textContent = ability;
    ulAbilities.append(li);
  });

  // BURRO
  // DENTRO DE POKEMON EXISTE ID POR ACASO?USA A CABEÇA
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  localStorage.setItem('theme', newTheme);

  document.documentElement.setAttribute('data-theme', newTheme);
}

function getTheme() {
  const currentTheme = localStorage.getItem('theme');
  document.documentElement.setAttribute('data-theme', currentTheme);
}

function load() {
  getTheme();
  listCreate();
}
