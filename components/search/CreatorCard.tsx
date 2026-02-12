import Link from 'next/link'
import { User, Phone } from 'lucide-react'

interface Creator {
    id: string
    full_name: string
    profile_photo_url: string | null
    city: string
    services_offered: string[]
    pricing_min: number | null
    pricing_max: number | null
    average_rating: number
}

export default function CreatorCard({ creator }: { creator: Creator }) {
    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                {creator.profile_photo_url ? (
                    <img
                        src={creator.profile_photo_url}
                        alt={creator.full_name}
                        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                ) : (
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User style={{ color: 'var(--muted-foreground)' }} />
                    </div>
                )}
                <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '0.25rem' }}>
                        {creator.full_name}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>{creator.city}</p>
                </div>
            </div>

            <div style={{ marginBottom: '1rem', flex: 1 }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Services:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {creator.services_offered?.slice(0, 3).map((service) => (
                        <span key={service} style={{ fontSize: '0.75rem', backgroundColor: '#e0f7fa', color: '#006064', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                            {service}
                        </span>
                    ))}
                    {creator.services_offered?.length > 3 && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', padding: '0.25rem 0.5rem' }}>
                            +{creator.services_offered.length - 3} more
                        </span>
                    )}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                    {creator.pricing_min ? `₹${creator.pricing_min.toLocaleString()}` : 'Contact for price'}
                    {creator.pricing_max && ` - ₹${creator.pricing_max.toLocaleString()}`}
                </div>
                <Link href={`/creator/${creator.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    View Profile
                </Link>
            </div>
        </div>
    )
}
