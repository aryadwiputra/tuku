import InputError from "@/Components/Dashboard/InputError";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function RegisterPage() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };
    return (
        <div className="flex min-h-screen">
            <div className="relative hidden w-0 flex-1 lg:block">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/images/login.jpg"
                    alt="Registration background image"
                />
            </div>
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        {/* <Icons.logo className="h-10 w-auto" /> */}
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Create your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                href={route("login")}
                                className="font-medium text-primary hover:text-primary/90"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8">
                        <div className="mt-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <Label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Full name
                                    </Label>
                                    <div className="mt-1">
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            required
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            value={data.name}
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                        />
                                        {errors.name && (
                                            <InputError message={errors.name} />
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
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
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            value={data.email}
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                        />
                                        {errors.email && (
                                            <InputError
                                                message={errors.email}
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
                                            autoComplete="password"
                                            required
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                        />
                                        {errors.password && (
                                            <InputError
                                                message={errors.password}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <Label
                                        htmlFor="password_confirmation"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Confirm password
                                    </Label>
                                    <div className="mt-1">
                                        <Input
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            type="password"
                                            autoComplete="new-password"
                                            value={data.password_confirmation}
                                            required
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                        />
                                        {errors.password_confirmation && (
                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="terms-and-privacy"
                                        name="terms-and-privacy"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        required
                                    />
                                    <Label
                                        htmlFor="terms-and-privacy"
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        I agree to the{" "}
                                        <a
                                            href="#"
                                            className="font-medium text-primary hover:text-primary/90"
                                        >
                                            Terms
                                        </a>{" "}
                                        and{" "}
                                        <a
                                            href="#"
                                            className="font-medium text-primary hover:text-primary/90"
                                        >
                                            Privacy Policy
                                        </a>
                                    </Label>
                                </div>

                                <div>
                                    <Button
                                        disabled={processing}
                                        type="submit"
                                        className="w-full"
                                    >
                                        Create account
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
