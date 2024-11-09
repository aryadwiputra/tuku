import React, { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Button } from "@/Components/ui/button";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
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
import { Progress } from "@/Components/ui/progress";

function Create() {
    const { data, setData, post, processing, errors, progress } = useForm({
        name: "",
        description: "",
        icon: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("dashboard.categories.store"));
    };

    return (
        <>
            <Head title="Create Category" />
            <div>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="grid">
                        <Card>
                            <CardHeader>
                                <div className="inline-flex gap-5">
                                    <Link
                                        href={route(
                                            "dashboard.categories.index"
                                        )}
                                        className="inline-flex items-center gap-1.5"
                                    >
                                        <ArrowLeftIcon className="h-4 w-4" />
                                    </Link>
                                    <div className="">
                                        <CardTitle>Create Category</CardTitle>
                                        <CardDescription>
                                            Create a new category
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* Form */}
                                <form
                                    onSubmit={handleSubmit}
                                    encType="multipart/form-data"
                                >
                                    <div className="grid w-full items-center gap-1.5">
                                        <div className="">
                                            <Label>Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Enter category name"
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.name && (
                                                <InputError
                                                    message={errors.name}
                                                />
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
                                        <div className="">
                                            <Label>Icon</Label>
                                            <Input
                                                id="icon"
                                                name="icon"
                                                type="file"
                                                placeholder="Enter category icon"
                                                onChange={(e) =>
                                                    setData(
                                                        "icon",
                                                        e.target.files[0]
                                                    )
                                                }
                                            />
                                            {progress && (
                                                <Progress
                                                    value={progress.percentage}
                                                >
                                                    {progress.percentage}%
                                                </Progress>
                                            )}
                                            {errors.icon && (
                                                <InputError
                                                    message={errors.icon}
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
        </>
    );
}

Create.layout = (page: React.ReactNode) => {
    return <DashboardLayout children={page} />;
};

export default Create;
