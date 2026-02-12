import { createClient } from '@/lib/supabaseServer'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const revalidate = 0

export default async function AdminCreatorsPage({
    searchParams,
}: {
    searchParams: { status?: string, q?: string }
}) {
    const supabase = await createClient()
    const statusFilter = searchParams.status || 'all'
    const searchQuery = searchParams.q || ''

    let query = supabase
        .from('creators')
        .select('*')
        .order('created_at', { ascending: false })

    if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter)
    }

    if (searchQuery) {
        query = query.ilike('full_name', `%${searchQuery}%`)
    }

    const { data: creators, error } = await query

    return (
        <div>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1e293b' }}>Manage Creators</h1>
                    <p style={{ color: '#64748b' }}>View and manage all creator profiles</p>
                </div>
            </header>

            {/* Filters */}
            <div className="card" style={{ padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <form style={{ display: 'flex', gap: '1rem', flex: 1 }}>
                    <input
                        name="q"
                        defaultValue={searchQuery}
                        placeholder="Search by name..."
                        className="input"
                        style={{ maxWidth: '300px' }}
                    />
                    <select
                        name="status"
                        defaultValue={statusFilter}
                        className="input"
                        style={{ maxWidth: '150px' }}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <button type="submit" className="btn btn-primary">Filter</button>
                    {/* Reset Button */}
                    {(statusFilter !== 'all' || searchQuery) && (
                        <Link href="/admin/creators" className="btn btn-secondary">Reset</Link>
                    )}
                </form>
            </div>

            {/* Data Table */}
            <div className="card" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                            <th style={{ padding: '1rem' }}>Creator</th>
                            <th style={{ padding: '1rem' }}>Location</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Views</th>
                            <th style={{ padding: '1rem' }}>Joined</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {creators && creators.length > 0 ? (
                            creators.map((creator) => (
                                <tr key={creator.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            {creator.profile_photo_url ? (
                                                <img src={creator.profile_photo_url} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#cbd5e1' }}></div>
                                            )}
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 600 }}>{creator.full_name}</span>
                                                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{creator.email}</span>
                                            </div>
                                            {creator.featured && (
                                                <span style={{ fontSize: '0.7rem', backgroundColor: '#fef3c7', color: '#d97706', padding: '2px 6px', borderRadius: '4px' }}>Featured</span>
                                            )}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>{creator.city}, {creator.state}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            backgroundColor: creator.status === 'approved' ? '#dcfce7' : creator.status === 'rejected' ? '#fee2e2' : '#ffedd5',
                                            color: creator.status === 'approved' ? '#15803d' : creator.status === 'rejected' ? '#b91c1c' : '#c2410c',
                                        }}>
                                            {creator.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>{creator.profile_views || 0}</td>
                                    <td style={{ padding: '1rem', color: '#64748b' }}>
                                        {new Date(creator.created_at).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                            {/* Approve Action */}
                                            {creator.status !== 'approved' && (
                                                <form action={async () => {
                                                    'use server'
                                                    const sb = await createClient()
                                                    await sb.from('creators').update({ status: 'approved' }).eq('id', creator.id)
                                                    // Log action (mock for now, or insert if logs table exists)
                                                    redirect('/admin/creators')
                                                }}>
                                                    <button className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', backgroundColor: '#16a34a' }}>Approve</button>
                                                </form>
                                            )}

                                            {/* Reject Action */}
                                            {creator.status !== 'rejected' && (
                                                <form action={async () => {
                                                    'use server'
                                                    const sb = await createClient()
                                                    await sb.from('creators').update({ status: 'rejected' }).eq('id', creator.id)
                                                    redirect('/admin/creators')
                                                }}>
                                                    <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', color: '#b91c1c', borderColor: '#fee2e2' }}>Reject</button>
                                                </form>
                                            )}

                                            <Link href={`/creator/${creator.id}`} className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>View</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>No creators found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
