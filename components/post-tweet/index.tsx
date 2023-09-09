'use client'

import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { postTweet } from './actions'
import { useToast } from '../ui/use-toast'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Textarea } from '../ui/textarea'
import { useAuth } from '@clerk/nextjs'
import { Separator } from '../ui/separator'

export default function PostTweet() {
  const { isSignedIn } = useAuth()
  const { refresh } = useRouter()
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)
  const maxRows = 5

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const textarea = e.target
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10)
    const rows = Math.min(
      maxRows,
      Math.floor(textarea.scrollHeight / lineHeight)
    )

    textarea.rows = rows
  }

  async function action(formData: FormData) {
    const { success, error } = await postTweet(formData)

    if (success) {
      toast({
        description: 'Tweet posted 🎉.',
      })
      refresh()
      formRef.current?.reset()
    } else if (error) {
      toast({
        description: error,
        variant: 'destructive',
      })
    }
  }

  if (!isSignedIn) return null

  return (
    <>
      <form
        ref={formRef}
        action={action}
        className='flex flex-col items-end gap-3'
      >
        <Textarea
          name='content'
          onChange={handleChange}
          className='resize-none'
          placeholder='What is happening?'
          required
        />

        <PostTweetButton />
      </form>

      <Separator />
    </>
  )
}

function PostTweetButton() {
  const { pending } = useFormStatus()

  return (
    <Button variant='outline' disabled={pending}>
      post
    </Button>
  )
}
