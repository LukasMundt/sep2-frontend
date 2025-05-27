import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/presentation/components/ui/form.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/presentation/components/ui/popover.tsx";
import {Skeleton} from "@/presentation/components/ui/skeleton.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {cn} from "@/presentation/lib/utils.ts";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/presentation/components/ui/calendar.tsx";

export default function FormFieldDate({form, watchedCategory, watchedGame}: Readonly<{
    form: any,
    watchedCategory: string,
    watchedGame: any
}>) {
    return (
        <FormField
            control={form.control}
            name="date"
            render={({field}) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Datum des Speedruns</FormLabel>
                    <Popover>
                        {!(watchedCategory && watchedGame) &&
                            <Skeleton className="h-9 w-full"/>
                        }
                        {watchedGame && watchedCategory &&
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        {field.value ? (
                                            field.value.toLocaleDateString()
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>}
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                }
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
}