import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";

const Dashboard = () => {
    return (
        <>
            <Head title="Dashboard" />

            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </>
    );
};

Dashboard.layout = (page: React.ReactNode) => (
    <DashboardLayout children={page} />
);
export default Dashboard;
