"use client"

import { SearchProps } from "@/types/Search"

function Search({ placeholder, value, onTextChange }: SearchProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={e => onTextChange(e.target.value)}
      value={value}
      className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-96 my-4 "
    />
  )
}

export default Search
