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

export default function FormFieldCategory({form, categories}: Readonly<{
    form: any,
    categories: components["schemas"]["Category"][] | undefined
}>) {
    return (
        <FormField
            control={form.control}
            name="category"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Kategorie</FormLabel>
                    <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            {!categories &&
                                <Skeleton className="h-9 w-full"/>}
                            {categories &&
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Wähle eine Kategorie"/>
                                </SelectTrigger>}
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Kategorien</SelectLabel>
                                    {categories?.map((category, index) => (
                                        <SelectItem value={category.categoryId}
                                                    key={`${category.categoryId}-${index}`}>{category.label}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
    );
}