import {Card, CardContent, CardDescription, CardHeader} from "@/presentation/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/presentation/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import LoginUser from "@/business-rules/auth/login-user.ts";
import {Input} from "@/presentation/components/ui/input.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import Cookies from "universal-cookie";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {isAuthenticatedSimple} from "@/presentation/lib/utils.ts";

const FormSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .min(8, {message: "Sicher?"})
})

export default function Login() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: searchParams.get("email")??"",
            password: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        LoginUser(data).then(res => {
            if (res.success) {
                const cookie = new Cookies(null, {path: '/'});
                cookie.set("accessToken", res.data?.accessToken, {path: '/', maxAge: res.data?.expiresIn, secure: true});
                toast.success("Erfolgreich angemeldet");
                navigate(searchParams.get("returnUrl") ??"/");
            } else if(res.statusCode == 401)
            {
                toast.error(res.errorMessage);
                form.setError("email", {message: "Email oder Passwort sind falsch"});
                form.setError("password", {message: "Email oder Passwort sind falsch"});
            } else {
                toast.error(res.errorMessage);
            }
        })
    }

    if(isAuthenticatedSimple()) {
        navigate(searchParams.get("returnUrl") ??"/");
    }

    return (
        <Card className="max-w-[400px] mx-auto">
            <CardHeader>
                <h1 className="text-2xl font-semibold text-center">Willkommen zurück</h1>
                <CardDescription className="text-center">
                    Melde dich mit deiner E-Mail-Adresse und deinem Passwort an.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
                                        <Input type="password" placeholder="***" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full cursor-pointer">Anmelden</Button>
                    </form>
                </Form>
                <div className="text-sm flex justify-center items-center gap-[5px] mt-1">
                    <span>Du hast noch keinen Account?</span>
                    <Link to="/register">
                        <Button variant="link" className="p-0 underline cursor-pointer">
                            Registrieren
                        </Button>
                    </Link>
                </div>

            </CardContent>
        </Card>
    );
}