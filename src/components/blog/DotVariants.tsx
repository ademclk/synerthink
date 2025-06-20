import React, { forwardRef } from 'react';

const DotVariants = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div ref={ref} className="mb-16">
            <div className="backdrop-blur-xl bg-foreground/10 rounded-full p-6 sm:p-8 md:p-12 border border-foreground/10 mb-8 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Your Creative Toolkit</h2>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                    Every creator needs the right tools. These aren't just components—they're your superpowers,
                    each designed to amplify a different aspect of your creative process.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="backdrop-blur-xl bg-foreground/10 rounded-3xl p-6 sm:p-8 border border-foreground/10 text-center">
                    <div className="mb-4 sm:mb-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/60 rounded-full"></div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-primary">ParaDots</h3>
                        <p className="text-foreground/60 text-sm mt-1 sm:mt-2">Scale Without Limits</p>
                    </div>
                    <p className="mb-4 sm:mb-6 text-foreground/80 leading-relaxed text-sm sm:text-base">
                        Your logic, multiplied across infinite cores. When one isn't enough, ParaDots make a thousand feel effortless.
                    </p>
                    <div className="space-y-3">
                        <div className="backdrop-blur-xl bg-foreground/5 rounded-full px-3 sm:px-4 py-2 border border-foreground/10">
                            <span className="text-foreground/70 text-xs sm:text-sm">Thinks in parallel, naturally</span>
                        </div>
                        <div className="backdrop-blur-xl bg-foreground/5 rounded-full px-3 sm:px-4 py-2 border border-foreground/10">
                            <span className="text-foreground/70 text-xs sm:text-sm">Optimizes resources automatically</span>
                        </div>
                        <div className="backdrop-blur-xl bg-foreground/5 rounded-full px-3 sm:px-4 py-2 border border-foreground/10">
                            <span className="text-foreground/70 text-xs sm:text-sm">Coordinates without complexity</span>
                        </div>
                    </div>
                </div>

                <div className="backdrop-blur-xl bg-foreground/10 rounded-3xl p-6 sm:p-8 border border-foreground/10 text-center">
                    <div className="mb-4 sm:mb-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <div className="w-6 h-8 sm:w-8 sm:h-10 bg-primary/60 rounded-sm"></div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-primary">DataDots</h3>
                        <p className="text-foreground/60 text-sm mt-1 sm:mt-2">Structure Without Struggle</p>
                    </div>
                    <p className="mb-4 sm:mb-6 text-foreground/80 leading-relaxed text-sm sm:text-base">
                        Your data, exactly how you envision it. No migrations, no headaches—just information that flows like your thoughts.
                    </p>
                    <div className="space-y-3">
                        <div className="backdrop-blur-xl bg-foreground/5 rounded-full px-3 sm:px-4 py-2 border border-foreground/10">
                            <span className="text-foreground/70 text-xs sm:text-sm">Validates with wisdom</span>
                        </div>
                        <div className="backdrop-blur-xl bg-foreground/5 rounded-full px-3 sm:px-4 py-2 border border-foreground/10">
                            <span className="text-foreground/70 text-xs sm:text-sm">Transforms as you need</span>
                        </div>
                        <div className="backdrop-blur-xl bg-foreground/5 rounded-full px-3 sm:px-4 py-2 border border-foreground/10">
                            <span className="text-foreground/70 text-xs sm:text-sm">Updates in real-time</span>
                        </div>
                    </div>
                </div>

                <div className="backdrop-blur-xl bg-foreground/10 rounded-3xl p-6 sm:p-8 border border-foreground/10 text-center md:col-span-2 lg:col-span-1">
                    <div className="mb-4 sm:mb-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/60 rounded-lg"></div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-primary">UILinks</h3>
                        <p className="text-foreground/60 text-sm mt-1 sm:mt-2">Interfaces That Build Themselves</p>
                    </div>
                    <p className="mb-4 sm:mb-6 text-foreground/80 leading-relaxed text-sm sm:text-base">
                        Beautiful interfaces emerge from your logic, not the other way around. Focus on what users need; we'll handle how it looks.
                    </p>
                    <div className="space-y-3">
                        <div className="backdrop-blur-xl bg-foreground/5 rounded-full px-3 sm:px-4 py-2 border border-foreground/10">
                            <span className="text-foreground/70 text-xs sm:text-sm">Generates beauty automatically</span>
                        </div>
                        <div className="backdrop-blur-xl bg-foreground/5 rounded-full px-3 sm:px-4 py-2 border border-foreground/10">
                            <span className="text-foreground/70 text-xs sm:text-sm">Adapts to every screen</span>
                        </div>
                        <div className="backdrop-blur-xl bg-foreground/5 rounded-full px-3 sm:px-4 py-2 border border-foreground/10">
                            <span className="text-foreground/70 text-xs sm:text-sm">Stays in perfect sync</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pull Quote */}
            <div className="backdrop-blur-xl bg-primary/10 rounded-full p-6 sm:p-8 md:p-10 border border-primary/20 mt-8 text-center">
                <p className="text-lg sm:text-xl md:text-2xl font-medium text-primary italic">
                    "Each Dot is a wish granted—the complexity handled, the power unleashed."
                </p>
            </div>
        </div>
    );
});

DotVariants.displayName = 'DotVariants';

export default DotVariants; 