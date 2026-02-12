import { createClient } from '@/lib/supabaseServer'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const revalidate = 0

export default async function AdminCitiesPage() {
    const supabase = await createClient()

    // Fetch cities with creator counts
    // Note: Supabase doesn't support simple joins for count in one go easily without foreign keys or views, 
    // but we can query creators and aggregate manually or use a view. 
    // For MVP, we'll fetch cities and just show them. 
    // Ideally we would have a view `city_stats` or similar.
    // Let's just fetch cities for now.

    const { data: cities, error } = await supabase
        .from('cities')
        .select('*')
        .order('city_name')

    return (
        <div>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1e293b' }}>Manage Cities</h1>
                    <p style={{ color: '#64748b' }}>SEO landing pages and locations</p>
                </div>
                <Link href="/admin/cities/new" className="btn btn-primary">
                    + Add New City
                </Link>
            </header>

            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                            <th style={{ padding: '1rem' }}>City Name</th>
                            <th style={{ padding: '1rem' }}>State</th>
                            <th style={{ padding: '1rem' }}>Slug</th>
                            <th style={{ padding: '1rem' }}>SEO Title</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities && cities.length > 0 ? (
                            cities.map((city) => (
                                <tr key={city.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>{city.city_name}</td>
                                    <td style={{ padding: '1rem' }}>{city.state_name}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <code style={{ backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>
                                            {city.seo_slug}
                                        </code>
                                    </td>
                                    <td style={{ padding: '1rem', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {city.seo_title || '-'}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                            <Link href={`/admin/cities/${city.id}`} className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Edit</Link>

                                            <form action={async () => {
                                                'use server'
                                                const sb = await createClient()
                                                await sb.from('cities').delete().eq('id', city.id)
                                                redirect('/admin/cities')
                                            }}>
                                                <button
                                                    className="btn btn-secondary"
                                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', color: '#b91c1c', borderColor: '#fee2e2' }}
                                                // Add confirmation in a real app
                                                >
                                                    Delete
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>No cities found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
