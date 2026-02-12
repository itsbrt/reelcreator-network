'use client'

import { createClient } from '@/lib/supabaseClient'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CityEditForm({ city }: { city: any }) {
    const supabase = createClient()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        city_name: city.city_name,
        state_name: city.state_name,
        seo_slug: city.seo_slug,
        intro_text: city.intro_text || '',
        seo_title: city.seo_title || '',
        meta_description: city.meta_description || ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        const { error } = await supabase
            .from('cities')
            .update(formData)
            .eq('id', city.id)

        if (error) {
            setMessage('Error: ' + error.message)
            setLoading(false)
        } else {
            setMessage('City updated successfully!')
            setLoading(false)
            router.refresh()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="card">
            {message && (
                <div style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: '4px', background: message.includes('Error') ? '#ffebee' : '#e8f5e9', color: message.includes('Error') ? '#c62828' : '#2e7d32', border: `1px solid ${message.includes('Error') ? '#ffcdd2' : '#c8e6c9'}` }}>
                    {message}
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                    <label className="label">City Name</label>
                    <input className="input" name="city_name" value={formData.city_name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="label">State Name</label>
                    <input className="input" name="state_name" value={formData.state_name} onChange={handleChange} required />
                </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="label">SEO Slug</label>
                <input className="input" name="seo_slug" value={formData.seo_slug} onChange={handleChange} required />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="label">SEO Title</label>
                <input className="input" name="seo_title" value={formData.seo_title} onChange={handleChange} />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="label">Meta Description</label>
                <textarea className="input" name="meta_description" value={formData.meta_description} onChange={handleChange} rows={2} />
            </div>

            <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label className="label">Intro Text (Markdown/HTML supported)</label>
                <textarea className="input" name="intro_text" value={formData.intro_text} onChange={handleChange} rows={10} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    )
}
