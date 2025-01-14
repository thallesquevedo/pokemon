"use client"
import PokemonCard from "@/components/pokemon-card/pokemon-card"
import pokemonService from "@/services/pokemon"
import { useEffect, useState } from "react"

export default function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonProps[]>([])

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await pokemonService.get("/cards")
        setPokemonList(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPokemonList()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 group">
        {pokemonList.map(pokemon => (
          <div key={pokemon.id} className="">
            <PokemonCard {...pokemon} />
          </div>
        ))}
      </main>
    </div>
  )
}
