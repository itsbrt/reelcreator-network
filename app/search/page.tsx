import { createClient } from '@/lib/supabaseServer'
import CreatorCard from '@/components/search/CreatorCard'
import SearchFilters from '@/components/search/SearchFilters'

export const revalidate = 0

export default async function SearchPage({
    searchParams,
}: {
    searchParams: { city?: string; type?: string; state?: string }
}) {
    const supabase = await createClient()

    const { city, type, state } = await searchParams

    let query = supabase
        .from('creators')
        .select('*')
        .eq('status', 'approved')

    // Filter Logic
    // 1. If State is selected, filter by state
    if (state) {
        query = query.eq('state', state)
    }

    // 2. If City is selected, filter by city (more specific)
    if (city) {
        query = query.ilike('city', `%${city}%`)
    }

    if (type) {
        query = query.contains('services_offered', [type])
    }

    const { data: creators, error } = await query

    return (
        <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Find Reel Creators</h1>

                <SearchFilters initialCity={city} initialState={state} initialType={type} />
            </div>

            {error ? (
                <div style={{ color: 'red' }}>Error loading creators: {error.message}</div>
            ) : creators && creators.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {creators.map((creator: any) => (
                        <CreatorCard key={creator.id} creator={creator} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--muted-foreground)' }}>
                    <p style={{ fontSize: '1.25rem' }}>No creators found matching your criteria.</p>
                    <p>Try clearing filters or searching for a different location.</p>
                </div>
            )}
        </main>
    )
}
