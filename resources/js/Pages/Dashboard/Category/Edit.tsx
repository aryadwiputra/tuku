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

function Edit({ category }: any) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
        description: category.description,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("dashboard.categories.update", category.id));
    };

    return (
        <div>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid">
                    <Card>
                        <CardHeader>
                            <div className="inline-flex gap-5">
                                <Link
                                    href={route("dashboard.categories.index")}
                                    className="inline-flex items-center gap-1.5"
                                >
                                        <ArrowLeftIcon className="h-4 w-4" />
                                </Link>
                                <div className="flex flex-col">
                                    <CardTitle>Edit {category.name}</CardTitle>
                                    <CardDescription>
                                        Edit data category
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
                                            placeholder="Enter category name"
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            value={data.name}
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
                                            value={data.description}
                                        />
                                        {errors.description && (
                                            <InputError
                                                message={errors.description}
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
    );
}

Edit.layout = (page: React.ReactNode) => {
    return <DashboardLayout children={page} />;
};

export default Edit;
