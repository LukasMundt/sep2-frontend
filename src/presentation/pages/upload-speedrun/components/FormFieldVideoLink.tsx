import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/presentation/components/ui/form.tsx";
import {Input} from "@/presentation/components/ui/input.tsx";

export default function FormFieldVideoLink({form}: Readonly<{
    form: any,
}>) {
    return (
        <FormField
            control={form.control}
            name="videoLink"
            render={({field}) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Videolink</FormLabel>
                    <FormControl>
                        <Input type="url" placeholder={"https://youtu.be"} {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
}