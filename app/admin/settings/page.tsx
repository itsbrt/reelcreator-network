'use client'

import { createClient } from '@/lib/supabaseClient'
import { useState, useEffect } from 'react'

export default function AdminSettingsPage() {
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    // Settings State
    const [bannerText, setBannerText] = useState('')
    const [bannerActive, setBannerActive] = useState(false)

    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase
                .from('site_settings')
                .select('*')
                .eq('key', 'homepage_banner')
                .single()

            if (data && data.value) {
                setBannerText(data.value.text || '')
                setBannerActive(data.value.active || false)
            }
            setLoading(false)
        }
        fetchSettings()
    }, [supabase])

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setMessage(null)

        const value = { text: bannerText, active: bannerActive }

        const { error } = await supabase
            .from('site_settings')
            .upsert({ key: 'homepage_banner', value })

        if (error) {
            setMessage('Error: ' + error.message)
        } else {
            setMessage('Settings saved successfully!')
        }
        setSaving(false)
    }

    if (loading) return <div>Loading settings...</div>

    return (
        <div style={{ maxWidth: '800px' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1e293b' }}>Site Settings</h1>
                <p style={{ color: '#64748b' }}>Manage global configurations</p>
            </header>

            <form onSubmit={handleSave} className="card">
                <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Homepage Banner</h2>

                {message && (
                    <div style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: '4px', background: message.includes('Error') ? '#ffebee' : '#e8f5e9', color: message.includes('Error') ? '#c62828' : '#2e7d32', border: `1px solid ${message.includes('Error') ? '#ffcdd2' : '#c8e6c9'}` }}>
                        {message}
                    </div>
                )}

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="label">Banner Text</label>
                    <input className="input" value={bannerText} onChange={(e) => setBannerText(e.target.value)} placeholder="Announce something new..." />
                </div>

                <div className="form-group" style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={bannerActive}
                            onChange={(e) => setBannerActive(e.target.checked)}
                            style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--primary)' }}
                        />
                        <span style={{ fontWeight: 500 }}>Enable Banner on Homepage</span>
                    </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    )
}
