import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/presentation/components/ui/form.tsx";
import {
    Select,
    SelectContent,
    SelectGroup, SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/presentation/components/ui/select.tsx";
import {Skeleton} from "@/presentation/components/ui/skeleton.tsx";
import {components} from "@/data-domain/schema";

export default function FormFieldGame({form, games}: Readonly<{
    form: any,
    games: components["schemas"]["GameDto"][] | undefined
}>) {
    return (
        <FormField
            control={form.control}
            name="game"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Spiel</FormLabel>
                    <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            {!games &&
                                <Skeleton className="h-9 w-full"/>}
                            {games &&
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Wähle ein Spiel"/>
                                </SelectTrigger>}
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Spiele</SelectLabel>
                                    {games?.map((game, index) => (
                                        <SelectItem value={game.slug}
                                                    key={`${game.slug}-${index}`}>{game.name}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
    )
}