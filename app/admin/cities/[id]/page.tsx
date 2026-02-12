import { createClient } from '@/lib/supabaseServer'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const revalidate = 0

// This would ideally be a client component for better interactivity, 
// using Server Actions for submission.
import CityEditForm from '@/components/admin/CityEditForm'

export default async function AdminCityEditPage({ params }: { params: { id: string } }) {
    const supabase = await createClient()

    const { data: city, error } = await supabase
        .from('cities')
        .select('*')
        .eq('id', params.id)
        .single()

    if (!city || error) {
        return <div>City not found.</div>
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem' }}>
                <Link href="/admin/cities" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    ← Back to Cities
                </Link>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1e293b' }}>Edit City: {city.city_name}</h1>
            </header>

            <CityEditForm city={city} />
        </div>
    )
}
