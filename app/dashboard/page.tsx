import { createClient } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'
import ProfileForm from '@/components/dashboard/ProfileForm'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h1 style={{ marginBottom: '2rem', color: 'var(--primary)' }}>Creator Dashboard</h1>
            <ProfileForm user={user} />
        </main>
    );
}
