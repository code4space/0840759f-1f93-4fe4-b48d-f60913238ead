'use client'
import ErrorPage from '../components/error'

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    return (
        <ErrorPage type='ERROR' reset={reset} errorMessage={error.message} />
    )
}