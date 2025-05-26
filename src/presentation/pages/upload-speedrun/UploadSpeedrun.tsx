import {useSearchParams} from "react-router-dom";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import GetGames from "@/business-rules/get-games.ts";
import {toast} from "sonner";
import {components} from "@/data-domain/schema";
import GetCategoriesFromGame from "@/business-rules/get-categories-from-game.ts";
import {Card, CardContent, CardDescription, CardHeader} from "@/presentation/components/ui/card.tsx";
import {Form} from "@/presentation/components/ui/form.tsx";
import {Button} from "@/presentation/components/ui/button";

import FormFieldGame from "@/presentation/pages/upload-speedrun/components/FormFieldGame.tsx";
import FormFieldCategory from "@/presentation/pages/upload-speedrun/components/FormFieldCategory.tsx";
import FormFieldDate from "@/presentation/pages/upload-speedrun/components/FormFieldDate.tsx";
import FormFieldRuntime from "@/presentation/pages/upload-speedrun/components/FormFieldRuntime.tsx";

export default function UploadSpeedrun() {
    const [searchParams] = useSearchParams();

    const [games, setGames] = useState<components["schemas"]["GameDto"][] | undefined>(undefined);
    const [gamesLoading, setGamesLoading] = useState<boolean>(false);
    const [gamesError, setGamesError] = useState<undefined | boolean>(undefined);

    const [categories, setCategories] = useState<components["schemas"]["Category"][] | undefined>(undefined);
    const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false);
    const [categoriesError, setCategoriesError] = useState<undefined | boolean>(undefined);

    const FormSchema = z.object({
        date: z.date().refine((d) => d <= new Date(), {
            message: "Datum muss heute sein oder in der Vergangenheit liegen",
        }),
        runtime: z.object({
            hours: z.number().int().nonnegative().max(23),
            minutes: z.number().int().nonnegative().max(59),
            seconds: z.number().int().nonnegative().max(59),
            milliseconds: z.number().int().nonnegative().max(999),
        }).refine(runtime => {
            return 0 < runtime.hours + runtime.minutes + runtime.seconds + runtime.milliseconds;
        }, {
            message: "Runtime muss größer als 0 sein",
        }),
        game: z.string().refine(game => games?.some(g => g.slug === game) ?? false, {}),
        category: z.string().refine(category => categories?.some(c => c.categoryId === category) ?? false, {}),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            date: new Date(),
            runtime: {
                hours: 0,
                minutes: 1,
                seconds: 30,
                milliseconds: 0
            },
            game: searchParams.get("game") ?? undefined,
            category: searchParams.get("category") ?? ""
        },
    });

    const watchedGame = form.watch("game");
    const watchedCategory = form.watch("category");
    const watchedDate = form.watch("date");
    const watchedRuntime = form.watch("runtime")

    useEffect(() => {
        async function loadGames(): Promise<void> {
            const {data, error} = await GetGames();

            setGames(data);
            setGamesError(error);
            setGamesLoading(false);
            if (error != undefined) {
                toast.error("Es ist ein Fehler beim Laden der Spiele aufgetreten.")
            }
        }

        if (!gamesLoading && games == undefined && gamesError == undefined) {
            loadGames();
        }
    }, [])

    useEffect(() => {
        async function loadCategories(): Promise<void> {
            const {data, error} = await GetCategoriesFromGame(form.getValues("game"));

            setCategories(data);
            setCategoriesError(error);
            setCategoriesLoading(false);
            if (error != undefined) {
                toast.error("Es ist ein Fehler beim Laden der Kategorien aufgetreten.")
            }
        }

        if (!categoriesLoading && categories == undefined && categoriesError == undefined && form.getValues("game")) {
            loadCategories();
        }
    }, [categories, watchedGame])

    useEffect(() => {
        setCategories(undefined);
        setCategoriesError(undefined);
        setCategoriesLoading(false);
    }, [watchedGame])

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
    }


    return (
        <Card className="max-w-[400px] mx-auto">
            <CardHeader>
                <h1 className="text-2xl font-semibold text-center">Reiche einen Speedrun ein</h1>
                <CardDescription className="text-center">
                    Gib die Daten deines Speedruns ein und erscheine in kurzer Zeit auf dem Leaderboard.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <FormFieldGame form={form} games={games}/>
                        <FormFieldCategory form={form} categories={categories}/>
                        <FormFieldDate form={form} watchedCategory={watchedCategory} watchedGame={watchedGame}/>
                        <FormFieldRuntime form={form} watchedDate={watchedDate} watchedCategory={watchedCategory}
                                          watchedGame={watchedGame}/>
                        <Button type="submit" className="w-full cursor-pointer"
                                disabled={!(watchedCategory && watchedGame && watchedDate && watchedRuntime)}>Absenden</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}