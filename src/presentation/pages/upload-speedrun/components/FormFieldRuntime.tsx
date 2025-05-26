import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/presentation/components/ui/form.tsx";
import {Skeleton} from "@/presentation/components/ui/skeleton.tsx";
import {Input} from "@/presentation/components/ui/input.tsx";
import {ChangeEvent} from "react";

export default function FormFieldRuntime({form, watchedDate, watchedCategory, watchedGame}: Readonly<{
    form: any,
    watchedDate: Date,
    watchedCategory: string,
    watchedGame: string
}>) {

    function handleMinutesChange(e: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value) || 0;
        const runtime = form.getValues("runtime");

        const min = Math.max(0, value);
        const overflowHr = Math.floor(min / 60);
        const newMin = min % 60;

        form.setValue("runtime.minutes", newMin);
        form.setValue("runtime.hours", runtime.hours + overflowHr);
    }

    function handleSecondsChange(e: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value) || 0;
        const runtime = form.getValues("runtime");

        const sec = Math.max(0, value);
        const overflowMin = Math.floor(sec / 60);
        const newSec = sec % 60;

        form.setValue("runtime.seconds", newSec);
        form.setValue("runtime.minutes", runtime.minutes + overflowMin);
    }

    function handleMillisecondsChange(e: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value) || 0;
        const runtime = form.getValues("runtime");

        const ms = Math.max(0, value);
        const overflowSec = Math.floor(ms / 1000);
        const newMs = ms % 1000;

        form.setValue("runtime.milliseconds", newMs);
        form.setValue("runtime.seconds", runtime.seconds + overflowSec);
    }

    return (
        <FormField
            control={form.control}
            name="runtime"
            render={() => (
                <FormItem>
                    <FormLabel>Laufzeit</FormLabel>
                    {!(watchedDate && watchedCategory && watchedGame) &&
                        <div className="grid grid-cols-4 gap-2">
                            <Skeleton className="h-9"/>
                            <Skeleton className="h-9"/>
                            <Skeleton className="h-9"/>
                            <Skeleton className="h-9"/>
                        </div>}
                    {watchedDate && watchedGame && watchedCategory &&
                        <div className="grid grid-cols-4 gap-2 items-start">
                            <FormField
                                control={form.control}
                                name="runtime.hours"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-xs">Stunden</FormLabel>
                                        <FormControl>
                                            <Input type="number" value={field.value}
                                                   onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="runtime.minutes"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-xs">Minuten</FormLabel>
                                        <FormControl>
                                            <Input type="number" value={field.value} onChange={handleMinutesChange}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="runtime.seconds"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-xs">Sekunden</FormLabel>
                                        <FormControl>
                                            <Input type="number" value={field.value}
                                                   onChange={handleSecondsChange}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="runtime.milliseconds"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-xs">Millisek.</FormLabel>
                                        <FormControl>
                                            <Input type="number" value={field.value}
                                                   onChange={handleMillisecondsChange}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>}
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}