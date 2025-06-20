import React, { forwardRef } from 'react';

const FutureGoals = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div ref={ref} className="mb-16">
            <div className="backdrop-blur-xl bg-foreground/10 rounded-full p-6 sm:p-8 md:p-12 border border-foreground/10 mb-8 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">What's on the Horizon</h2>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                    We're not just building a platform; we're crafting the future of creation itself.
                    Here's where we're headed next.
                </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
                <div className="backdrop-blur-xl bg-foreground/10 rounded-3xl p-6 sm:p-8 md:p-10 border border-foreground/10">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/60 rounded-full"></div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-primary">AI That Actually Helps</h3>
                    </div>
                    <p className="mb-4 sm:mb-6 text-foreground/80 leading-relaxed text-sm sm:text-base">
                        Imagine describing your idea in plain English and watching it come to life. We're building AI that understands intent, not just syntax.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="backdrop-blur-xl bg-foreground/5 rounded-full px-4 sm:px-6 py-3 sm:py-4 border border-foreground/10">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-2 h-2 bg-primary/60 rounded-full flex-shrink-0"></div>
                                <span className="font-medium text-foreground/80 text-xs sm:text-sm">Natural language to working code</span>
                            </div>
                        </div>
                        <div className="backdrop-blur-xl bg-foreground/5 rounded-full px-4 sm:px-6 py-3 sm:py-4 border border-foreground/10">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-2 h-2 bg-primary/60 rounded-full flex-shrink-0"></div>
                                <span className="font-medium text-foreground/80 text-xs sm:text-sm">Smart suggestions that make sense</span>
                            </div>
                        </div>
                        <div className="backdrop-blur-xl bg-foreground/5 rounded-full px-4 sm:px-6 py-3 sm:py-4 border border-foreground/10">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-2 h-2 bg-primary/60 rounded-full flex-shrink-0"></div>
                                <span className="font-medium text-foreground/80 text-xs sm:text-sm">Performance that self-optimizes</span>
                            </div>
                        </div>
                        <div className="backdrop-blur-xl bg-foreground/5 rounded-full px-4 sm:px-6 py-3 sm:py-4 border border-foreground/10">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-2 h-2 bg-primary/60 rounded-full flex-shrink-0"></div>
                                <span className="font-medium text-foreground/80 text-xs sm:text-sm">Security that protects without asking</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="backdrop-blur-xl bg-foreground/10 rounded-3xl p-6 sm:p-8 md:p-10 border border-foreground/10">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/60 rounded-lg"></div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-primary">Privacy That Can't Be Broken</h3>
                    </div>
                    <p className="mb-4 sm:mb-6 text-foreground/80 leading-relaxed text-sm sm:text-base">
                        In a world where data is everything, we're building systems where privacy isn't a feature—it's the foundation.
                        Your secrets stay secret, even from us.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="backdrop-blur-xl bg-foreground/5 rounded-full px-4 sm:px-6 py-3 sm:py-4 border border-foreground/10 text-center">
                            <div className="space-y-2">
                                <div className="w-8 h-8 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                                    <div className="w-3 h-3 bg-primary/60 rounded-full"></div>
                                </div>
                                <span className="font-medium text-foreground/80 text-xs sm:text-sm block">Private computation</span>
                            </div>
                        </div>
                        <div className="backdrop-blur-xl bg-foreground/5 rounded-full px-4 sm:px-6 py-3 sm:py-4 border border-foreground/10 text-center">
                            <div className="space-y-2">
                                <div className="w-8 h-8 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                                    <div className="w-3 h-3 bg-primary/60 rounded-sm"></div>
                                </div>
                                <span className="font-medium text-foreground/80 text-xs sm:text-sm block">Secure collaboration</span>
                            </div>
                        </div>
                        <div className="backdrop-blur-xl bg-foreground/5 rounded-full px-4 sm:px-6 py-3 sm:py-4 border border-foreground/10 text-center sm:col-span-3 lg:col-span-1">
                            <div className="space-y-2">
                                <div className="w-8 h-8 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                                    <div className="w-3 h-3 bg-primary/60 rounded"></div>
                                </div>
                                <span className="font-medium text-foreground/80 text-xs sm:text-sm block">Anonymous insights</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vision Quote */}
            <div className="backdrop-blur-xl bg-primary/10 rounded-full p-6 sm:p-8 md:p-10 border border-primary/20 mt-6 sm:mt-8 text-center">
                <p className="text-lg sm:text-xl md:text-2xl font-medium text-primary italic mb-2 sm:mb-4">
                    "The best technology is invisible. It gets out of your way and lets you create."
                </p>
                <p className="text-foreground/60 text-xs sm:text-sm">
                    Our vision for tomorrow
                </p>
            </div>
        </div>
    );
});

FutureGoals.displayName = 'FutureGoals';

export default FutureGoals; 