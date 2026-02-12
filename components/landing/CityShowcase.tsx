import Link from 'next/link'

export default function CityShowcase() {
    const cities = ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Mumbai"]

    return (
        <section style={{ padding: '6rem 1rem', background: '#F9FAFC' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem' }}>Explore by City</h2>
                    <p style={{ color: '#64748b' }}>Find local talent in your area.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    {cities.map((city) => (
                        <Link key={city} href={`/reel-creators-in-${city.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: 'white',
                                padding: '2rem',
                                borderRadius: '12px',
                                border: '1px solid #e5e7eb',
                                textAlign: 'center',
                                transition: 'all 0.2s',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b' }}>{city}</h3>
                                {city === 'Mumbai' && <span style={{ fontSize: '0.75rem', color: '#FF8C32', fontWeight: 600 }}>Coming Soon</span>}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
