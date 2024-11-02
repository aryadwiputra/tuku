import { ModalForm } from "@/Components/Dashboard/ModalForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/Components/ui/label";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { DataTable } from "@/Components/Dashboard/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, PlusIcon } from "lucide-react";
import ButtonDelete from "@/Components/Dashboard/ButtonDelete";
import Checkbox from "@/Components/Checkbox";
import { Badge } from "@/Components/ui/badge";

function Index({ roles }: { roles: Role[] }) {
    const handleDelete = (id: number) => {
        router.delete(route("dashboard.roles.destroy", id));
    };

    const columns: ColumnDef<Role>[] = [
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
            accessorKey: "guard_name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Guard Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "permissions",
            header: "Permissions",
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-2">
                    {row.original.permissions.map((permission) => (
                        // <span key={permission.id} className="mr-2">
                        //     {permission.name}
                        // </span>
                        <Badge  key={permission.id}>{permission.name}</Badge>
                    ))}
                </div>
            ),
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
                                route("dashboard.roles.edit", row.original.id)
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
            <Head title="Roles" />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex">
                    {/* Title and description */}
                    <div className="flex flex-1 flex-col">
                        <h1 className="text-2xl font-bold">Roles</h1>
                        <p className="text-muted-foreground">
                            Manage your roles
                        </p>
                    </div>
                    <div className="ml-auto">
                        <Button
                            onClick={() =>
                                router.visit(route("dashboard.roles.create"))
                            }
                        >
                            <PlusIcon className="h-4 w-4" />
                            Create
                        </Button>
                    </div>
                </div>
                <div className="grid">
                    <DataTable
                        data={roles}
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
