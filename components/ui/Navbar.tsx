'use client'

import Link from 'next/link'
import { createClient } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/')
        router.refresh()
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav style={{ borderBottom: '1px solid var(--border)', padding: '1rem', backgroundColor: 'var(--background)', position: 'relative' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    ReelCreator <span style={{ color: 'var(--secondary)' }}>Network</span>
                </Link>

                {/* Desktop Menu */}
                <div className="nav-links-desktop" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    <Link href="/search" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>Search Creators</Link>
                    {user ? (
                        <>
                            <Link href="/dashboard" style={{ fontWeight: 500 }}>Dashboard</Link>
                            <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)' }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Link href="/login" className="btn btn-outline" style={{ padding: '0.6rem 1.5rem' }}>
                                Login
                            </Link>
                            <Link href="/signup" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', boxShadow: '0 4px 6px -1px rgba(30, 42, 120, 0.2)' }}>
                                Register as Creator
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
                <Link href="/search" onClick={() => setIsMenuOpen(false)} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                    Search Creators
                </Link>
                {user ? (
                    <>
                        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                            Dashboard
                        </Link>
                        <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '0.5rem 0', color: 'var(--muted-foreground)' }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" onClick={() => setIsMenuOpen(false)} className="btn btn-outline" style={{ textAlign: 'center' }}>
                            Login
                        </Link>
                        <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="btn btn-primary" style={{ textAlign: 'center' }}>
                            Register as Creator
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}
