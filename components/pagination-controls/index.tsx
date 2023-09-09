'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

export default function PaginationControls({
  disableNextPage,
}: {
  disableNextPage: boolean
}) {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const cursor = parseInt(searchParams.get('cursor') ?? '0')

  function handlePrevPage() {
    push(`?cursor=${Math.max(cursor - 8, 0).toString()}`)
  }

  function handleNextPage() {
    push(`?cursor=${(cursor + 8).toString()}`)
  }

  return (
    <div className='flex items-center justify-center gap-3'>
      <Button
        disabled={cursor <= 0}
        size='sm'
        className='text-xs'
        variant='outline'
        onClick={handlePrevPage}
      >
        <ChevronLeftIcon size='1.5em' />
        Left
      </Button>

      <Button
        disabled={disableNextPage}
        size='sm'
        className='text-xs'
        variant='outline'
        onClick={handleNextPage}
      >
        Next
        <ChevronRightIcon size='1.5em' />
      </Button>
    </div>
  )
}
