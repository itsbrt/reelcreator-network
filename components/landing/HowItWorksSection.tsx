import { MapPin, Users, MessageCircle } from 'lucide-react'

export default function HowItWorksSection() {
    const steps = [
        {
            icon: <MapPin size={32} />,
            title: 'Search by City',
            desc: 'Find creators near you instantly. Filter by location and event type.'
        },
        {
            icon: <Users size={32} />,
            title: 'Compare Profiles',
            desc: 'View portfolios, pricing, and read reviews from past clients.'
        },
        {
            icon: <MessageCircle size={32} />,
            title: 'Contact Directly',
            desc: 'Connect via WhatsApp or Instagram. No middleman, no hidden fees.'
        }
    ]

    return (
        <section style={{ padding: '6rem 1rem', background: 'white' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem', letterSpacing: '-0.5px' }}>How It Works</h2>
                    <p style={{ color: '#64748b', fontSize: '1.2rem' }}>A simple, transparent process to find your perfect creator.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                    {steps.map((step, index) => (
                        <div key={index} style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                backgroundColor: 'var(--primary)',
                                color: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                boxShadow: '0 10px 25px -5px rgba(30, 42, 120, 0.4)'
                            }}>
                                {step.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b' }}>{step.title}</h3>
                            <p style={{ color: '#64748b', lineHeight: 1.6 }}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
