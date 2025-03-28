"use client"

import Link from 'next/link'
import Image from 'next/image'

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <Image src="/logoBlack.svg" alt="CRAKD Logo" width={38} height={32} />
      <h2 className="font-poppins font-black text-dark-100">CRAKD</h2>
    </Link>
  )
}

export default Logo 