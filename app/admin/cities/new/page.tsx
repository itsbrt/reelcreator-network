'use client'

import { createClient } from '@/lib/supabaseClient'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewCityPage() {
    const supabase = createClient()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        city_name: '',
        state_name: '',
        seo_slug: '',
        intro_text: '',
        seo_title: '',
        meta_description: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => {
            const updates = { ...prev, [name]: value }
            // Auto-generate slug from city name if slug is empty
            if (name === 'city_name' && !prev.seo_slug) {
                updates.seo_slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            }
            return updates
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        const { error } = await supabase.from('cities').insert([formData])

        if (error) {
            setMessage('Error: ' + error.message)
            setLoading(false)
        } else {
            router.push('/admin/cities')
            router.refresh()
        }
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem' }}>
                <Link href="/admin/cities" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    ← Back to Cities
                </Link>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1e293b' }}>Add New City</h1>
            </header>

            <form onSubmit={handleSubmit} className="card">
                {message && (
                    <div style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: '4px', background: '#ffebee', color: '#c62828', border: '1px solid #ffcdd2' }}>
                        {message}
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="form-group">
                        <label className="label">City Name</label>
                        <input className="input" name="city_name" value={formData.city_name} onChange={handleChange} required placeholder="e.g. Mumbai" />
                    </div>
                    <div className="form-group">
                        <label className="label">State Name</label>
                        <input className="input" name="state_name" value={formData.state_name} onChange={handleChange} required placeholder="e.g. Maharashtra" />
                    </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="label">SEO Slug</label>
                    <input className="input" name="seo_slug" value={formData.seo_slug} onChange={handleChange} required placeholder="mumbai" />
                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>Used in URL: /reel-creators-in-[slug]</p>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="label">SEO Title</label>
                    <input className="input" name="seo_title" value={formData.seo_title} onChange={handleChange} placeholder="Best Reel Creators in Mumbai | ReelCreator Network" />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="label">Meta Description</label>
                    <textarea className="input" name="meta_description" value={formData.meta_description} onChange={handleChange} rows={2} placeholder="Find top-rated Instagram Reel creators in Mumbai..." />
                </div>

                <div className="form-group" style={{ marginBottom: '2rem' }}>
                    <label className="label">Intro Text (Markdown/HTML supported)</label>
                    <textarea className="input" name="intro_text" value={formData.intro_text} onChange={handleChange} rows={5} placeholder="Welcome to the Mumbai creator hub..." />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <Link href="/admin/cities" className="btn btn-secondary">Cancel</Link>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Creating...' : 'Create City'}
                    </button>
                </div>
            </form>
        </div>
    )
}
