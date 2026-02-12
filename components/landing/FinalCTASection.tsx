import Link from 'next/link'

export default function FinalCTASection() {
    return (
        <section style={{ padding: '6rem 1rem', background: 'var(--primary)', color: 'white', textAlign: 'center' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>
                    Ready to Find the Perfect <br /> Reel Creator?
                </h2>
                <p style={{ fontSize: '1.25rem', marginBottom: '3rem', opacity: 0.9 }}>
                    Join hundreds of others connecting daily.
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/search" className="btn" style={{
                        backgroundColor: 'var(--secondary)',
                        color: 'white',
                        padding: '1rem 2.5rem',
                        fontSize: '1.1rem',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        letterSpacing: '0.5px'
                    }}>
                        Find Creators
                    </Link>
                    <Link href="/dashboard" className="btn" style={{
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: '2px solid white',
                        padding: '1rem 2.5rem',
                        fontSize: '1.1rem',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        letterSpacing: '0.5px'
                    }}>
                        Create Free Profile
                    </Link>
                </div>
            </div>
        </section>
    )
}
