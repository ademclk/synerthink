import React, { forwardRef } from 'react';

const TechnicalArchitecture = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div ref={ref} className="mb-16">
            <div className="backdrop-blur-xl bg-foreground/10 rounded-full p-6 sm:p-8 md:p-12 border border-foreground/10 mb-8 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">The Engine of Simplicity</h2>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                    At the heart of Dotlanth lies something extraordinary: technology that disappears.
                    Our infrastructure is designed to be invisible, powerful, and effortlessly fast.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
                <div className="backdrop-blur-xl bg-foreground/10 rounded-3xl p-6 sm:p-8 border border-foreground/10">
                    <div className="mb-4 sm:mb-6">
                        <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">The DOTVM: A Heart Built for Speed</h3>
                        <div className="w-12 h-1 bg-primary/30 rounded-full"></div>
                    </div>
                    <p className="mb-4 sm:mb-6 text-foreground/80 leading-relaxed text-sm sm:text-base">
                        Our custom-built virtual machine executes your logic with maximum efficiency, without the bloat of traditional runtimes.
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-foreground/80 text-sm sm:text-base">Blazing-fast execution that keeps you in flow</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-foreground/80 text-sm sm:text-base">See your changes live, the moment you save</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-foreground/80 text-sm sm:text-base">Rock-solid stability you can trust</span>
                        </div>
                    </div>
                </div>

                <div className="backdrop-blur-xl bg-foreground/10 rounded-3xl p-6 sm:p-8 border border-foreground/10">
                    <div className="mb-4 sm:mb-6">
                        <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">DOTDB: Data That Just Works</h3>
                        <div className="w-12 h-1 bg-primary/30 rounded-full"></div>
                    </div>
                    <p className="mb-4 sm:mb-6 text-foreground/80 leading-relaxed text-sm sm:text-base">
                        Your data deserves better than complex migrations and midnight panics. DOTDB handles the complexity so you don't have to.
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-foreground/80 text-sm sm:text-base">Zero-configuration setup that works instantly</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-foreground/80 text-sm sm:text-base">Scales automatically as you grow</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-foreground/80 text-sm sm:text-base">Built-in reliability and consistency</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

TechnicalArchitecture.displayName = 'TechnicalArchitecture';

export default TechnicalArchitecture; 