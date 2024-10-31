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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import InputError from "@/Components/Dashboard/InputError";

function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("dashboard.categories.store"));
    };

    return (
        <div>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Category</CardTitle>
                            <CardDescription>
                                Create a new category
                            </CardDescription>
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
                                            placeholder="Enter category name"
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        {errors.name && (
                                            <InputError message={errors.name} />
                                        )}
                                    </div>
                                    <div className="">
                                        <Label>Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Enter category description"
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.description && (
                                            <InputError
                                                message={errors.description}
                                            />
                                        )}
                                    </div>
                                    {/* Submit and Back Button */}
                                    <div className="inline-flex gap-1.5">
                                        <Link
                                            href={route("dashboard.categories.index")}
                                        >
                                            <Button variant="outline">
                                                Back
                                            </Button>
                                        </Link>
                                        <Button type="submit">Create</Button>
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
