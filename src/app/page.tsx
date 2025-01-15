"use client"
import Pagination from "@/components/pagination/pagination"
import PokemonCard from "@/components/pokemon-card/pokemon-card"
import Search from "@/components/search/search"
import useDebounce from "@/hooks/use-debounce"
import pokemonService from "@/services/pokemon"
import { PokemonProps } from "@/types/Pokemon"
import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"

export default function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonProps[]>([])
  const [filterPokemon, setFilterPokemon] = useState("")
  const [loading, setLoading] = useState(true)

  const debounceSearch = useDebounce(filterPokemon, 2000)


  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const pageSize = 20

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const fetchPokemonList = async (page: number) => {
    try {
      setLoading(true)
      const response = await pokemonService.get("/cards", {
        params: {
          q: debounceSearch ? `name:${debounceSearch}` : "",
          pageSize,
          page,
        },
      })
      const { data: pokemons, totalCount } = response.data
      setPokemonList(pokemons)
      setTotalCount(totalCount)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setCurrentPage(1)
    fetchPokemonList(currentPage)
  }, [debounceSearch])

  useEffect(() => {
    fetchPokemonList(currentPage)
  }, [currentPage])

  return (
    <div className="flex flex-col items-center mx-4 mb-4">
      <Search
        placeholder="Search Pokemon"
        value={filterPokemon}
        onTextChange={setFilterPokemon}
      />

      <ClipLoader
        color="#000"
        loading={loading}
      />
      {!loading && (
        <>
          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
            {pokemonList.map(pokemon => (
              <div key={pokemon.id}>
                <PokemonCard {...pokemon} />
              </div>
            ))}
          </main>
          <div>
            <Pagination
              items={totalCount}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  )
}
