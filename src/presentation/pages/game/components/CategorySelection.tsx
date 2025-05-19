import {components} from "@/data-domain/schema";
import {useEffect, useState} from "react";
import {
    Select,
    SelectContent,
    SelectGroup, SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/presentation/components/ui/select.tsx";
import GetCategoriesFromGame from "@/business-rules/get-categories-from-game.ts";
import {Skeleton} from "@/presentation/components/ui/skeleton.tsx";

export default function CategorySelection({onSelection, gameSlug, category}: {
    onSelection: (category: components["schemas"]["Category"]["categoryId"]) => void,
    gameSlug?: components["schemas"]["GameDto"]["slug"],
    category?: components["schemas"]["Category"]["categoryId"]
}) {
    const [categories, setCategories] = useState<components["schemas"]["Category"][]|undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (categories == null && !loading && gameSlug != undefined) {
            setLoading(true);
            loadCategories();
        }
    }, []);

    async function loadCategories(): Promise<void> {
        const {data} = await GetCategoriesFromGame(gameSlug??"");
        setCategories(data);
        if(data?.[0]?.categoryId){
            onSelection(data?.[0]?.categoryId);
        }
        setLoading(false);
    }

    if (loading || categories == undefined) {
        return <Skeleton className="h-9 max-w-[233px] mx-auto mt-[34px]"/>;
    }
    return (
        <Select value={category}
                onValueChange={(categorySelected: components["schemas"]["Category"]["categoryId"]) => onSelection(categorySelected)}>
            <SelectTrigger className="w-full max-w-[233px] mx-auto mt-[34px]">
                <SelectValue placeholder="Wähle eine Kategorie"/>
            </SelectTrigger>
            <SelectContent className="w-full max-w-[233px]">
                <SelectGroup>
                    <SelectLabel>Kategorie</SelectLabel>
                    {categories.map((category, index) => (
                        category.categoryId != undefined &&
                        category.label != undefined &&
                        <SelectItem key={`${category}-${index}`}
                                    value={category.categoryId}>{category.label}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}