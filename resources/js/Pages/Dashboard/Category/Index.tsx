import { ModalAdd } from "@/Components/Dashboard/ModalForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/Components/ui/label";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, router } from "@inertiajs/react";
import { DataTable } from "@/Components/Dashboard/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

function Index({ categories }: { categories: Category[] }) {
    const { toast } = useToast();

    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(
            route("dashboard.categories.store"),
            {
                name: name,
            },
            {
                onSuccess: () => {
                    setName("");
                    toast({
                        title: "Category created successfully",
                        description: "Category has been created successfully.",
                        duration: 2000,
                    });
                    setOpen(false); // Closes the modal on success
                },
            }
        );
    };

    const handleEdit = () => {};

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
            id: "actions",
            cell: ({ row }) => (
                <Button
                    variant="outline"
                    onClick={() => handleEdit(row.original)}
                >
                    Edit
                </Button>
            ),
        },
    ];

    return (
        <>
            <Head title="Categories" />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="inline-flex">
                    <h4 className="h4 my-5">
                        <span className="capitalize">Categories</span>
                    </h4>
                </div>

                <div className="inline-flex">
                    <ModalAdd
                        title="Add New Category"
                        description="Enter Category details below"
                        triggerText="Add Category"
                        onSubmit={handleSubmit}
                        buttonText="Add Category"
                    >
                        <div>
                            <Label htmlFor="name">Category Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter category name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        {/* Add more fields as needed */}
                    </ModalAdd>
                </div>

                <div className="grid">
                    <DataTable data={categories} columns={columns} />
                </div>
            </div>

            {/* Create button with modal to create new category */}
        </>
    );
}

Index.layout = (page: React.ReactNode) => <DashboardLayout children={page} />;

export default Index;