import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Button } from "@/Components/ui/button";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { ArrowLeftIcon } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/Dashboard/InputError";
import Checkbox from "@/Components/Checkbox";

function Create({ permissions }: { permissions: Permission[] }) {
    // Use the Inertia `useForm` hook for form data management
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        permissions: [],
    });

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("dashboard.roles.store")); // Submit the form using Inertia
    };

    // Function to handle checkbox changes
    const handleCheckboxChange = (id) => {
        if (data.permissions.includes(id)) {
            // Remove the permission if it's already selected
            setData(
                "permissions",
                data.permissions.filter((permission) => permission !== id)
            );
        } else {
            // Add the permission if it's not selected
            setData("permissions", [...data.permissions, id]);
        }
    };

    return (
        <>
            <Head title="Create Role" />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid">
                    <Card>
                        <CardHeader>
                            <div className="inline-flex gap-5">
                                <Link
                                    href={route("dashboard.roles.index")}
                                    className="inline-flex items-center gap-1.5"
                                >
                                    <ArrowLeftIcon className="h-4 w-4" />
                                </Link>
                                <div>
                                    <CardTitle>Create Role</CardTitle>
                                    <CardDescription>
                                        Create a new role
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Form */}
                            <form onSubmit={handleSubmit}>
                                <div className="grid w-full gap-4">
                                    {/* Name Input */}
                                    <div>
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Enter role name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        {errors.name && (
                                            <InputError message={errors.name} />
                                        )}
                                    </div>

                                    {/* Permissions Checkboxes */}
                                    <div>
                                        <Label>Permissions</Label>
                                        <div className="flex flex-wrap gap-2">
                                            {permissions.map((permission) => (
                                                <div
                                                    key={permission.id}
                                                    className="flex items-center"
                                                >
                                                    <Checkbox
                                                        id={permission.id}
                                                        checked={data.permissions.includes(
                                                            permission.id
                                                        )}
                                                        onChange={() =>
                                                            handleCheckboxChange(
                                                                permission.id
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={permission.id}
                                                        className="ml-2"
                                                    >
                                                        {permission.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        {errors.permissions && (
                                            <InputError
                                                message={errors.permissions}
                                            />
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex gap-2">
                                        <Button
                                            type="submit"
                                            disabled={processing}
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
        </>
    );
}

// Set the layout for the page
Create.layout = (page: React.ReactNode) => (
    <DashboardLayout>{page}</DashboardLayout>
);

export default Create;
