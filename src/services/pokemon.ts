import axios from "axios";

const pokemonService = axios.create({
  baseURL: "https://api.pokemontcg.io/v2",
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": process.env.POKEMON_API_KEY,
  },
})

export default pokemonService;