import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface EcosystemCardProps {
    title: string;
    description: string;
    colorClass: string;
}

const EcosystemCard = ({ title, description, colorClass }: EcosystemCardProps) => {
    return (
        <div className="flex flex-col p-6 rounded-2xl bg-gray-100 dark:bg-neutral-900 shadow-lg">
            <span className={`font-bold text-xl md:text-2xl ${colorClass}`}>{title}</span>
            <span className="mt-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
                {description}
            </span>
        </div>
    );
};

export default function EcosystemSnapshot() {
    return (
        <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32">
            <div className="max-w-7xl mx-auto">
                <div className="relative">
                    {/* Background rectangle */}
                    <div className="absolute inset-0 bg-gray-50 dark:bg-neutral-900/50 rounded-[2.5rem] -mx-6 sm:-mx-10 md:-mx-16 lg:-mx-24 xl:-mx-32" />

                    {/* Content */}
                    <div className="relative z-10 py-12 sm:py-16 md:py-20 px-6 sm:px-8 md:px-12 lg:px-16">
                        <div className="text-center mb-12 sm:mb-16 md:mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">The Dotlanth Ecosystem</h2>
                            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
                                Everything you need seamlessly integrated.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            <EcosystemCard
                                title="dotVM"
                                description="A parallel, multi-architecture virtual machine built for speed and security."
                                colorClass="text-cyan-400"
                            />
                            <EcosystemCard
                                title="dotDB"
                                description="A custom state database optimized for SSD storage and MVCC, reducing node requirements."
                                colorClass="text-orange-400"
                            />
                            <EcosystemCard
                                title="dotUX"
                                description="Auto-generated front-ends and AI-driven tooling from your contract's I/O spec."
                                colorClass="text-pink-400"
                            />
                            <EcosystemCard
                                title="dotCloud"
                                description="Global hosting and zero-ops deployment through our Microsoft Azure partnership."
                                colorClass="text-blue-400"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 