import { ToggleTheme } from '@/components/toggle-theme'
import { currentUser } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Index() {
  const user = await currentUser()

  return (
    <nav className='mb-10 flex items-center justify-between p-2'>
      <Heading />
      <div className='flex items-center gap-2'>
        <ToggleTheme />
        {user ? null : <LoginLink />}
      </div>
    </nav>
  )
}

function LoginLink() {
  return (
    <Link
      href='/sign-in'
      className='rounded-lg border px-4 py-2 text-sm font-medium capitalize'
    >
      login
    </Link>
  )
}

function Heading() {
  return (
    <Link href='/'>
      <h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight md:text-3xl lg:text-4xl'>
        Next-X
      </h1>
    </Link>
  )
}
