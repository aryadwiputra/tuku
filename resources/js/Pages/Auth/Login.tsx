import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/Dashboard/InputError";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function LoginPage() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Log in" />

            <div className="flex min-h-screen">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            {/* < className="h-10 w-auto" /> */}
                            <Label className="mt-6 text-3xl font-extrabold">
                                Sign in to your account
                            </Label>
                            <p className="mt-2 text-sm dark:white">
                                Or{" "}
                                <Link
                                    href={route("register")}
                                    className="font-medium text-primary hover:text-primary/90 underline"
                                >
                                    register for an account
                                </Link>
                            </p>
                        </div>

                        <div className="mt-8">
                            <div className="mt-6">
                                <form onSubmit={submit} className="space-y-6">
                                    <div>
                                        <Label
                                            htmlFor="email"
                                            className="block text-sm font-medium"
                                        >
                                            Email address
                                        </Label>
                                        <div className="mt-1">
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                onChange={(e) => {
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    );
                                                }}
                                                className="block w-full appearance-none rounded-md border  px-3 py-2 shadow-sm  sm:text-sm"
                                            />
                                            {errors.email && (
                                                <InputError
                                                    message={errors.email}
                                                    className="mt-2"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <Label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Password
                                        </Label>
                                        <div className="mt-1">
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                onChange={(e) => {
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    );
                                                }}
                                                className="block w-full appearance-none rounded-md border  px-3 py-2 shadow-sm  sm:text-sm"
                                            />
                                            {errors.password && (
                                                <InputError
                                                    message={errors.password}
                                                    className="mt-2"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Checkbox
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                onChange={(e) => {
                                                    setData(
                                                        "remember",
                                                        e.target.checked
                                                    );
                                                }}
                                            />
                                            <Label
                                                htmlFor="remember-me"
                                                className="ml-2 block text-sm "
                                            >
                                                Remember me
                                            </Label>
                                        </div>

                                        <div className="text-sm">
                                            <a
                                                href="#"
                                                className="font-medium text-primary hover:text-primary/90"
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full"
                                        >
                                            Sign in
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/images/login.jpg"
                        alt="Login background image"
                    />
                </div>
            </div>
        </>
    );
}
