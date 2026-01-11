import { Sidebar } from "@/components/layout/Sidebar";

export default function ComponentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-background">
            {/* Ambient Background - Shared across all component pages */}
            <div className="fixed inset-0 bg-gradient-to-b from-background via-background to-accent/2 pointer-events-none -z-10" />

            {/* Spacer for fixed header - assuming header is ~4rem/64px */}
            <div className="h-[72px] flex-shrink-0" />

            <div className="flex-1 flex overflow-hidden max-w-[1600px] w-full mx-auto">
                {/* Persistent Sidebar Area */}
                <div className="w-64 flex-shrink-0 h-full overflow-y-auto hidden lg:block border-r border-border/50">
                    <div className="p-4 pl-6">
                        <Sidebar />
                    </div>
                </div>

                {/* Dynamic Content Area */}
                <div className="flex-1 min-w-0 h-full overflow-y-auto scroll-smooth">
                    <div className="p-8 lg:p-10 max-w-5xl mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
