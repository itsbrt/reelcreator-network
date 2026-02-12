import CreatorRegistrationForm from '@/components/auth/CreatorRegistrationForm'
import Link from 'next/link'

export default function Signup() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Simple Header for Signup Flow */}
            <header style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', background: 'white', textAlign: 'center' }}>
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', textDecoration: 'none' }}>
                    ReelCreator <span style={{ color: 'var(--secondary)' }}>Network</span>
                </Link>
            </header>

            <div style={{ flex: 1, background: '#f8fafc', padding: '3rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <div style={{ width: '100%', maxWidth: '800px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>Join as a Reel Creator</h1>
                        <p style={{ color: '#64748b' }}>Complete your profile to start getting inquiries today.</p>
                    </div>

                    <CreatorRegistrationForm />

                    <div style={{ textAlign: 'center', marginTop: '2rem', color: '#64748b' }}>
                        Already have an account? <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Login here</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
