"use client";

import { Link, Button } from "@heroui/react";

function HeroBanner() {
  return (
    <section className="w-full bg-[#b25e38] text-white font-sans py-16 md:py-28 flex flex-col items-center text-center px-6 selection:bg-white selection:text-[#b25e38]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Top Tag/Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide mb-6 uppercase">
          ✨ AI for Life Sciences
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-[1.15] mb-8">
          THE ULTIMATE PLATFORM FOR <br className="hidden md:inline" />
          <span className="underline decoration-white/40 underline-offset-8">COMPUTER VISION</span> AND DATA ANNOTATION.
        </h1>

        {/* Feature List / Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full text-left bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm mb-10">
          <div className="flex items-start gap-3">
            <span className="text-xl text-white/80">•</span>
            <p className="text-sm md:text-base text-white/90 font-medium">Accelerate model training by 10x</p>
          </div>
          <div className="flex items-start gap-3 border-t border-white/10 pt-4 sm:border-t-0 sm:pt-0 sm:border-x sm:px-4">
            <span className="text-xl text-white/80">•</span>
            <p className="text-sm md:text-base text-white/90 font-medium">Automate annotation tasks</p>
          </div>
          <div className="flex items-start gap-3 border-t border-white/10 pt-4 sm:border-t-0 sm:pt-0 sm:pl-4">
            <span className="text-xl text-white/80">•</span>
            <p className="text-sm md:text-base text-white/90 font-medium">Unified data and workflows</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button 
            as={Link}
            href="#"
            size="lg"
            className="bg-white text-black font-semibold px-8 py-4 rounded-full text-base hover:bg-white/90 shadow-lg transition w-full sm:w-auto"
          >
            Get Started Today
          </Button>
          <Button 
            as={Link}
            href="#"
            size="lg"
            variant="bordered"
            className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full text-base hover:bg-white hover:text-black transition w-full sm:w-auto"
          >
            Request a demo
          </Button>
        </div>

      </div>
    </section>
  );
}

export default HeroBanner;