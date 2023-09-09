import { Navbar } from '@/layouts'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <>
      <Navbar />
      <div className='mx-auto mt-5 w-max'>
        <SignIn afterSignUpUrl='/api/user/store-in-db' />
      </div>
    </>
  )
}
