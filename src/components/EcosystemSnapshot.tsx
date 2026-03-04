import type { ReactNode } from "react";
import { Cloud, Cpu, Database, Sparkle } from "@phosphor-icons/react";

interface EcosystemCardProps {
    title: string;
    description: string;
    colorClass: string;
    icon: ReactNode;
}

const EcosystemCard = ({ title, description, colorClass, icon }: EcosystemCardProps) => {
    return (
        <div className="flex flex-col p-6 sm:p-8 rounded-[1.75rem] bg-foreground/10 glass glass-1 glass-float">
            <div className="flex items-start gap-4">
                <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
                    {icon}
                </div>
                <div className="min-w-0">
                    <span className={`font-bold text-xl md:text-2xl ${colorClass}`}>{title}</span>
                    <p className="mt-2 text-sm md:text-base text-foreground/80">
                        {description}
                    </p>
                </div>
            </div>
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
                                description="Parallel, multi-architecture VM built for speed and security."
                                colorClass="text-primary"
                                icon={<Cpu className="h-5 w-5 text-primary" weight="bold" />}
                            />
                            <EcosystemCard
                                title="dotDB"
                                description="State database optimized for SSD + MVCC to reduce node requirements."
                                colorClass="text-primary"
                                icon={<Database className="h-5 w-5 text-primary" weight="bold" />}
                            />
                            <EcosystemCard
                                title="dotUX"
                                description="Auto-generated front-ends + AI tooling from your contract’s I/O."
                                colorClass="text-primary"
                                icon={<Sparkle className="h-5 w-5 text-primary" weight="bold" />}
                            />
                            <EcosystemCard
                                title="dotCloud"
                                description="Global hosting and zero-ops deployment through our Azure partnership."
                                colorClass="text-primary"
                                icon={<Cloud className="h-5 w-5 text-primary" weight="bold" />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 
