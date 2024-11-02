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
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import InputError from "@/Components/Dashboard/InputError";

function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("dashboard.roles.store"));
    };

    return (
        <div>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid">
                    <Card>
                        <CardHeader>
                            <div className="inline-flex gap-5">
                                <Link
                                    href={route("dashboard.roles.index")}
                                    className="inline-flex items-center gap-1.5"
                                >
                                    <ArrowLeftIcon className="h-4 w-4" />
                                </Link>
                                <div className="">
                                    <CardTitle>Create Role</CardTitle>
                                    <CardDescription>
                                        Create a new role
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
                                        />
                                        {errors.name && (
                                            <InputError message={errors.name} />
                                        )}
                                    </div>
                                    {/* Multi select permissions */}
                                    
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
    );
}

Create.layout = (page: React.ReactNode) => {
    return <DashboardLayout children={page} />;
};

export default Create;
