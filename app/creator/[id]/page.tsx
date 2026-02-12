import { createClient } from '@/lib/supabaseServer'
import { notFound } from 'next/navigation'
import { Phone, Instagram, MapPin, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface Props {
    params: { id: string }
}

export async function generateMetadata({ params }: Props) {
    const { id } = await params
    const supabase = await createClient()
    const { data: creator } = await supabase.from('creators').select('full_name, bio').eq('id', id).single()

    if (!creator) return { title: 'Creator Not Found' }

    return {
        title: `${creator.full_name} - Reel Creator | ReelCreator Network`,
        description: creator.bio?.substring(0, 160) || `Hire ${creator.full_name} for your next reel.`,
    }
}

export default async function CreatorProfilePage({ params }: Props) {
    const { id } = await params
    const supabase = await createClient()

    // Increment view count
    await supabase.rpc('increment_view_count', { row_id: id })

    const { data: creator } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()

    if (!creator) {
        notFound()
    }

    // Helper to determine video type
    const getVideoType = (url: string) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube'
        if (url.includes('instagram.com')) return 'instagram'
        return 'other'
    }

    const getYoutubeEmbed = (url: string) => {
        let videoId = ''
        if (url.includes('youtu.be')) {
            videoId = url.split('youtu.be/')[1].split('?')[0]
        } else if (url.includes('youtube.com/watch')) {
            videoId = new URL(url).searchParams.get('v') || ''
        } else if (url.includes('youtube.com/shorts')) {
            videoId = url.split('shorts/')[1].split('?')[0]
        }
        return `https://www.youtube.com/embed/${videoId}`
    }

    return (
        <main style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* Header / Cover */}
            <div style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                height: '200px',
                position: 'relative'
            }}>
            </div>

            <div className="container" style={{ position: 'relative', marginTop: '-100px' }}>
                <div className="card" style={{ maxWidth: '1000px', margin: '0 auto', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}>
                    {/* Profile Header */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
                        <div style={{ position: 'relative' }}>
                            {creator.profile_photo_url ? (
                                <img
                                    src={creator.profile_photo_url}
                                    alt={creator.full_name}
                                    style={{ width: '160px', height: '160px', borderRadius: '50%', objectFit: 'cover', border: '5px solid white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', backgroundColor: 'white' }}
                                />
                            ) : (
                                <div style={{ width: '160px', height: '160px', borderRadius: '50%', backgroundColor: 'var(--muted)', border: '5px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: '#94a3b8' }}>
                                    {creator.full_name.charAt(0)}
                                </div>
                            )}
                            {creator.verified && (
                                <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'white', borderRadius: '50%', padding: '2px' }}>
                                    <CheckCircle size={24} color="var(--secondary)" fill="var(--secondary)" stroke="white" strokeWidth={2} />
                                </div>
                            )}
                        </div>

                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1e293b', marginTop: '1rem', marginBottom: '0.25rem' }}>
                            {creator.full_name}
                        </h1>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '1.1rem' }}>
                            <MapPin size={20} />
                            <span>{creator.city}, {creator.state}</span>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                            {creator.instagram_url && (
                                <a
                                    href={creator.instagram_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn"
                                    style={{ backgroundColor: '#fff0f5', color: '#E1306C', display: 'flex', gap: '0.5rem', alignItems: 'center', border: '1px solid #fce7f3' }}
                                >
                                    <Instagram size={20} />
                                    Instagram
                                </a>
                            )}
                            {creator.whatsapp_number && (
                                <a
                                    href={`https://wa.me/${creator.whatsapp_number}?text=Hi ${creator.full_name}, I saw your profile on ReelCreator Network.`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn"
                                    style={{ backgroundColor: '#f0fdf4', color: '#16a34a', display: 'flex', gap: '0.5rem', alignItems: 'center', border: '1px solid #dcfce7' }}
                                >
                                    <Phone size={20} />
                                    WhatsApp
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>

                        {/* 1. Stats / Quick Info */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', fontWeight: 600, marginBottom: '0.5rem' }}>Pricing Starts At</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>
                                    {creator.pricing_min ? `₹${creator.pricing_min.toLocaleString()}` : 'Contact'}
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', fontWeight: 600, marginBottom: '0.5rem' }}>Experience</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>
                                    {creator.experience_years ? `${creator.experience_years} Years` : 'N/A'}
                                </div>
                            </div>
                        </div>

                        {/* 2. Portfolio */}
                        {creator.portfolio_urls && creator.portfolio_urls.length > 0 && (
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    Featured Work <span style={{ fontSize: '1rem', background: '#e0e7ff', color: 'var(--primary)', padding: '2px 8px', borderRadius: '12px' }}>{creator.portfolio_urls.length}</span>
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                    {creator.portfolio_urls.map((url: string, index: number) => {
                                        const type = getVideoType(url)
                                        return (
                                            <div key={index} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', background: 'white' }}>
                                                {type === 'youtube' ? (
                                                    <iframe
                                                        src={getYoutubeEmbed(url)}
                                                        style={{ width: '100%', aspectRatio: '16/9', border: 'none' }}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                ) : (
                                                    <div style={{ padding: '2rem', textAlign: 'center' }}>
                                                        <Instagram size={48} color="#E1306C" style={{ marginBottom: '1rem' }} />
                                                        <p style={{ marginBottom: '1rem', color: '#64748b' }}>View this Reel on Instagram</p>
                                                        <a
                                                            href={url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#E1306C', color: 'white', textDecoration: 'none', borderRadius: '6px', fontSize: '0.9rem' }}
                                                        >
                                                            Watch on Instagram
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* 3. Services & Bio */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>About Creator</h3>
                                <p style={{ lineHeight: '1.8', color: '#475569', fontSize: '1.05rem' }}>
                                    {creator.bio || 'This creator hasn\'t added a bio yet.'}
                                </p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Services Offered</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                    {creator.services_offered?.map((service: string) => (
                                        <span key={service} style={{
                                            backgroundColor: 'white', border: '1px solid #e2e8f0', color: '#1e293b',
                                            padding: '0.6rem 1rem', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 500
                                        }}>
                                            {service}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
}
