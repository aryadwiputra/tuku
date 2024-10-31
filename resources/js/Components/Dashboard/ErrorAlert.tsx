import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";

interface AlertDestructiveProps {
    messages: string[];
}

export function AlertDestructive({ messages }: AlertDestructiveProps) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <div>
                {messages.map((message, index) => (
                    <AlertDescription key={index}>{message}</AlertDescription>
                ))}
            </div>
        </Alert>
    );
}
