import { ShieldCheck, MapPin, Calendar, DollarSign, MessageCircle, Smartphone } from 'lucide-react'

export default function FeatureGrid() {
    const features = [
        {
            icon: <ShieldCheck size={28} />,
            title: 'Verified Profiles',
            desc: 'Every creator is manually reviewed to ensure quality and trust.',
            color: '#4f46e5',
            bg: '#eef2ff'
        },
        {
            icon: <MapPin size={28} />,
            title: 'City-Based Search',
            desc: 'Find local talent in your city instantly. No travel fees, no hassle.',
            color: '#0ea5e9',
            bg: '#e0f2fe'
        },
        {
            icon: <Calendar size={28} />,
            title: 'Event-Specific',
            desc: 'Specialists for weddings, corporate events, parties, and shoots.',
            color: '#ec4899',
            bg: '#fce7f3'
        },
        {
            icon: <DollarSign size={28} />,
            title: 'Transparent Pricing',
            desc: 'See starting rates upfront. No hidden commissions.',
            color: '#16a34a',
            bg: '#dcfce7'
        },
        {
            icon: <MessageCircle size={28} />,
            title: 'Direct WhatsApp',
            desc: 'Chat directly with creators to discuss requirements.',
            color: '#25D366',
            bg: '#dcfce7'
        },
        {
            icon: <Smartphone size={28} />,
            title: 'Mobile-First',
            desc: 'A platform built for the vertical video era.',
            color: '#f59e0b',
            bg: '#fef3c7'
        },
    ]

    return (
        <section style={{ padding: '6rem 1rem', background: '#f8fafc' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem', letterSpacing: '-0.5px' }}>Why Choose Us?</h2>
                    <p style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>We are building the largest network of trusted reel creators.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {features.map((feature, i) => (
                        <div key={i} className="card feature-card" style={{
                            padding: '2rem',
                            borderRadius: '16px',
                            border: '1px solid rgba(0,0,0,0.05)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                            cursor: 'default',
                            maxWidth: '100%',
                            background: 'white'
                        }}
                        >
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '12px',
                                background: feature.bg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: feature.color,
                                marginBottom: '1.5rem'
                            }}>
                                {feature.icon}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b' }}>{feature.title}</h3>
                            <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem' }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
