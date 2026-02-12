import { createClient } from '@/lib/supabaseServer'
import Link from 'next/link'

export default async function CreatorShowcase() {
    const supabase = await createClient()

    const { data: creators } = await supabase
        .from('creators')
        .select('*')
        .eq('status', 'approved')
        .limit(6)
        .order('profile_views', { ascending: false })

    if (!creators || creators.length === 0) return null

    return (
        <section style={{ padding: '6rem 1rem', background: '#FFFFFF' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem' }}>Top Viewed Creators</h2>
                    <p style={{ color: '#64748b' }}>Discover the most popular talent on our platform.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {creators.map((creator) => (
                        <div key={creator.id} className="card" style={{ padding: '1.5rem', textAlign: 'center', transition: 'transform 0.2s' }}>
                            {creator.profile_photo_url ? (
                                <img
                                    src={creator.profile_photo_url}
                                    alt={creator.full_name}
                                    style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem' }}
                                />
                            ) : (
                                <div style={{ width: 100, height: 100, borderRadius: '50%', backgroundColor: '#e2e8f0', margin: '0 auto 1rem' }}></div>
                            )}
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem', color: '#1e293b' }}>{creator.full_name}</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>{creator.city}, {creator.state}</p>

                            <Link href={`/creator/${creator.id}`} className="btn btn-secondary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem' }}>
                                View Profile
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
