import Link from 'next/link'

export default function HeroSection() {
    return (
        <section style={{
            background: 'linear-gradient(135deg, #F9FAFC 0%, #EBF4FF 100%)',
            padding: '4rem 1rem 6rem',
            overflow: 'hidden'
        }}>
            <div className="container hero-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>

                {/* Left Content */}
                <div style={{ maxWidth: '600px' }}>
                    <div style={{
                        display: 'inline-block',
                        backgroundColor: '#e0e7ff',
                        color: 'var(--primary)',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        marginBottom: '1.5rem'
                    }}>
                        ✨ #1 Platform for Mobile Creators
                    </div>

                    <h1 className="hero-title" style={{
                        fontSize: '3.5rem',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        color: 'var(--primary)',
                        marginBottom: '1.5rem',
                        letterSpacing: '-1px'
                    }}>
                        Find Verified Mobile Reel Creators in Your City
                    </h1>

                    <p style={{
                        fontSize: '1.25rem',
                        color: '#4b5563',
                        marginBottom: '2.5rem',
                        lineHeight: 1.6
                    }}>
                        Discover talented reel creators for weddings, events, and celebrations — all in one trusted platform. No commissions. Direct contact.
                    </p>

                    <div className="hero-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link href="/search" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Find Creators
                        </Link>
                        <Link href="/dashboard" className="btn" style={{
                            padding: '1rem 2rem',
                            fontSize: '1.1rem',
                            backgroundColor: 'white',
                            color: 'var(--primary)',
                            border: '1px solid #e5e7eb',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Join as Creator
                        </Link>
                    </div>

                    <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem', color: '#6b7280', fontSize: '0.9rem', fontWeight: 500 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span style={{ color: 'var(--success)' }}>✓</span> 100% Free Platform
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span style={{ color: 'var(--success)' }}>✓</span> Verified Profiles
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span style={{ color: 'var(--success)' }}>✓</span> Direct Contact
                        </span>
                    </div>
                </div>

                {/* Right Visual (Image) */}
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    {/* Abstract Decorative elements */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '300px',
                        height: '300px',
                        background: 'linear-gradient(to bottom right, #FF8C32, #FFC480)',
                        borderRadius: '50%',
                        filter: 'blur(80px)',
                        opacity: 0.2,
                        zIndex: 0
                    }}></div>

                    <img
                        src="/images/hero-creator.png"
                        alt="Mobile Creator with Gimbal"
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                            maxHeight: '650px',
                            objectFit: 'contain',
                            position: 'relative',
                            zIndex: 1,
                            dropShadow: '0 20px 40px rgba(0,0,0,0.1)'
                        }}
                    />
                </div>
            </div>


        </section>
    )
}
