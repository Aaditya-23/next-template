import { Navbar } from '@/layouts'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <>
      <Navbar />
      <div className='mx-auto mt-5 w-max'>
        <SignUp afterSignUpUrl='/api/user/store-in-db' />
      </div>
    </>
  )
}
