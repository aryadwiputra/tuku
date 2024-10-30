import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import React, { useState } from "react";
import { useForm } from "@inertiajs/react"; // Assuming you're using Inertia's React adapter

type ModalAddProps = {
    title: string;
    description: string;
    triggerText: string;
    children: React.ReactNode;
    onSubmit: (event: React.FormEvent) => Promise<void>;
    buttonText?: string;
};

export function ModalAdd({
    title,
    description,
    triggerText,
    children,
    onSubmit,
    buttonText = "Save changes",
}: ModalAddProps) {
    const [open, setOpen] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await onSubmit(event);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">{triggerText}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">{children}</div>
                    <DialogFooter>
                        <Button type="submit">{buttonText}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
