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

function Edit({ category }: any) {
    const { data, setData, post, processing, transform, errors, progress } =
        useForm({
            _method: "patch",
            name: category.name,
            description: category.description,
            icon: "",
        });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        setData("icon", file);
    };

    transform((data) => ({
        ...data,
    }));

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Data before submit:", data);

        post(route("dashboard.categories.update", category.id), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Edit Category" />
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
                                    <div className="flex flex-col">
                                        <CardTitle>
                                            Edit {category.name}
                                        </CardTitle>
                                        <CardDescription>
                                            Edit data category
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
                                                value={data.name}
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
                                                value={data.description}
                                            />
                                            {errors.description && (
                                                <InputError
                                                    message={errors.description}
                                                />
                                            )}
                                        </div>
                                        <div className="">
                                            {/* Preview image */}
                                            <Label>Icon</Label>
                                            <Input
                                                id="icon"
                                                type="file"
                                                placeholder="Enter category icon"
                                                onChange={handleImageChange}
                                            />
                                            <span className="text-sm text-muted-foreground">
                                                Let empty if you don't want to
                                                change the icon
                                            </span>
                                            {progress && (
                                                <Progress value={progress} />
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
                                                Update
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

Edit.layout = (page: React.ReactNode) => {
    return <DashboardLayout children={page} />;
};

export default Edit;
