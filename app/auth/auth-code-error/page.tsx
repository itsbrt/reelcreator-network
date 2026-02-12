import Link from "next/link";

export default function AuthCodeError() {
    return (
        <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center' }}>
            <h1 style={{ color: '#c62828', marginBottom: '1rem' }}>Authentication Error</h1>
            <p className="mb-4">There was an error verifying your email or logging you in.</p>
            <Link href="/login" className="btn btn-primary">
                Try Logging In Again
            </Link>
        </main>
    );
}
