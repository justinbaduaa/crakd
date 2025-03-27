"use client"

import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Logo() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <div className="flex items-center gap-2 h-8">
        <div className="w-[38px] h-[32px]" />
        <div className="w-24 h-8" />
      </div>
    )
  }
  
  const logoPath = theme === "dark" ? "/logo.svg" : "/logo-light.svg"
  
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src={logoPath} alt="CRAKD Logo" width={38} height={32} />
      <h2 className="font-poppins font-black text-primary-100 dark:text-primary-100">CRAKD</h2>
    </Link>
  )
} 