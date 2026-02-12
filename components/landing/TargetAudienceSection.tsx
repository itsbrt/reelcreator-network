import Link from 'next/link'

export default function TargetAudienceSection() {
    return (
        <section style={{ padding: '6rem 1rem', background: '#F9FAFC' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>

                    {/* Customer Card */}
                    <div className="card" style={{ padding: '3rem', borderLeft: '5px solid var(--primary)', maxWidth: '100%' }}>
                        <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', color: '#1e293b' }}>
                            Find the Right <br /> Reel Creator
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {['Weddings', 'Birthday Celebrations', 'Garba Nights', 'Corporate Events', 'Product Launches'].map(item => (
                                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem', color: '#4b5563' }}>
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--secondary)' }}></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link href="/search" className="btn btn-primary" style={{ width: '100%' }}>
                            Explore Creators
                        </Link>
                    </div>

                    {/* Creator Card */}
                    <div className="card" style={{ padding: '3rem', borderLeft: '5px solid var(--secondary)', maxWidth: '100%' }}>
                        <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', color: '#1e293b' }}>
                            Grow Your <br /> Creative Career
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {['Showcase Your Portfolio', 'Get City-Based Visibility', 'Receive Direct Inquiries', 'Build Personal Brand', 'Zero Commission Fees'].map(item => (
                                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem', color: '#4b5563' }}>
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--primary)' }}></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link href="/dashboard" className="btn btn-secondary" style={{ width: '100%' }}>
                            Create Free Profile
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}
