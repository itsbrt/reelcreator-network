'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    User, MapPin, Briefcase, DollarSign, Camera,
    Instagram, Phone, Mail, Lock, ChevronRight, ChevronLeft, CheckCircle
} from 'lucide-react'

export default function CreatorRegistrationForm() {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const [formData, setFormData] = useState({
        // Step 1: Personal
        full_name: '',
        city: '',
        state: '',

        // Step 2: Professional
        services_offered: [] as string[],
        experience_years: '',
        pricing_min: '',
        pricing_max: '',

        // Step 3: Social & Bio
        bio: '',
        instagram_url: '',
        whatsapp_number: '',

        // Step 4: Account
        email: '',
        password: '',
        confirm_password: ''
    })

    const serviceOptions = [
        'Wedding Photography', 'Wedding Videography', 'Pre-Wedding Shoots',
        'Event Coverage', 'Corporate Events', 'Fashion Shoots',
        'Food Photography', 'Product Photography', 'Reels Creation',
        'Drone Shots', 'Video Editing', 'Photo Editing'
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleServiceToggle = (service: string) => {
        const current = formData.services_offered
        if (current.includes(service)) {
            setFormData({ ...formData, services_offered: current.filter(s => s !== service) })
        } else {
            setFormData({ ...formData, services_offered: [...current, service] })
        }
    }

    const validateStep = (currentStep: number) => {
        setError(null)
        if (currentStep === 1) {
            if (!formData.full_name || !formData.city || !formData.state) return 'Please fill in all fields.'
        }
        if (currentStep === 2) {
            if (formData.services_offered.length === 0) return 'Please select at least one service.'
            if (!formData.pricing_min || !formData.pricing_max) return 'Please enter your pricing range.'
            if (Number(formData.pricing_min) > Number(formData.pricing_max)) return 'Min price cannot be greater than Max price.'
        }
        if (currentStep === 3) {
            if (!formData.bio) return 'Please write a short bio.'
            if (!formData.whatsapp_number) return 'WhatsApp number is required for clients to contact you.'
        }
        if (currentStep === 4) {
            if (!formData.email || !formData.password) return 'Please enter email and password.'
            if (formData.password.length < 6) return 'Password must be at least 6 characters.'
            if (formData.password !== formData.confirm_password) return 'Passwords do not match.'
        }
        return null
    }

    const nextStep = () => {
        const validationError = validateStep(step)
        if (validationError) {
            setError(validationError)
            return
        }
        setStep(step + 1)
    }

    const prevStep = () => {
        setError(null)
        setStep(step - 1)
    }

    const handleSubmit = async () => {
        const validationError = validateStep(4)
        if (validationError) {
            setError(validationError)
            return
        }

        setLoading(true)
        setError(null)

        try {
            const { error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.full_name,
                        city: formData.city,
                        state: formData.state,
                        services_offered: formData.services_offered,
                        experience_years: formData.experience_years ? parseInt(formData.experience_years) : 0,
                        pricing_min: parseInt(formData.pricing_min),
                        pricing_max: parseInt(formData.pricing_max),
                        bio: formData.bio,
                        instagram_url: formData.instagram_url,
                        whatsapp_number: formData.whatsapp_number,
                        role: 'creator'
                    }
                }
            })

            if (signUpError) throw signUpError

            setSuccess(true)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="card" style={{ maxWidth: '500px', textAlign: 'center', padding: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <CheckCircle size={64} color="var(--success)" />
                </div>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#1e293b' }}>Registration Successful!</h2>
                <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                    We have sent a verification link to <strong>{formData.email}</strong>.<br />
                    Please check your inbox (and spam folder) to verify your account and access your dashboard.
                </p>
                <Link href="/login" className="btn btn-primary">
                    Go to Login
                </Link>
            </div>
        )
    }

    return (
        <div className="card" style={{ maxWidth: '800px' }}>
            {/* Progress Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', position: 'relative' }}>
                {[1, 2, 3, 4].map((s) => (
                    <div key={s} style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1,
                        width: '25%'
                    }}>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            background: step >= s ? 'var(--primary)' : '#e2e8f0',
                            color: step >= s ? 'white' : '#64748b',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 'bold', marginBottom: '0.5rem',
                            transition: 'all 0.3s ease'
                        }}>
                            {s}
                        </div>
                        <span style={{ fontSize: '0.75rem', color: step >= s ? '#1e293b' : '#94a3b8', fontWeight: 500 }}>
                            {s === 1 ? 'Personal' : s === 2 ? 'Pro Info' : s === 3 ? 'Social' : 'Account'}
                        </span>
                    </div>
                ))}
                {/* Connecting Line */}
                <div style={{
                    position: 'absolute', top: '16px', left: '12%', right: '12%', height: '2px', background: '#e2e8f0', zIndex: 0
                }}>
                    <div style={{
                        height: '100%', background: 'var(--primary)', transition: 'width 0.3s ease',
                        width: `${((step - 1) / 3) * 100}%`
                    }}></div>
                </div>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b', textAlign: 'center' }}>
                {step === 1 && 'Personal Details'}
                {step === 2 && 'Professional Details'}
                {step === 3 && 'Social & Bio'}
                {step === 4 && 'Create Account'}
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '2rem', fontSize: '0.9rem' }}>
                {step === 1 && 'Let\'s get to know you better.'}
                {step === 2 && 'Showcase your expertise and pricing.'}
                {step === 3 && 'How can clients connect with you?'}
                {step === 4 && 'Secure your account.'}
            </p>

            {error && (
                <div style={{
                    padding: '1rem', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '8px',
                    color: '#b91c1c', marginBottom: '1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}>
                    <span style={{ fontWeight: 'bold' }}>!</span> {error}
                </div>
            )}

            <div style={{ marginBottom: '2rem' }}>
                {/* STEP 1: Personal */}
                {step === 1 && (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label className="label">Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="text" name="full_name" className="input" placeholder="e.g. Rahul Sharma"
                                    style={{ paddingLeft: '2.5rem' }}
                                    value={formData.full_name} onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group">
                                <label className="label">City</label>
                                <div style={{ position: 'relative' }}>
                                    <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        type="text" name="city" className="input" placeholder="e.g. Mumbai"
                                        style={{ paddingLeft: '2.5rem' }}
                                        value={formData.city} onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="label">State</label>
                                <input
                                    type="text" name="state" className="input" placeholder="e.g. Maharashtra"
                                    value={formData.state} onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 2: Professional */}
                {step === 2 && (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label className="label">Services Offered (Select all that apply)</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {serviceOptions.map(service => (
                                    <button
                                        key={service}
                                        type="button"
                                        onClick={() => handleServiceToggle(service)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '20px',
                                            border: formData.services_offered.includes(service) ? '1px solid var(--primary)' : '1px solid #e2e8f0',
                                            background: formData.services_offered.includes(service) ? '#e0e7ff' : 'white',
                                            color: formData.services_offered.includes(service) ? 'var(--primary)' : '#64748b',
                                            fontSize: '0.875rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {formData.services_offered.includes(service) && '✓ '}
                                        {service}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="label">Years of Experience</label>
                            <div style={{ position: 'relative' }}>
                                <Briefcase size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="number" name="experience_years" className="input" placeholder="e.g. 5"
                                    style={{ paddingLeft: '2.5rem' }}
                                    value={formData.experience_years} onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group">
                                <label className="label">Min Pricing (₹)</label>
                                <div style={{ position: 'relative' }}>
                                    <DollarSign size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        type="number" name="pricing_min" className="input" placeholder="e.g. 5000"
                                        style={{ paddingLeft: '2.5rem' }}
                                        value={formData.pricing_min} onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="label">Max Pricing (₹)</label>
                                <div style={{ position: 'relative' }}>
                                    <DollarSign size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        type="number" name="pricing_max" className="input" placeholder="e.g. 25000"
                                        style={{ paddingLeft: '2.5rem' }}
                                        value={formData.pricing_max} onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 3: Social & Bio */}
                {step === 3 && (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label className="label">Short Bio</label>
                            <textarea
                                name="bio" className="input" rows={4}
                                placeholder="Tell us about your style, equipment, and passion..."
                                value={formData.bio} onChange={handleChange}
                                style={{ resize: 'vertical' }}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label className="label">WhatsApp Number</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="tel" name="whatsapp_number" className="input" placeholder="+91 98765 43210"
                                    style={{ paddingLeft: '2.5rem' }}
                                    value={formData.whatsapp_number} onChange={handleChange}
                                />
                            </div>
                            <p className="text-sm text-muted" style={{ marginTop: '0.5rem' }}>Used for direct client inquiries (visible on profile).</p>
                        </div>
                        <div className="form-group">
                            <label className="label">Instagram Profile URL</label>
                            <div style={{ position: 'relative' }}>
                                <Instagram size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="url" name="instagram_url" className="input" placeholder="https://instagram.com/yourhandle"
                                    style={{ paddingLeft: '2.5rem' }}
                                    value={formData.instagram_url} onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 4: Account */}
                {step === 4 && (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label className="label">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="email" name="email" className="input" placeholder="you@example.com"
                                    style={{ paddingLeft: '2.5rem' }}
                                    value={formData.email} onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="label">Create Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="password" name="password" className="input" placeholder="••••••••"
                                    style={{ paddingLeft: '2.5rem' }}
                                    value={formData.password} onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="label">Confirm Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="password" name="confirm_password" className="input" placeholder="••••••••"
                                    style={{ paddingLeft: '2.5rem' }}
                                    value={formData.confirm_password} onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
                {step > 1 ? (
                    <button onClick={prevStep} className="btn" style={{ background: '#f1f5f9', color: '#64748b' }}>
                        <ChevronLeft size={18} style={{ marginRight: '0.5rem' }} /> Back
                    </button>
                ) : (
                    <div></div>
                )}

                {step < 4 ? (
                    <button onClick={nextStep} className="btn btn-primary">
                        Next Step <ChevronRight size={18} style={{ marginLeft: '0.5rem' }} />
                    </button>
                ) : (
                    <button onClick={handleSubmit} className="btn btn-primary" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Complete Registration'}
                    </button>
                )}
            </div>
        </div>
    )
}
