"use client";

import { useState } from "react";
import { Link, Button } from "@heroui/react";
import Image from "next/image";
import { Bars, Xmark } from "@gravity-ui/icons";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#b06a44] text-white">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* বাম পাশ: হ্যামবার্গার মেনু এবং লোগো */}
        <div className="flex items-center gap-4">
          <Button
            isIconOnly
            variant="light"
            className="text-white md:hidden min-w-10 h-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <Xmark size={24} /> : <Bars size={24} />}
          </Button>
          
          {/* StartupForge লোগো */}
          {/* <Link href="/" className="flex items-center gap-3 hover:opacity-90">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/20 shadow-sm flex items-center justify-center bg-white/10">
              <Image 
                src="/assist/logo.jpeg" 
                alt="StartupForge Logo"
                fill 
                priority
                className="object-cover rounded-full" 
              />
            </div>
            <span className="text-xl font-bold tracking-wide text-white hidden sm:block">
              StartupForge
            </span>
          </Link> */}
        </div>

        {/* মাঝখান: ডেক্সটপ নেভিগেশন লিংক */}
        <ul className="hidden items-center gap-8 md:flex font-medium text-[15px]">
          <li>
            <Link href="/" className="text-white hover:opacity-80">
              Home
            </Link>
          </li>
          <li>
            <Link href="/startup" className="text-white hover:opacity-80">
              Browse Startups
            </Link>
          </li>
          <li>
            <Link href="/opportunities" className="text-white hover:opacity-80">
              Browse Opportunities
            </Link>
          </li>
        </ul>

        {/* ডান পাশ: লগইন এবং রেজিস্টার বাটন */}
        <div className="flex items-center gap-6">
          <Link href="/auth/login" className="text-white font-medium hover:opacity-80 text-[15px] hidden sm:block">
            Login
          </Link>
          
          {/* REGISTER ফিক্সড: HeroUI Button-কে Link হিসেবে ম্যাপ করা হয়েছে */}
          <Link 
          
            href="/auth/register"
            className="bg-white text-black font-medium px-2 py-2 rounded-full text-[15px] howhite/90"
          >
            Register
          </Link>
        </div>
      </header>

      {/* মোবাইল ড্রপডাউন মেনু */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#b06a44] md:hidden">
          <ul className="flex flex-col gap-2 p-4 font-medium">
            <li>
              <Link href="/" className="text-white block py-2" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/startup" className="text-white block py-2" onClick={() => setIsMenuOpen(false)}>
                Browse Startups
              </Link>
            </li>
            <li>
              <Link href="/opportunities" className="text-white block py-2" onClick={() => setIsMenuOpen(false)}>
                Browse Opportunities
              </Link>
            </li>
            
            {/* মোবাইল ইউজারদের জন্য লগইন ও রেজিস্টার লিংক */}
            <li className="border-t border-white/10 pt-2 mt-2 flex flex-col gap-2">
              <Link href="/auth/login" className="text-white block py-2" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              
              {/* মোবাইলের জন্যও রেজিস্টার বাটন */}
              <Link
             
                href="/auth/register"
                onClick={() => setIsMenuOpen(false)}
                className="bg-white text-black font-semibold w-full mt-1"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
export default Navbar;