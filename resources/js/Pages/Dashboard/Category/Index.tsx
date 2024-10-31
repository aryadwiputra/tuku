import { ModalForm } from "@/Components/Dashboard/ModalForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/Components/ui/label";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { DataTable } from "@/Components/Dashboard/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

function Index({ categories }: { categories: Category[] }) {
    const handleDelete = (id: number) => {
        router.delete(route("dashboard.categories.destroy", id), {});
    };

    const columns: ColumnDef<Category>[] = [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "slug",
            header: "Slug",
        },
        {
            header: "Actions",
            id: "actions",
            cell: ({ row }) => (
                <>
                    <div className="flex gap-2">
                        <Button
                            variant="destructive"
                            onClick={() => handleDelete(row.original.id)}
                        >
                            Delete
                        </Button>
                    </div>
                </>
            ),
        },
    ];

    return (
        <>
            <Head title="Categories" />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex">
                    {/* Title and description */}
                    <div className="flex flex-1 flex-col">
                        <h1 className="text-2xl font-bold">Categories</h1>
                        <p className="text-muted-foreground">
                            Manage your categories
                        </p>
                    </div>
                    {/* Create category button */}
                    <div className="ml-auto">
                        <Button
                            onClick={() =>
                                router.visit(
                                    route("dashboard.categories.create")
                                )
                            }
                        >
                            <PlusIcon className="h-4 w-4" />
                            Create
                        </Button>
                    </div>
                </div>
                <div className="grid">
                    <DataTable
                        data={categories}
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
