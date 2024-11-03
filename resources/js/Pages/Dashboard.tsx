import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import { UserIcon } from "lucide-react";

const Dashboard = ({ users }: { users: string }) => {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex">
                    <div className="flex flex-1 flex-col">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Summary of your dashboard
                        </p>
                    </div>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <div className="flex justify-between">
                                    <h1>Users</h1>
                                    <UserIcon className="ml-2 h-4 w-4" />
                                </div>
                                <h1 className="md:text-3xl mt-2 md:mt-2">
                                    {users}
                                </h1>
                            </CardTitle>
                            <CardDescription>
                                <p>Number of users</p>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </>
    );
};

Dashboard.layout = (page: React.ReactNode) => (
    <DashboardLayout children={page} />
);
export default Dashboard;
