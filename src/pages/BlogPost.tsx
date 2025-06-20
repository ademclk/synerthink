import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

// Lazy load sections
const TechnicalArchitecture = lazy(() => import('../components/blog/TechnicalArchitecture'));
const DotVariants = lazy(() => import('../components/blog/DotVariants'));
const DevelopmentExperience = lazy(() => import('../components/blog/DevelopmentExperience'));
const FutureGoals = lazy(() => import('../components/blog/FutureGoals'));

const BlogPost: React.FC = () => {
    return (
        <>
            <title>Introducing Dotlanth | Synerthink Blog</title>
            <meta name="description" content="Learn about our vision for simplifying software development with Dotlanth, a new foundation for your software projects." />
            <meta name="keywords" content="Dotlanth, Synerthink, software development, technology, innovation, software foundation" />
            <meta property="og:title" content="Introducing Dotlanth | Synerthink Blog" />
            <meta property="og:description" content="Learn about our vision for simplifying software development with Dotlanth, a new foundation for your software projects." />
            <meta property="og:type" content="article" />
            <meta property="article:published_time" content="2025-05-01" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Introducing Dotlanth | Synerthink Blog" />
            <meta name="twitter:description" content="Learn about our vision for simplifying software development with Dotlanth, a new foundation for your software projects." />

            <main className="relative min-h-screen flex flex-col bg-background text-foreground overflow-hidden transition-colors">
                {/* Hero Section with Animated Background */}
                <div className="relative w-full flex items-center justify-center min-h-[60vh] sm:min-h-[70vh] px-3 sm:px-4 md:px-8 lg:px-16 xl:px-24">
                    <div className="absolute inset-0">
                        <AnimatedBackground />
                    </div>

                    {/* Navigation - Top Left */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-8 md:left-8 z-20">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-1 sm:gap-2 backdrop-blur-xl bg-foreground/10 rounded-full px-3 py-2 sm:px-4 sm:py-2 border border-foreground/10 shadow-2xl hover:bg-foreground/15 transition-all duration-300 text-sm sm:text-base"
                        >
                            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">Back to Blog</span>
                            <span className="sm:hidden">Back</span>
                        </Link>
                    </div>

                    <div className="relative flex flex-col justify-center items-center w-full h-full min-h-[40vh] sm:min-h-[50vh] max-w-5xl mx-auto px-3 sm:px-4 md:px-8 lg:px-12 xl:px-20 py-6 sm:py-8 md:py-12 z-10">
                        <div className="w-full flex flex-col gap-3 sm:gap-4 items-center text-center">
                            <div className="backdrop-blur-xl bg-foreground/10 rounded-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-3 sm:py-4 md:py-6 border border-foreground/10 shadow-2xl">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
                                    Introducing Dotlanth
                                </h1>
                            </div>
                        </div>
                        <div className="w-full max-w-4xl flex flex-col gap-6 sm:gap-8 items-center mt-6 sm:mt-8">
                            <div className="backdrop-blur-xl bg-foreground/5 rounded-full px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 border border-foreground/10">
                                <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light text-foreground/90 leading-relaxed">
                                    For decades, a wall has stood between a great idea and a working application. A wall built of boilerplate, complex infrastructure, and endless configuration.
                                </p>
                                <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light text-foreground/90 leading-relaxed mt-3 sm:mt-4">
                                    We started Synerthink to tear down that wall.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 bg-background/90 backdrop-blur-sm">
                    <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
                        <article className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
                            {/* What is Dotlanth Section */}
                            <div className="mb-16">
                                <div className="backdrop-blur-xl bg-foreground/10 rounded-full p-6 sm:p-8 md:p-12 border border-foreground/10 mb-8">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">The Foundation for Flow</h2>
                                    <p className="text-base sm:text-lg leading-relaxed text-foreground/80 text-center">
                                        Dotlanth is our answer. It's not just a new tool; it's a new foundation for creation, designed from the ground up to be simple, powerful, and invisible. It's the platform we've always wanted for ourselves—one that lets us stay in a state of flow and focus only on what matters.
                                    </p>
                                </div>

                                {/* Pull Quote */}
                                <div className="backdrop-blur-xl bg-primary/10 rounded-full p-4 sm:p-6 md:p-8 border border-primary/20 mb-8 text-center">
                                    <p className="text-lg sm:text-xl md:text-2xl font-medium text-primary italic">
                                        "A Dot is pure logic, freed from the noise of infrastructure."
                                    </p>
                                </div>

                                <div className="backdrop-blur-xl bg-foreground/10 rounded-3xl p-6 sm:p-8 md:p-10 border border-foreground/10">
                                    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary">What is a Dot?</h3>
                                    <p className="mb-4 sm:mb-6 text-foreground/80 leading-relaxed">
                                        Think of a Dot as pure business logic—lightweight, composable, and infinitely scalable. It's your idea distilled to its essence, without the weight of traditional infrastructure holding it back.
                                    </p>
                                    <p className="mb-4 sm:mb-6 text-foreground/80">
                                        Each Dot variant serves a specific purpose in your creative toolkit:
                                    </p>
                                    <div className="grid gap-3 sm:gap-4 md:gap-6">
                                        {[
                                            { name: 'ParaDots', desc: 'Scale effortlessly across infinite cores' },
                                            { name: 'DataDots', desc: 'Your data, structured and ready' },
                                            { name: 'UILinks', desc: 'Interfaces that build themselves' }
                                        ].map((item, index) => (
                                            <div key={index} className="backdrop-blur-xl bg-foreground/10 rounded-full px-4 sm:px-6 py-3 sm:py-4 border border-foreground/10">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                                    <span className="font-bold text-primary">{item.name}</span>
                                                    <span className="text-foreground/70 hidden sm:inline">–</span>
                                                    <span className="text-foreground/80 text-sm sm:text-base">{item.desc}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Lazy loaded sections */}
                            <Suspense fallback={<div className="min-h-[200px] backdrop-blur-xl bg-foreground/5 rounded-3xl animate-pulse" />}>
                                <TechnicalArchitecture />
                            </Suspense>

                            <Suspense fallback={<div className="min-h-[200px] backdrop-blur-xl bg-foreground/5 rounded-3xl animate-pulse" />}>
                                <DotVariants />
                            </Suspense>

                            <Suspense fallback={<div className="min-h-[200px] backdrop-blur-xl bg-foreground/5 rounded-3xl animate-pulse" />}>
                                <DevelopmentExperience />
                            </Suspense>

                            <Suspense fallback={<div className="min-h-[200px] backdrop-blur-xl bg-foreground/5 rounded-3xl animate-pulse" />}>
                                <FutureGoals />
                            </Suspense>

                            {/* Call to Action */}
                            <div className="text-center mt-16">
                                <div className="backdrop-blur-xl bg-foreground/10 rounded-full p-8 sm:p-12 border border-foreground/10">
                                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">Be a Pioneer</h2>
                                    <p className="mb-6 text-lg text-foreground/80 leading-relaxed">
                                        Dotlanth is more than a product; it's a movement to restore simplicity and joy to the act of creation. The road ahead is long, and we're just getting started.
                                    </p>
                                    <p className="mb-8 text-lg text-foreground/80 leading-relaxed">
                                        If this vision resonates with you, we invite you to follow our journey. We're building in public, and we believe that together, we can build the future we were all promised.
                                    </p>
                                    <div className="text-foreground/60 space-y-2">
                                        <p className="font-medium">Thanks,</p>
                                        <p>The Synerthink Team</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </main>
        </>
    );
};

export default BlogPost; 