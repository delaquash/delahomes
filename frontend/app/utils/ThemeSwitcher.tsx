"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { BiMoon, BiSun } from "react-icons/bi"


const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const [theme, setTheme] = useState();

    useEffect(()=> setMounted(true), [])

    if(!mounted) {return null}

  return (
    <div className="flex items-center justify-center mx-4">
      
    </div>
  )
}

export default ThemeSwitcher
