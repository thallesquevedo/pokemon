import Image from "next/image"

function PokemonCard({ id, images, name }: PokemonProps) {
  return (
    <div className="text-center flex flex-col gap-2 items-center">
      <img
        style={{ maxWidth: "100%", height: "auto" }}
        src={images.small}
        alt={name}
      />
      <p className="font-bold">{name}</p>
    </div>
  )
}

export default PokemonCard
