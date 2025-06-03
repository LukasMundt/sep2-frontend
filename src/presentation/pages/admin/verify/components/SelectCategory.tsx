import {useEffect, useState} from "react";
import {components} from "@/data-domain/schema";
import {Skeleton} from "@/presentation/components/ui/skeleton.tsx";
import {
    Select, SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/presentation/components/ui/select.tsx";
import GetCategoriesFromGame from "@/business-rules/get-categories-from-game.ts";

export default function SelectCategory({gameSlug, onCategorySelected}:{readonly gameSlug?: string, onCategorySelected: (categoryId: string) => void}){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<boolean|undefined>(false);
    const [categories, setCategories] = useState<undefined|components["schemas"]["Category"][]>(undefined);

    useEffect(() => {
        if(!loading && !error && categories === undefined && gameSlug != undefined){
            setLoading(true);
            GetCategoriesFromGame(gameSlug).then(({data, error}) => {
                setCategories(data)
                setError(error);
            }).catch(() => {
                setError(true);
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [categories, gameSlug])

    useEffect(() => {
        setError(false);
        setLoading(false);
        setCategories(undefined);
        console.log(gameSlug);
    }, [gameSlug])

    if(error || loading || gameSlug == undefined){
        return <Skeleton className="h-9"/>
    }

    return <Select onValueChange={onCategorySelected}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Wähle eine Kategorie"/>
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Kategorie</SelectLabel>
                {categories?.map((category, index) => (
                    <SelectItem value={category.categoryId}
                                key={`${category.categoryId}-${index}`}>{category.label}</SelectItem>
                ))}
            </SelectGroup>
        </SelectContent>
    </Select>
}