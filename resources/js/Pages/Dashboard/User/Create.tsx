import React, { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Button } from "@/Components/ui/button";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, ArrowLeftIcon } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import InputError from "@/Components/Dashboard/InputError";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

function Create({ roles }: { roles: Role[] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        repeat_password: "",
        role: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("dashboard.users.store"));
    };

    return (
        <div>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid">
                    <Card>
                        <CardHeader>
                            <div className="inline-flex gap-5">
                                <Link
                                    href={route("dashboard.users.index")}
                                    className="inline-flex items-center gap-1.5"
                                >
                                    <ArrowLeftIcon className="h-4 w-4" />
                                </Link>
                                <div className="">
                                    <CardTitle>Create User</CardTitle>
                                    <CardDescription>
                                        Create a new user
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Form */}
                            <form onSubmit={handleSubmit}>
                                <div className="grid w-full items-center gap-1.5">
                                    <div className="">
                                        <Label>Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Enter user name"
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        {errors.name && (
                                            <InputError message={errors.name} />
                                        )}
                                    </div>
                                    <div className="">
                                        <Label>Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter user email"
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        {errors.email && (
                                            <InputError
                                                message={errors.email}
                                            />
                                        )}
                                    </div>
                                    <div className="">
                                        <Label>Role</Label>
                                        <Select onValueChange={(value) => setData("role", value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Select user role
                                                    </SelectLabel>
                                                    {/* Select Items  */}
                                                    {roles.map((role) => (
                                                        <SelectItem
                                                            key={role.id}
                                                            value={role.name}
                                                        >
                                                            {role.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {errors.role && (
                                            <InputError message={errors.role} />
                                        )}
                                    </div>
                                    <div className="">
                                        <Label>Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Enter user password"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.password && (
                                            <InputError
                                                message={errors.password}
                                            />
                                        )}
                                    </div>
                                    <div className="">
                                        <Label>Repeat Password</Label>
                                        <Input
                                            id="repeat_password"
                                            type="password"
                                            placeholder="Repeat user password"
                                            onChange={(e) =>
                                                setData(
                                                    "repeat_password",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.repeat_password && (
                                            <InputError
                                                message={errors.repeat_password}
                                            />
                                        )}
                                    </div>
                                    {/* Submit and Back Button */}
                                    <div className="inline-flex gap-1.5">
                                        <Button
                                            disabled={processing}
                                            type="submit"
                                        >
                                            Create
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

Create.layout = (page: React.ReactNode) => {
    return <DashboardLayout children={page} />;
};

export default Create;
