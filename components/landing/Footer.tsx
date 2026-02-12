import Link from 'next/link'

export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#111827', color: '#f3f4f6', padding: '4rem 1rem', fontSize: '0.9rem' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>

                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>ReelCreator Network</h3>
                    <p style={{ color: '#9ca3af', lineHeight: 1.6 }}>
                        The trusted platform for finding verified mobile reel creators in India.
                    </p>
                </div>

                <div>
                    <h4 style={{ fontWeight: 600, marginBottom: '1rem', color: 'white' }}>Cities</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li><Link href="/reel-creators-in-ahmedabad" style={{ color: '#9ca3af' }}>Ahmedabad</Link></li>
                        <li><Link href="/reel-creators-in-surat" style={{ color: '#9ca3af' }}>Surat</Link></li>
                        <li><Link href="/reel-creators-in-vadodara" style={{ color: '#9ca3af' }}>Vadodara</Link></li>
                        <li><Link href="/reel-creators-in-rajkot" style={{ color: '#9ca3af' }}>Rajkot</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ fontWeight: 600, marginBottom: '1rem', color: 'white' }}>For Creators</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li><Link href="/auth/signup" style={{ color: '#9ca3af' }}>Join Now</Link></li>
                        <li><Link href="/auth/login" style={{ color: '#9ca3af' }}>Login</Link></li>
                        <li><Link href="/dashboard" style={{ color: '#9ca3af' }}>Dashboard</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ fontWeight: 600, marginBottom: '1rem', color: 'white' }}>Legal</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li><Link href="/privacy" style={{ color: '#9ca3af' }}>Privacy Policy</Link></li>
                        <li><Link href="/terms" style={{ color: '#9ca3af' }}>Terms of Service</Link></li>
                        <li><Link href="/contact" style={{ color: '#9ca3af' }}>Contact</Link></li>
                    </ul>
                </div>

            </div>
            <div style={{ textAlign: 'center', marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #1f2937', color: '#6b7280', fontSize: '0.8rem' }}>
                © {new Date().getFullYear()} ReelCreator Network. All rights reserved.
            </div>
        </footer>
    )
}
