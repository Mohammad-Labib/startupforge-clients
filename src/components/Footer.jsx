"use client"
import { Link } from "@heroui/react";
import Image from "next/image";
// Gravity UI Icons use kora hyce
import { LogoLinkedin, LogoTelegram, Envelope, Handset, LogoGithub } from "@gravity-ui/icons";

function Footer() {
  return (
    <footer className="w-full bg-[#b06a44] text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* ekhane main layout parts*/}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">


          {/* ১. ekhane logo and brand parts ace*/}
          <div className="flex flex-col gap-3">

            {/* <Link className="flex items-center gap-3 hover:opacity-90 text-white" href="#">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20 bg-white/10">
                {/* <Image alt="StartupForge Logo" className="object-cover rounded-full" fill src="/assist/logo.jpeg"/> */}
            {/* </div>
              <span className="text-xl font-bold tracking-wide">
                StartupForge
              </span> */}
            {/* </Link> */}


            <div>
              <h1 className="font-bold text-3xl">
                Startup<span className="text-4xl text-pink-600">Forge</span>
              </h1>
            </div>
            
            <p className="text-white/70 text-sm mt-2 leading-relaxed">
              Empowering startups to forge their future. Discover opportunities and accelerate your growth.
            </p>
          </div>

          {/* ২. Quick Links parts */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold tracking-wide">Quick Links</h3>
            <ul className="flex flex-col gap-2 text-sm text-white/80">
              <li>
                <Link className="text-white/80 hover:text-white transition-colors" href="#">Home</Link>
              </li>
              <li>
                <Link className="text-white/80 hover:text-white transition-colors" href="#">Browse Startups</Link>
              </li>
              <li>
                <Link className="text-white/80 hover:text-white transition-colors" href="#">Browse Opportunities</Link>
              </li>
            </ul>
          </div>

          {/* ৩. Contact Information deya ace */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold tracking-wide">Contact Us</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <Envelope className="text-white/60" size="{16}" />
                <span>info@startupforge.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Handset className="text-white/60" size="{16}" />
                <span>+880 1996-755465</span>
              </li>
            </ul>
          </div>

          {/* ৪. Social Links ekhane */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold tracking-wide">Follow Us</h3>
            <p className="text-sm text-white/70 mb-1">Stay connected with our community.</p>
            <div className="flex items-center gap-4">
              <Link aria-label="LinkedIn" className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
               href="https://www.linkedin.com/in/mohammad-labib-l"
               
               >
                <LogoLinkedin size="{20}" />
              </Link>
              <Link aria-label="Telegram" className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all" 
              href="https://github.com/Mohammad-Labib"
              >
                <LogoGithub size="{20}" />
              </Link>
            </div>
          </div>

        </div>

        {/* btn parts Copyright */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} StartupForge. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;