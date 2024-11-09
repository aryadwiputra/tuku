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

type Product = {
    category_id: string;
    id: number;
    name: string;
    slug: string;
    thumbnail: string;
    description: string;
    price: string;
    stock: string;
};

type Props = {
    categories: Category[];
    product: Product;
};

function Edit({ categories, product }: Props) {
    const { data, setData, post, processing, errors, progress } = useForm({
        _method: "patch",
        category_id: product.category.name,
        name: product.name,
        description: product.description,
        thumbnail: "",
        price: product.price,
        stock: product.stock,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(data)

        post(route("dashboard.products.update", product.id));
    };

    return (
        <>
            <Head title="Edit Product" />
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
                                        <CardTitle>Edit Product</CardTitle>
                                        <CardDescription>
                                            Edit a product
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
                                                value={data.name}
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
                                                    value={data.price}
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
                                                    value={data.stock}
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
                                                value={data.description}
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
                                            <span className="text-sm text-muted-foreground">
                                                Let empty if you don't want to
                                                change the thumbnail
                                            </span>
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
                                                Edit
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
