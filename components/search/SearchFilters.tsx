'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabaseClient'

interface SearchFiltersProps {
    initialCity?: string
    initialState?: string
    initialType?: string
}

export default function SearchFilters({ initialCity, initialState, initialType }: SearchFiltersProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const supabase = createClient()

    const [states, setStates] = useState<string[]>([])
    const [cities, setCities] = useState<any[]>([])
    const [selectedState, setSelectedState] = useState(initialState || '')
    const [selectedCity, setSelectedCity] = useState(initialCity || '')
    const [selectedType, setSelectedType] = useState(initialType || '')

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

                // If initial city is provided but no state, find the state
                if (initialCity && !initialState) {
                    const cityObj = data.find(c => c.city_name === initialCity)
                    if (cityObj) {
                        setSelectedState(cityObj.state_name)
                    }
                }
            }
        }
        fetchLocations()
    }, [supabase, initialCity, initialState])

    const filteredCities = cities.filter(c => c.state_name === selectedState)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const params = new URLSearchParams()
        if (selectedCity) params.set('city', selectedCity)
        if (selectedState) params.set('state', selectedState)
        if (selectedType) params.set('type', selectedType)

        router.push(`/search?${params.toString()}`)
    }

    const EVENT_TYPES = [
        'Wedding Reels', 'Corporate Events', 'Fashion Shoots',
        'Product Videography', 'Travel Vlogs', 'Food Vlogs',
        'Music Videos', 'Short Films'
    ]

    return (
        <form onSubmit={handleSubmit} className="card" style={{ maxWidth: '100%', marginBottom: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="label">State</label>
                    <select
                        className="input"
                        value={selectedState}
                        onChange={(e) => {
                            setSelectedState(e.target.value)
                            setSelectedCity('') // Reset city on state change
                        }}
                    >
                        <option value="">All States</option>
                        {states.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="label">City</label>
                    <select
                        className="input"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        disabled={!selectedState}
                    >
                        <option value="">All Cities</option>
                        {filteredCities.map(c => (
                            <option key={c.city_name} value={c.city_name}>{c.city_name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="label">Event Type</label>
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="input"
                    >
                        <option value="">All Types</option>
                        {EVENT_TYPES.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{ height: '42px' }}>
                    Search
                </button>
            </div>
        </form>
    )
}
