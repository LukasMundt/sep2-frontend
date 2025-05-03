// import RootLayout from "@/presentation/pages/RootLayout.tsx";

export default function Home() {
    const games = [
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
        {slug: "minecraft", name: "Minecraft", image: "/games/minecraft.avif"},
    ]
    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-[21px] md:gap-[13px] lg:gap-[21px]">
            {games.map((game,index) => (
                <a key={index} href={`/games/${game.slug}`}>
                    <img src={game.image} alt={`Image for the game${game.name}`}/>
                </a>
            ))}
        </div>
    );
}
