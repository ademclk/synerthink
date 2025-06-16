import { lazy, Suspense } from "react";

// Lazy load ALL heavy components including PixelArtHero
const PixelArtHero = lazy(() => import("@/components/PixelArtHero"));
const Features = lazy(() => import("@/components/Features"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const EcosystemSnapshot = lazy(() => import("@/components/EcosystemSnapshot"));

export function Home() {
    return (
        <main className="relative min-h-screen flex flex-col bg-background text-foreground overflow-hidden transition-colors">
            {/* Hero Pixel Art Section - At the top */}
            <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
                <Suspense fallback={<div className="w-full h-full bg-background/10" />}>
                <PixelArtHero />
                </Suspense>
            </div>

            {/* Welcome Section - Below the pixel art */}
            <div className="relative w-full flex items-center justify-center min-h-[50vh] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-12">
                <div className="relative flex flex-col justify-center items-center w-full h-full max-w-4xl mx-auto px-2 sm:px-6 md:px-12 lg:px-20 py-8 z-10">
                    <div className="flex flex-1 flex-col gap-12 justify-center w-full h-full">
                        <div className="w-full flex flex-col gap-1 sm:gap-2 items-center">
                            <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground whitespace-normal md:whitespace-nowrap">
                                Advancing technology. For all.
                            </h2>
                            <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground whitespace-normal md:whitespace-nowrap">
                                Welcome to Synerthink.
                            </h1>
                        </div>
                        <div className="w-full max-w-3xl flex flex-col gap-8 sm:gap-8 items-center mt-0 md:mt-6 flex-1 justify-center">
                            <p className="text-center text-lg sm:text-xl md:text-2xl font-light text-foreground leading-relaxed">
                                We believe in a future where technology empowers everyone trusted, open, and fundamentally human.
                            </p>
                            <p className="text-center text-base sm:text-lg md:text-xl font-light text-foreground leading-relaxed">
                                Building the next generation of digital infrastructure that enables people to connect, create, and collaborate with genuine security, privacy, and clarity at the core.
                            </p>
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