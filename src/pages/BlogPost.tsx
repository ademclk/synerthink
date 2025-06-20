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
                <div className="relative w-full flex items-center justify-center min-h-[60vh] sm:min-h-[70vh] px-4 sm:px-6 lg:px-8">
                    <div className="absolute inset-0">
                        <AnimatedBackground />
                    </div>

                    {/* Navigation - Top Left */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-20">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 backdrop-blur-md bg-black/20 rounded-full px-4 py-2 border border-white/10 shadow-lg hover:bg-black/30 transition-colors duration-300 text-sm font-medium text-white"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">Back to Blog</span>
                            <span className="sm:hidden">Back</span>
                        </Link>
                    </div>

                    <div className="relative flex flex-col justify-center items-center w-full max-w-4xl mx-auto z-10">
                        <div className="w-full flex flex-col gap-4 sm:gap-6 items-center text-center">
                            {/* The Title */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-2xl">
                                Introducing Dotlanth
                            </h1>
                            {/* The Subtitle/Intro */}
                            <p className="text-lg sm:text-xl md:text-2xl font-normal text-white/80 leading-relaxed max-w-3xl drop-shadow-lg">
                                If you've ever built software, you know the feeling. You have a clear idea in your head, but to make it real, you have to fight through layers of boilerplate, infrastructure, and configuration.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 bg-background">
                    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
                        <article className="max-w-none">

                            {/* --- Start of your actual content --- */}

                            <p className="text-lg leading-loose mb-6 text-foreground/80">
                                It's a process that drains energy and gets in the way of actually creating. We started Synerthink because we were tired of that fight. We wanted to build a platform that gets out of your way—one that's powerful but feels simple and intuitive.
                            </p>
                            <p className="text-lg leading-loose mb-6 text-foreground/80">
                                That's what Dotlanth is all about.
                            </p>

                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-16 mb-6 pb-4 border-b border-foreground/10">
                                So, what is Dotlanth?
                            </h2>
                            <p className="text-lg leading-loose mb-6 text-foreground/80">
                                Think of it as a new kind of foundation for your applications. It lets you write your business logic—the core rules that make your app work—in a clean, focused way. We handle the hard parts like servers, databases, and scaling, so you can just focus on your idea.
                            </p>

                            <h3 className="text-2xl font-bold text-primary mt-10 mb-4">
                                The Core Idea: The "Dot"
                            </h3>
                            <p className="text-lg leading-loose mb-6 text-foreground/80">
                                Everything in Dotlanth is built around a simple concept we call a "Dot." A Dot is just a self-contained piece of your application's logic. It's lightweight, easy to reuse, and designed to scale from one user to millions without you having to change a thing.
                            </p>
                            <p className="text-lg leading-loose mb-6 text-foreground/80">
                                We have a few different types of Dots for common tasks:
                            </p>
                            <ul className="list-disc list-inside space-y-3 mb-6 pl-4 text-lg leading-loose text-foreground/80">
                                <li><strong>ParaDots</strong> – For heavy-duty tasks that need to run in parallel</li>
                                <li><strong>DataDots</strong> – A simple way to define and work with your data</li>
                                <li><strong>UILinks</strong> – Connect your Dots directly to a user interface</li>
                            </ul>

                            {/* Lazy loaded sections will seamlessly appear here */}
                            <Suspense fallback={<div className="min-h-[200px] w-full bg-foreground/5 rounded-lg animate-pulse" />}>
                                <TechnicalArchitecture />
                            </Suspense>
                            <Suspense fallback={<div className="min-h-[200px] w-full bg-foreground/5 rounded-lg animate-pulse" />}>
                                <DotVariants />
                            </Suspense>
                            <Suspense fallback={<div className="min-h-[200px] w-full bg-foreground/5 rounded-lg animate-pulse" />}>
                                <DevelopmentExperience />
                            </Suspense>
                            <Suspense fallback={<div className="min-h-[200px] w-full bg-foreground/5 rounded-lg animate-pulse" />}>
                                <FutureGoals />
                            </Suspense>


                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-16 mb-6 pb-4 border-b border-foreground/10">
                                What's Next
                            </h2>
                            <p className="text-lg leading-loose mb-6 text-foreground/80">
                                We're just at the beginning of this journey. Dotlanth is in active development, and we have a lot planned, from better AI-powered tools to advanced privacy features.
                            </p>
                            <p className="text-lg leading-loose mb-6 text-foreground/80">
                                We're building this in the open because we believe the best products are built with the community. If you find this idea interesting, we'd love for you to follow along with our progress.
                            </p>

                            <p className="mt-16 text-lg leading-loose text-foreground/70">
                                Thanks for reading,<br />
                                <em className="text-foreground/70">The Synerthink Team</em>
                            </p>

                            {/* --- End of your actual content --- */}

                        </article>
                    </div>
                </div>
            </main>
        </>
    );
};

export default BlogPost; 