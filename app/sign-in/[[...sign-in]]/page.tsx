import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='mx-auto mt-5 w-max'>
      <SignIn />
    </div>
  )
}
