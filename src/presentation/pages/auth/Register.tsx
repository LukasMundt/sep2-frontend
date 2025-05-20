"use client";
import {Card, CardContent, CardDescription, CardHeader} from "@/presentation/components/ui/card.tsx";
import {Input} from "@/presentation/components/ui/input.tsx";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel, FormMessage
} from "@/presentation/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Button} from "@/presentation/components/ui/button.tsx";
import RegisterUser from "@/business-rules/auth/register-user.ts";
import {toast} from "sonner";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {isAuthenticatedSimple} from "@/presentation/lib/utils.ts";

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Der Username muss mindestens 2 Zeichen lang sein.",
    }),
    email: z.string().email(),
    password: z.string()
        .min(8, {message: "Das Passwort muss mindestens 8 Zeichen lang sein."})
        .max(72, {message: "Das Passwort darf maximal 72 Zeichen lang sein."})
        .refine((password) => /[A-Z]/.test(password), {
            message: "Das Passwort muss mindestens einen Großbuchstaben enthalten.",
        })
        .refine((password) => /[a-z]/.test(password), {
            message: "Das Passwort muss mindestens einen Kleinbuchstaben enthalten.",
        })
        .refine((password) => /[0-9]/.test(password), {
            message: "Das Passwort muss mindestens eine Ziffer enthalten.",
        }),
    passwordConfirm: z.string()
}).refine(data => data.password === data.passwordConfirm, {
    message: "Passwords do not match.",
    path: ["passwordConfirm"],
})

export default function Register() {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
    })

    async function onSubmit(data: Pick<z.infer<typeof FormSchema>, "username" | "email" | "password">) {
        RegisterUser(data).then(res => {
            if (res.success) {
                toast.success("Account erfolgreich erstellt.");
                navigate(`/login?email=${data.email}`)
            } else {
                toast.error("Account konnte nicht erstellt werden.");
            }
        })
    }

    if(isAuthenticatedSimple()) {
        return <Navigate to="/" />;
    }

    return (
        <Card className="max-w-[400px] mx-auto">
            <CardHeader>
                <h1 className="text-2xl font-semibold text-center">Erstelle einen Account</h1>
                <CardDescription className="text-center">
                    Trage deine Daten ein und erstelle einen Account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="roadrunner" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="roadrunner@example.org" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="passwordConfirm"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password (Confirm)</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full cursor-pointer">
                            Account erstellen
                        </Button>
                    </form>
                </Form>
                <div className="w-full flex justify-center mt-1">
                    <Link to="/login">
                        <Button variant="link" className="cursor-pointer underline">
                            Ich habe schon einen Account
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}