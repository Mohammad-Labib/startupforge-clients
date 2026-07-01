"use client";

import { useState } from "react";
import { Link, Button, Avatar } from "@heroui/react";
import Image from "next/image";
import { Bars, Xmark } from "@gravity-ui/icons";
import { signOut, useSession } from "@/lib/auth-client";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleLogOut = async () => {
    await signOut();
    setIsMenuOpen(false); 
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#b06a44] text-white">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

     
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

         
          <Link href="/" className="flex items-center gap-3 hover:opacity-90">
            <div>
              <h1 className="font-bold text-3xl text-white">
                Startup<span className="text-4xl text-pink-600">Forge</span>
              </h1>
            </div>
          </Link>
        </div>

      
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

     
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <Avatar
                  src={user.image}
                  name={user.name}
                  size="sm"
                  className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800"
                />
                <span className="text-sm font-medium">Hi, {user.name}</span>
              </div>
              <Button onClick={handleLogOut} variant="ghost" size="sm" className="text-white border-white/40 hover:bg-white/10">
                LogOut
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-white font-medium hover:opacity-80 text-[15px]">
                Login
              </Link>

              <Link
                href="/auth/register"
                className="bg-white text-black font-medium px-4 py-2 rounded-full text-[15px] hover:bg-white/90 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>

 
        {user && (
          <div className="md:hidden flex items-center gap-2">
            <Avatar
              src={user.image}
              name={user.name}
              size="sm"
              className="w-8 h-8 rounded-full border border-white/20"
            />
          </div>
        )}

      </header>

   
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

     
            <li className="border-t border-white/10 pt-4 mt-2">
              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-xl">
                    <Avatar src={user.image} name={user.name} size="sm" />
                    <span className="text-sm font-medium">Hi, {user.name}</span>
                  </div>
                  <Button 
                    onClick={handleLogOut} 
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl h-10"
                  >
                    LogOut
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link 
                    href="/auth/login" 
                    className="text-white text-center block py-2.5 rounded-xl border border-white/25 hover:bg-white/5" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    href="/auth/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-white text-black font-semibold w-full block text-center py-2.5 rounded-xl hover:bg-white/90 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;