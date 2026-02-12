'use client'

import { createClient } from '@/lib/supabaseClient'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfileForm({ user }: { user: any }) {
    const supabase = createClient()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [profile, setProfile] = useState<any>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [status, setStatus] = useState<string | null>(null)

    // Form Fields
    const [fullName, setFullName] = useState('')
    const [bio, setBio] = useState('')
    const [city, setCity] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [instagram, setInstagram] = useState('')
    const [priceMin, setPriceMin] = useState('')
    const [priceMax, setPriceMax] = useState('')
    const [services, setServices] = useState<string[]>([])
    const [states, setStates] = useState<string[]>([])
    const [cities, setCities] = useState<any[]>([])
    const [selectedState, setSelectedState] = useState('')
    const [portfolioUrls, setPortfolioUrls] = useState<string[]>([''])

    const AVAILABLE_SERVICES = [
        'Wedding Reels', 'Corporate Events', 'Fashion Shoots',
        'Product Videography', 'Travel Vlogs', 'Food Vlogs',
        'Music Videos', 'Short Films'
    ]

    // 1. Fetch available locations (Cities & States)
    useEffect(() => {
        const fetchLocations = async () => {
            const { data } = await supabase
                .from('cities')
                .select('city_name, state_name')
                .order('city_name')

            if (data) {
                setCities(data)
                const uniqueStates = Array.from(new Set(data.map(c => c.state_name))).sort() as string[]
                setStates(uniqueStates)
            }
        }
        fetchLocations()
    }, [supabase])

    // 2. Fetch User Profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data, error } = await supabase
                    .from('creators')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                if (error && error.code !== 'PGRST116') {
                    console.error('Error fetching profile:', error)
                }

                if (data) {
                    setProfile(data)
                    setFullName(data.full_name || '')
                    setBio(data.bio || '')
                    setCity(data.city || '')
                    setSelectedState(data.state || '')
                    setWhatsapp(data.whatsapp_number || '')
                    setInstagram(data.instagram_url || '')
                    setPriceMin(data.pricing_min?.toString() || '')
                    setPriceMax(data.pricing_max?.toString() || '')
                    setServices(data.services_offered || [])
                    setPortfolioUrls(data.portfolio_urls && data.portfolio_urls.length > 0 ? data.portfolio_urls : [''])
                    setStatus(data.status)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [user, supabase])

    // 3. Update selected state if profile city is loaded
    useEffect(() => {
        if (city && cities.length > 0 && !selectedState) {
            const cityObj = cities.find(c => c.city_name === city)
            if (cityObj) {
                setSelectedState(cityObj.state_name)
            }
        }
    }, [city, cities, selectedState])


    const handleServiceChange = (service: string) => {
        if (services.includes(service)) {
            setServices(services.filter(s => s !== service))
        } else {
            setServices([...services, service])
        }
    }

    const handlePortfolioChange = (index: number, value: string) => {
        const newUrls = [...portfolioUrls]
        newUrls[index] = value
        setPortfolioUrls(newUrls)
    }

    const addPortfolioUrl = () => {
        setPortfolioUrls([...portfolioUrls, ''])
    }

    const removePortfolioUrl = (index: number) => {
        const newUrls = portfolioUrls.filter((_, i) => i !== index)
        setPortfolioUrls(newUrls.length > 0 ? newUrls : [''])
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setMessage(null)

        // Determine new status
        let newStatus = status
        if (!status || status === 'rejected') {
            newStatus = 'pending'
        }

        const cleanPortfolioUrls = portfolioUrls.filter(url => url.trim() !== '')

        const updates = {
            id: user.id,
            full_name: fullName,
            bio,
            city,
            state: selectedState,
            whatsapp_number: whatsapp,
            instagram_url: instagram,
            pricing_min: priceMin ? parseInt(priceMin) : null,
            pricing_max: priceMax ? parseInt(priceMax) : null,
            services_offered: services,
            portfolio_urls: cleanPortfolioUrls,
            updated_at: new Date().toISOString(),
            status: newStatus,
        }

        const { error } = await supabase.from('creators').upsert(updates)

        if (error) {
            setMessage('Error updating profile: ' + error.message)
        } else {
            setStatus(newStatus)
            if (newStatus === 'pending') {
                setMessage('Profile submitted for approval! We will review it shortly.')
            } else {
                setMessage('Profile updated successfully!')
            }
            router.refresh()
        }
        setSaving(false)
    }

    if (loading) return <div>Loading profile...</div>

    const filteredCities = cities.filter(c => c.state_name === selectedState)

    return (
        <form onSubmit={handleSubmit} className="card" style={{ maxWidth: '800px' }}>
            {/* Header with Status Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0, color: 'var(--primary)' }}>Edit Your Profile</h2>
                <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    backgroundColor: status === 'approved' ? '#e8f5e9' : status === 'rejected' ? '#ffebee' : '#fff3e0',
                    color: status === 'approved' ? '#2e7d32' : status === 'rejected' ? '#c62828' : '#ef6c00',
                    border: `1px solid ${status === 'approved' ? '#a5d6a7' : status === 'rejected' ? '#ef9a9a' : '#ffcc80'}`
                }}>
                    {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'New'}
                </span>
            </div>

            {/* Status Feedback Banner */}
            {(!status || status === 'pending' || status === 'rejected') && (
                <div style={{
                    padding: '1rem',
                    marginBottom: '2rem',
                    borderRadius: '8px',
                    backgroundColor: status === 'rejected' ? '#fee2e2' : '#fff7ed',
                    border: `1px solid ${status === 'rejected' ? '#fecaca' : '#fed7aa'}`,
                    color: status === 'rejected' ? '#991b1b' : '#9a3412'
                }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {status === 'rejected' ? '❌ Profile Rejected' : '⏳ Awaiting Approval'}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>
                        {status === 'rejected'
                            ? "Your profile was not approved. Please review our guidelines, update your details, and resubmit."
                            : "Your profile is currently under review. It will be visible in search results once approved."}
                    </p>
                </div>
            )}

            {message && (
                <div style={{ padding: '1rem', marginBottom: '1rem', borderRadius: '4px', background: message.includes('Error') ? '#ffebee' : '#e8f5e9', color: message.includes('Error') ? '#c62828' : '#2e7d32', border: message.includes('Error') ? '1px solid #ffcdd2' : '1px solid #c8e6c9' }}>
                    {message}
                </div>
            )}

            {/* Section 1: Personal Details */}
            <div className="form-section" style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--foreground)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Personal Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div className="form-group">
                        <label className="label">Full Name</label>
                        <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label className="label">Profile Photo</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {profile?.profile_photo_url && (
                                <img
                                    src={profile.profile_photo_url}
                                    alt="Profile"
                                    style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    if (!e.target.files || e.target.files.length === 0) return
                                    const file = e.target.files[0]
                                    const fileExt = file.name.split('.').pop()
                                    const fileName = `${user.id}-${Math.random()}.${fileExt}`
                                    const filePath = `${fileName}`

                                    setSaving(true)
                                    const { error: uploadError } = await supabase.storage
                                        .from('profiles')
                                        .upload(filePath, file)

                                    if (uploadError) {
                                        setMessage('Error uploading image: ' + uploadError.message)
                                        setSaving(false)
                                        return
                                    }

                                    const { data: { publicUrl } } = supabase.storage
                                        .from('profiles')
                                        .getPublicUrl(filePath)

                                    const { error: updateError } = await supabase
                                        .from('creators')
                                        .update({ profile_photo_url: publicUrl })
                                        .eq('id', user.id)

                                    if (updateError) {
                                        setMessage('Error updating profile photo: ' + updateError.message)
                                    } else {
                                        setMessage('Profile photo updated!')
                                        setProfile({ ...profile, profile_photo_url: publicUrl })
                                        router.refresh()
                                    }
                                    setSaving(false)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Location */}
            <div className="form-section" style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--foreground)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Location</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div className="form-group">
                        <label className="label">State</label>
                        <select
                            className="input"
                            value={selectedState}
                            onChange={(e) => {
                                setSelectedState(e.target.value)
                                setCity('') // Reset city when state changes
                            }}
                            required
                        >
                            <option value="">Select State</option>
                            {states.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="label">City</label>
                        <select
                            className="input"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            disabled={!selectedState}
                        >
                            <option value="">Select City</option>
                            {filteredCities.map(c => (
                                <option key={c.city_name} value={c.city_name}>{c.city_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Section 3: About & Contact */}
            <div className="form-section" style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--foreground)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>About & Contact</h3>
                <div className="form-group">
                    <label className="label">Bio</label>
                    <textarea
                        className="input"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={4}
                        style={{ resize: 'vertical' }}
                        placeholder="Tell us about your experience and style..."
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div className="form-group">
                        <label className="label">WhatsApp Number</label>
                        <input className="input" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+91..." />
                    </div>

                    <div className="form-group">
                        <label className="label">Instagram URL</label>
                        <input className="input" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="https://instagram.com/..." />
                    </div>
                </div>
            </div>

            {/* Section 4: Portfolio Showcase (NEW) */}
            <div className="form-section" style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--foreground)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Portfolio Showcase</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', marginBottom: '1rem' }}>
                    Add links to your best work from Instagram (Reels) or YouTube. They will be displayed on your profile.
                </p>

                {portfolioUrls.map((url, index) => (
                    <div key={index} className="form-group" style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <input
                            className="input"
                            value={url}
                            onChange={(e) => handlePortfolioChange(index, e.target.value)}
                            placeholder="https://www.instagram.com/reel/..."
                        />
                        {portfolioUrls.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removePortfolioUrl(index)}
                                className="btn"
                                style={{ padding: '0.5rem', background: '#fee2e2', color: '#dc2626', minWidth: '40px' }}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addPortfolioUrl}
                    className="btn"
                    style={{ fontSize: '0.9rem', padding: '0.5rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569', marginTop: '0.5rem' }}
                >
                    + Add Another Link
                </button>
            </div>

            {/* Section 5: Pricing & Services */}
            <div className="form-section" style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--foreground)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Pricing & Services</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="form-group">
                        <label className="label">Min Price (₹)</label>
                        <input type="number" className="input" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} placeholder="5000" />
                    </div>

                    <div className="form-group">
                        <label className="label">Max Price (₹)</label>
                        <input type="number" className="input" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} placeholder="15000" />
                    </div>
                </div>

                <div className="form-group">
                    <label className="label">Services Offered</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.5rem' }}>
                        {AVAILABLE_SERVICES.map((service) => (
                            <label key={service} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={services.includes(service)}
                                    onChange={() => handleServiceChange(service)}
                                    style={{ width: '1rem', height: '1rem', accentColor: 'var(--primary)' }}
                                />
                                {service}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer with Submit Button */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary" disabled={saving} style={{ minWidth: '180px' }}>
                    {saving ? 'Processing...' : (
                        !status || status === 'rejected' ? 'Send for Approval' :
                            status === 'pending' ? 'Update Application' : 'Save Changes'
                    )}
                </button>
            </div>
        </form>
    )
}
