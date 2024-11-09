import { ModalForm } from "@/Components/Dashboard/ModalForm";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { DataTable } from "@/Components/Dashboard/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, PlusIcon } from "lucide-react";
import ButtonDelete from "@/Components/Dashboard/ButtonDelete";

type Product = {
    id: number;
    name: string;
    slug: string;
};

function Index({ products }: { products: Product[] }) {
    const handleDelete = (id: number) => {
        router.delete(route("dashboard.products.destroy", id));
    };

    const columns: ColumnDef<Product>[] = [
        {
            accessorKey: "name",
            // header: "Name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "thumbnail",
            header: ({ column }) => {
                return (
                    // Image
                    <img
                        src={column.getIsSorted() === "asc"}
                        alt="Thumbnail"
                        className="h-10 w-10 rounded-full"
                    />
                );
            },
        },
        {
            accessorKey: "slug",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Slug
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            header: "Actions",
            id: "actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    {/* Button Edit */}
                    <Button
                        variant="outline"
                        onClick={() =>
                            router.visit(
                                route(
                                    "dashboard.products.edit",
                                    row.original.id
                                )
                            )
                        }
                    >
                        Edit
                    </Button>
                    <ButtonDelete
                        id={row.original.id}
                        handleDelete={handleDelete}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <Head title="Products" />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex">
                    {/* Title and description */}
                    <div className="flex flex-1 flex-col">
                        <h1 className="text-2xl font-bold">Products</h1>
                        <p className="text-muted-foreground">
                            Manage your products
                        </p>
                    </div>
                    {/* Create category button */}
                    <div className="ml-auto">
                        <Button
                            onClick={() =>
                                router.visit(route("dashboard.products.create"))
                            }
                        >
                            <PlusIcon className="h-4 w-4" />
                            Create
                        </Button>
                    </div>
                </div>
                <div className="grid">
                    <DataTable
                        data={products}
                        columns={columns}
                        filterColumn="name"
                    />
                </div>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => <DashboardLayout children={page} />;

export default Index;
