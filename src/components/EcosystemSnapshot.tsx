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
        <div className="flex flex-col p-6 sm:p-8 rounded-full bg-foreground/10 backdrop-blur-xl shadow-2xl border border-foreground/10">
            <span className={`font-bold text-xl md:text-2xl ${colorClass}`}>{title}</span>
            <span className="mt-2 text-sm md:text-base text-foreground/80">
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
                    {/* Background with backdrop blur */}
                    <div className="absolute inset-0 sm:-mx-10 md:-mx-16 lg:-mx-24 xl:-mx-32" />

                    {/* Content */}
                    <div className="relative z-10 py-12 sm:py-16 md:py-20 px-6 sm:px-8 md:px-12 lg:px-16">
                        <div className="text-center mb-12 sm:mb-16 md:mb-20">
                            <div className="inline-block px-8 sm:px-12 md:px-16 py-4 sm:py-6 mb-6">
                                <h2 className="text-4xl md:text-5xl font-bold text-foreground">The Dotlanth Ecosystem</h2>
                            </div>
                            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
                                Everything you need seamlessly integrated.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            <EcosystemCard
                                title="dotVM"
                                description="A parallel, multi-architecture virtual machine built for speed and security."
                                colorClass="text-primary"
                            />
                            <EcosystemCard
                                title="dotDB"
                                description="A custom state database optimized for SSD storage and MVCC, reducing node requirements."
                                colorClass="text-primary"
                            />
                            <EcosystemCard
                                title="dotUX"
                                description="Auto-generated front-ends and AI-driven tooling from your contract's I/O spec."
                                colorClass="text-primary"
                            />
                            <EcosystemCard
                                title="dotCloud"
                                description="Global hosting and zero-ops deployment through our Microsoft Azure partnership."
                                colorClass="text-primary"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 