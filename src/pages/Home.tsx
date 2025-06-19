import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";

// Lazy load ALL heavy components including PixelArtHero
const PixelArtHero = lazy(() => import("@/components/PixelArtHero"));
const Features = lazy(() => import("@/components/Features"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const EcosystemSnapshot = lazy(() => import("@/components/EcosystemSnapshot"));

export function Home() {
    return (
        <main className="relative min-h-screen flex flex-col bg-background text-foreground overflow-hidden transition-colors">
            {/* Hero Pixel Art Section */}
            <div className="relative w-full h-screen">
                {/* Background Canvas */}
                <div className="absolute inset-0 z-0">
                    <Suspense fallback={<div className="w-full h-full bg-background/10" />}>
                        <PixelArtHero />
                    </Suspense>
                </div>

                {/* Slogan & CTA Overlay */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 pointer-events-none">
                    {/* Content Wrapper: Centers the content vertically and horizontally */}
                    <div className="flex flex-col items-center justify-center w-full flex-1 pt-32 sm:pt-0">
                        <div className="flex flex-col items-center gap-10">
                            <div className="pointer-events-auto backdrop-blur-xl bg-foreground/10 rounded-full px-8 sm:px-10 md:px-16 lg:px-20 py-4 sm:py-6 md:py-8 border border-foreground/10 shadow-2xl">
                                <h2 className="text-center text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-foreground whitespace-normal md:whitespace-nowrap">
                                    Create What Matters.
                                </h2>
                                <p className="text-center text-xl sm:text-xl md:text-2xl lg:text-3xl font-light text-foreground/80 mt-2 sm:mt-4">
                                    We handle the rest.
                                </p>
                            </div>
                            <Link
                                to="/blog/introducing-dotlanth"
                                className="group pointer-events-auto inline-flex items-center justify-center bg-primary text-primary-foreground font-bold text-base sm:text-lg rounded-full px-6 py-3 sm:px-10 sm:py-4 shadow-2xl border border-primary-foreground/20 transform-gpu transition-all duration-300 hover:brightness-110 active:scale-95"
                            >
                                See What's Possible
                                <ArrowUpRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Suspense fallback={<div className="min-h-screen" />}>
                <HowItWorks />
            </Suspense>
            <Suspense fallback={<div className="min-h-screen" />}>
                <Features />
            </Suspense>
            <Suspense fallback={<div className="min-h-screen" />}>
                <EcosystemSnapshot />
            </Suspense>
        </main>
    );
}  