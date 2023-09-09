import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { SignOutButton, SignedIn } from '@clerk/nextjs'
import {
  BellRingIcon,
  HomeIcon,
  LogOutIcon,
  PaletteIcon,
  SettingsIcon,
} from 'lucide-react'
import Link from 'next/link'

export default function Index() {
  return (
    <>
      <VerticalMenubar />
      <Appbar />
    </>
  )
}

function VerticalMenubar() {
  return (
    <nav className='hidden w-max flex-col gap-6 text-lg md:flex'>
      <TooltipWrapper content='Home'>
        <Link href='/'>
          <HomeIcon size={'1em'} />
        </Link>
      </TooltipWrapper>

      <TooltipWrapper content='Notifications'>
        <Link href='#'>
          <BellRingIcon size={'1em'} />
        </Link>
      </TooltipWrapper>

      <TooltipWrapper content='Settings'>
        <Link href='#'>
          <SettingsIcon size={'1em'} />
        </Link>
      </TooltipWrapper>

      <SignedIn>
        <TooltipWrapper content='Logout'>
          <SignOutButton>
            <LogOutIcon tabIndex={0} size={'1em'} />
          </SignOutButton>
        </TooltipWrapper>
      </SignedIn>
    </nav>
  )
}

function Appbar() {
  return (
    <nav className='fixed inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 bg-white px-3 py-4 text-lg dark:bg-black md:hidden'>
      <TooltipWrapper content='Home'>
        <Link href='/'>
          <HomeIcon size={'1em'} />
        </Link>
      </TooltipWrapper>

      <TooltipWrapper content='Notifications'>
        <Link href='#'>
          <BellRingIcon size={'1em'} />
        </Link>
      </TooltipWrapper>

      <TooltipWrapper content='Settings'>
        <Link href='#'>
          <SettingsIcon size={'1em'} />
        </Link>
      </TooltipWrapper>

      <SignedIn>
        <TooltipWrapper content='Logout'>
          <SignOutButton>
            <LogOutIcon tabIndex={0} size={'1em'} />
          </SignOutButton>
        </TooltipWrapper>
      </SignedIn>
    </nav>
  )
}

function TooltipWrapper({
  children,
  content,
}: {
  content: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <TooltipProvider delayDuration={100} disableHoverableContent>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
