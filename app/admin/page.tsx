import { createClient } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 0

async function getStats(supabase: any) {
    const { count: totalCreators } = await supabase.from('creators').select('*', { count: 'exact', head: true })
    const { count: pendingCreators } = await supabase.from('creators').select('*', { count: 'exact', head: true }).eq('status', 'pending')
    const { count: approvedCreators } = await supabase.from('creators').select('*', { count: 'exact', head: true }).eq('status', 'approved')
    const { count: totalCities } = await supabase.from('cities').select('*', { count: 'exact', head: true })

    return {
        totalCreators: totalCreators || 0,
        pendingCreators: pendingCreators || 0,
        approvedCreators: approvedCreators || 0,
        totalCities: totalCities || 0
    }
}

export default async function AdminPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    // if (!user || user.email !== 'admin@example.com') {
    //     // In a real app, use a more robust role check or redirect to unauthorized page
    //     // redirect('/')
    // }

    const stats = await getStats(supabase)

    // Fetch recent pending creators (limit 5 for dashboard widget)
    const { data: recentPending } = await supabase
        .from('creators')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(5)

    return (
        <div style={{ padding: '0 1rem' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e293b' }}>Dashboard Overview</h1>
                <p style={{ color: '#64748b' }}>Welcome back, Admin</p>
            </header>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #3b82f6' }}>
                    <h3 style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>Total Creators</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e293b' }}>{stats.totalCreators}</p>
                </div>
                <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #eab308' }}>
                    <h3 style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>Pending Approval</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e293b' }}>{stats.pendingCreators}</p>
                </div>
                <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #22c55e' }}>
                    <h3 style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>Approved Creators</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e293b' }}>{stats.approvedCreators}</p>
                </div>
                <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #a855f7' }}>
                    <h3 style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>Active Cities</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e293b' }}>{stats.totalCities}</p>
                </div>
            </div>

            {/* Recent Activity Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Pending Approvals Widget */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Pending Approvals</h2>
                        <Link href="/admin/creators" style={{ fontSize: '0.9rem', color: 'var(--primary)', textDecoration: 'none' }}>View All</Link>
                    </div>

                    {recentPending && recentPending.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {recentPending.map((creator) => (
                                <div key={creator.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1rem',
                                    backgroundColor: '#f8fafc',
                                    borderRadius: '8px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        {creator.profile_photo_url ? (
                                            <img src={creator.profile_photo_url} alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#cbd5e1' }}></div>
                                        )}
                                        <div>
                                            <p style={{ margin: 0, fontWeight: 600 }}>{creator.full_name}</p>
                                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{creator.city}</p>
                                        </div>
                                    </div>
                                    <Link href={`/creator/${creator.id}`} className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}>Review</Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>No pending approvals.</p>
                    )}
                </div>

                {/* Quick Actions / System Health */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card" style={{ padding: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Quick Actions</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <Link href="/admin/creators" className="btn btn-secondary" style={{ justifyContent: 'start' }}>All Creators</Link>
                            <Link href="/admin/cities" className="btn btn-secondary" style={{ justifyContent: 'start' }}>Manage Cities</Link>
                            <Link href="/dashboard" className="btn btn-secondary" style={{ justifyContent: 'start' }}>My Profile</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
