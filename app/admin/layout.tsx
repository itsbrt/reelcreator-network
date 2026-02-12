import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="admin-container">
            {/* Sidebar */}
            <AdminSidebar />  {/* Use the client component */}

            {/* Main Content Area */}
            <main className="admin-main">
                <div style={{ maxWidth: '100%', margin: '0 auto' }}>
                    {children}
                </div>
            </main>
        </div>
    )
}
