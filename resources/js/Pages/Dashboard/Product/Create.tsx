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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

type Category = {
    id: string;
    name: string;
};

type Props = {
    categories: Category[];
};

function Create({ categories }: Props) {
    const { data, setData, post, processing, errors, progress } = useForm({
        category_id: "",
        name: "",
        description: "",
        thumbnail: "",
        price: "",
        stock: "",
    });

    console.log(categories);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(data);

        post(route("dashboard.products.store"));
    };

    return (
        <>
            <Head title="Create Product" />
            <div>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="grid">
                        <Card>
                            <CardHeader>
                                <div className="inline-flex gap-5">
                                    <Link
                                        href={route("dashboard.products.index")}
                                        className="inline-flex items-center gap-1.5"
                                    >
                                        <ArrowLeftIcon className="h-4 w-4" />
                                    </Link>
                                    <div className="">
                                        <CardTitle>Create Product</CardTitle>
                                        <CardDescription>
                                            Create a new product
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
                                            <Label>Category</Label>
                                            <Select
                                                onValueChange={(e) =>
                                                    setData("category_id", e)
                                                }
                                                value={data.category_id || ""}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Select a category
                                                        </SelectLabel>
                                                        {categories.map(
                                                            (category) => (
                                                                <SelectItem
                                                                    key={
                                                                        category.id
                                                                    }
                                                                    value={
                                                                        category.name
                                                                    }
                                                                >
                                                                    {
                                                                        category.name
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            {errors.category_id && (
                                                <InputError
                                                    message={errors.category_id}
                                                />
                                            )}
                                        </div>
                                        <div className="">
                                            <Label>Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Enter product name"
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
                                        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                                            <div className="md:w-1/2">
                                                <Label>Price</Label>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    placeholder="Enter product price"
                                                    onChange={(e) =>
                                                        setData(
                                                            "price",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.price && (
                                                    <InputError
                                                        message={errors.price}
                                                    />
                                                )}
                                            </div>
                                            <div className="md:w-1/2">
                                                <Label>Stock</Label>
                                                <Input
                                                    id="stock"
                                                    type="number"
                                                    placeholder="Enter product stock"
                                                    onChange={(e) =>
                                                        setData(
                                                            "stock",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.stock && (
                                                    <InputError
                                                        message={errors.stock}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="">
                                            <Label>Description</Label>
                                            <Textarea
                                                id="description"
                                                placeholder="Enter product description"
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
                                            <Label>Thumbnail</Label>
                                            <Input
                                                id="thumbnail"
                                                name="thumbnail"
                                                type="file"
                                                placeholder="Enter product thumbnail"
                                                onChange={(e) =>
                                                    setData(
                                                        "thumbnail",
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
                                            {errors.thumbnail && (
                                                <InputError
                                                    message={errors.thumbnail}
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
