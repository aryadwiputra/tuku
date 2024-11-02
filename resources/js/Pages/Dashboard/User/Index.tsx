import { ModalForm } from "@/Components/Dashboard/ModalForm";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { DataTable } from "@/Components/Dashboard/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { ArrowUpDown, PlusIcon } from "lucide-react";
import ButtonDelete from "@/Components/Dashboard/ButtonDelete";
import { Badge } from "@/Components/ui/badge";

function Index({ users }: { users: User[] }) {
    const handleDelete = (id: number) => {
        router.delete(route("dashboard.users.destroy", id));
    };

    console.log(users)

    const columns: ColumnDef<User>[] = [
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
            accessorKey: "email",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Email
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "Roles",
            cell: ({ row }) => 
                {
                    return row.original.roles.map((role) => (
                        // <Badge key={role.id}>{role.name}</Badge>
                        <p>
                            {role.name}
                        </p>
                    ));
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
                                route("dashboard.users.edit", row.original.id)
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
            <Head title="Users" />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex">
                    {/* Title and description */}
                    <div className="flex flex-1 flex-col">
                        <h1 className="text-2xl font-bold">Users</h1>
                        <p className="text-muted-foreground">
                            Manage your Users
                        </p>
                    </div>
                    {/* Create category button */}
                    <div className="ml-auto">
                        <Button
                            onClick={() =>
                                router.visit(route("dashboard.users.create"))
                            }
                        >
                            <PlusIcon className="h-4 w-4" />
                            Create
                        </Button>
                    </div>
                </div>
                <div className="grid">
                    <DataTable
                        data={users}
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
