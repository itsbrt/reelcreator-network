'use client'

import { useState } from 'react'

export default function FAQSection() {
    const faqs = [
        { q: "Is it free to join?", a: "Yes! Creating a profile is 100% free for creators." },
        { q: "Do you take commission?", a: "No. We do not take any commission. You deal directly with the client." },
        { q: "How do I contact a creator?", a: "You can contact creators directly via the WhatsApp or Instagram buttons on their profile." },
        { q: "Are profiles verified?", a: "Yes, every profile is manually reviewed by our team before going live." },
    ]

    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section style={{ padding: '6rem 1rem', background: 'white' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '3rem', textAlign: 'center' }}>Frequently Asked Questions</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((faq, index) => (
                        <div key={index} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    background: 'none',
                                    border: 'none',
                                    padding: '1rem 0',
                                    fontSize: '1.25rem',
                                    fontWeight: 600,
                                    color: '#1e293b',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer'
                                }}
                            >
                                {faq.q}
                                <span>{openIndex === index ? '−' : '+'}</span>
                            </button>
                            {openIndex === index && (
                                <p style={{ color: '#4b5563', lineHeight: 1.6, paddingBottom: '1rem' }}>
                                    {faq.a}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
