import {Card} from "@/presentation/components/ui/card.tsx";
import {MoveUpRight} from "lucide-react";

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
        <div
            className="grid group/list grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-[21px] md:gap-[13px] lg:gap-[21px]">
            {games.map((game, index) => (
                <div key={index} className="relative group/item">
                    <a href={`/games/${game.slug}`}>
                        <img src={game.image} alt={`Image for the game${game.name}`}
                             className="group-has-[:hover]/list:opacity-50 transition-opacity duration-300 ease-in-out"/>
                        <Card
                            className="absolute -top-[13px] -left-[13px] -right-[13px] p-[13px] hidden group-hover/item:block z-40 shadow-2xl">
                            <img src={game.image} alt={`Image for the game${game.name}`}/>
                            <div className="flex gap-[5px] mt-[13px] items-center">
                                {game.name}
                                <MoveUpRight className="size-[13px]"/>
                            </div>
                        </Card>
                    </a>
                </div>
            ))}
        </div>
    );
}
