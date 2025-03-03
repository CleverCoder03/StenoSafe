import React from 'react'
import Hero from './Hero'
import { auth } from '@/lib/auth'

const HeroWrapper = async () => {
    const session = await auth()
  return (
    <>
        <Hero session={session}/>
    </>
  )
}

export default HeroWrapper