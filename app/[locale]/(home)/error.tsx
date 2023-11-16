'use client' // Error components must be Client Components
 
import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { ReactComponentElement, useEffect } from 'react'
 
export default function Error({
  error,
  children,
  reset,
}: {
  error: Error & { digest?: string }
  children: any,
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="p-4">
      <Alert className="my-8">
        <AlertTriangle />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>
          <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
        </AlertDescription>
      </Alert>
      { children }
    </div>
  )
}