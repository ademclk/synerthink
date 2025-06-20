import React, { forwardRef } from 'react';

const DevelopmentExperience = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div ref={ref} className="mb-16">
            <div className="backdrop-blur-xl bg-foreground/10 rounded-full p-6 sm:p-8 md:p-12 border border-foreground/10 mb-8 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Creation Without Friction</h2>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                    Imagine a world where your tools disappear and only your creativity remains.
                    Where building software feels as natural as sketching an idea on paper.
                </p>
            </div>

            {/* Pull Quote */}
            <div className="backdrop-blur-xl bg-primary/10 rounded-full p-4 sm:p-6 md:p-8 border border-primary/20 mb-8 text-center">
                <p className="text-lg sm:text-xl md:text-2xl font-medium text-primary italic">
                    "Development should feel like magic, not archaeology."
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="backdrop-blur-xl bg-foreground/10 rounded-3xl p-6 sm:p-8 border border-foreground/10">
                    <div className="mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">Instant Everything</h3>
                        <div className="w-12 h-1 bg-primary/30 rounded-full"></div>
                    </div>
                    <p className="mb-4 sm:mb-6 text-foreground/80 leading-relaxed text-sm sm:text-base">
                        No more waiting. No more setup. Your environment is ready the moment inspiration strikes.
                    </p>
                    <div className="space-y-2 text-xs sm:text-sm text-foreground/70">
                        <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>Zero-second startup time</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>Live updates as you type</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>Debugging that actually helps</span>
                        </div>
                    </div>
                </div>

                <div className="backdrop-blur-xl bg-foreground/10 rounded-3xl p-6 sm:p-8 border border-foreground/10">
                    <div className="mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">Confidence in Every Line</h3>
                        <div className="w-12 h-1 bg-primary/30 rounded-full"></div>
                    </div>
                    <p className="mb-4 sm:mb-6 text-foreground/80 leading-relaxed text-sm sm:text-base">
                        Build with certainty. Our testing suite catches issues before they become problems.
                    </p>
                    <div className="space-y-2 text-xs sm:text-sm text-foreground/70">
                        <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>Tests write themselves</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>Performance insights built-in</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>Quality you can trust</span>
                        </div>
                    </div>
                </div>

                <div className="backdrop-blur-xl bg-foreground/10 rounded-3xl p-6 sm:p-8 border border-foreground/10 md:col-span-2 lg:col-span-1">
                    <div className="mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">One Command to Rule Them All</h3>
                        <div className="w-12 h-1 bg-primary/30 rounded-full"></div>
                    </div>
                    <p className="mb-4 sm:mb-6 text-foreground/80 leading-relaxed text-sm sm:text-base">
                        From your laptop to the world in seconds. Deployment should be the easiest part of your day.
                    </p>
                    <div className="space-y-2 text-xs sm:text-sm text-foreground/70">
                        <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>Single command deployment</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>Scales without thinking</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>Updates without downtime</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

DevelopmentExperience.displayName = 'DevelopmentExperience';

export default DevelopmentExperience; 