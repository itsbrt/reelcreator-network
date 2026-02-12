'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
    { label: 'Overview', href: '/admin', icon: '📊' },
    { label: 'Creators', href: '/admin/creators', icon: '👥' },
    { label: 'Cities', href: '/admin/cities', icon: '🏙️' },
    { label: 'Reviews', href: '/admin/reviews', icon: '⭐' },
    { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
    { label: 'Back to Site', href: '/', icon: '⬅️' },
]

export default function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="admin-sidebar">
            <div style={{ paddingLeft: '0.5rem' }} className="admin-brand">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-foreground)' }}>Admin Panel</h2>
                <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>ReelCreator Network</p>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: isActive ? '#fff' : '#94a3b8',
                                backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                                transition: 'all 0.2s',
                                fontWeight: isActive ? 600 : 400
                            }}
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
