import React from "react";

export default function InputError({ message }: { message: string }) {
    return <div className="mt-2 text-sm text-red-600">
        {message}
    </div>;
}
