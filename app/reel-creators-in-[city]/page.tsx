import { createClient } from '@/lib/supabaseServer'
import CreatorCard from '@/components/search/CreatorCard'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 3600 // Cache for 1 hour

interface Props {
    params: { city: string }
}

async function getCityData(slug: string) {
    const supabase = await createClient()

    // Clean slug: remove 'reel-creators-in-' prefix if present, but the folder name structure implies 
    // the param 'city' is just the part after 'reel-creators-in-'.
    // Wait, folder is `reel-creators-in-[city]`. 
    // Next.js params will catch the dynamic part.
    // If the URL is `/reel-creators-in-mumbai`, then `city` param is `mumbai`.

    // Try to find city in DB by slug
    const { data: cityData } = await supabase
        .from('cities')
        .select('*')
        .eq('seo_slug', slug)
        .single()

    return cityData
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { city } = await params
    const cityData = await getCityData(city)

    const cityName = cityData ? cityData.city_name : city.charAt(0).toUpperCase() + city.slice(1)

    return {
        title: `Best Reel Creators in ${cityName} | ReelCreator Network`,
        description: `Find top rated mobile reel creators in ${cityName} for your events. Verified professionals, transparent pricing, and direct contact.`,
    }
}

export default async function CityPage({ params }: Props) {
    const { city } = await params
    const supabase = await createClient()
    const cityData = await getCityData(city)

    if (!cityData) {
        // If city not found in DB, we can strictly 404 or just show generic content for the slug
        // For SEO, strictly finding it in DB is better, but for MVP fallback:
        // We will assume the slug IS the city name if not found in DB? 
        // Let's fallback to searching creators by the slug directly if DB entry missing.
    }

    const cityName = cityData ? cityData.city_name : city

    // Fetch approved creators in this city
    const { data: creators } = await supabase
        .from('creators')
        .select('*')
        .ilike('city', `%${cityName}%`)
        .eq('status', 'approved')

    return (
        <main className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
            <header style={{ marginBottom: '3rem', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                    Reel Creators in <span style={{ color: 'var(--secondary)' }}>{cityName}</span>
                </h1>
                {cityData?.intro_text ? (
                    <p style={{ fontSize: '1.125rem', lineHeight: '1.6', color: 'var(--muted-foreground)' }}>
                        {cityData.intro_text}
                    </p>
                ) : (
                    <p style={{ fontSize: '1.125rem', lineHeight: '1.6', color: 'var(--muted-foreground)' }}>
                        Discover the best content creators in {cityName}. Hire local experts for wedding reels, corporate events, and social media content.
                    </p>
                )}
            </header>

            <section>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Features Creators</h2>

                {creators && creators.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {creators.map((creator: any) => (
                            <CreatorCard key={creator.id} creator={creator} />
                        ))}
                    </div>
                ) : (
                    <div className="card" style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
                        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>We are still onboarding creators in {cityName}.</p>
                        <p>Are you a creator? <a href="/signup" style={{ color: 'var(--primary)', fontWeight: 600 }}>Join the network</a></p>
                    </div>
                )}
            </section>

            {cityData?.faq_content && (
                <section style={{ marginTop: '4rem' }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>Frequently Asked Questions</h2>
                    <div className="card">
                        {/* Render FAQ JSON - Schema assumed to be array of {question, answer} */}
                        {(cityData.faq_content as any[]).map((faq, i) => (
                            <div key={i} style={{ marginBottom: '1.5rem', borderBottom: i < (cityData.faq_content as any[]).length - 1 ? '1px solid var(--border)' : 'none', paddingBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{faq.question}</h3>
                                <p style={{ color: 'var(--muted-foreground)' }}>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    )
}
