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

function Index({ permissions }: { permissions: Permission[] }) {
    const columns: ColumnDef<Role>[] = [
        {
            accessorKey: "name",
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
    ];

    return (
        <>
            <Head title="Permissions" />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex">
                    {/* Title and description */}
                    <div className="flex flex-1 flex-col">
                        <h1 className="text-2xl font-bold">Permissions</h1>
                        <p className="text-muted-foreground">
                            List of all permissions
                        </p>
                    </div>
                </div>
                <div className="grid">
                    <DataTable
                        data={permissions}
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
