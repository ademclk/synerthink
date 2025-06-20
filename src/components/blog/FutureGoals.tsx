import React from 'react';

const FutureGoals: React.FC = () => {
    return (
        <>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-16 mb-6 pb-4 border-b border-foreground/10">
                What's on the Horizon
            </h2>
            <p className="text-lg leading-loose mb-6 text-foreground/80">
                We're not just building a platform; we're crafting the future of creation itself. Here's where we're headed next.
            </p>

            <h3 className="text-2xl font-bold text-primary mt-10 mb-4">
                AI That Actually Helps
            </h3>
            <p className="text-lg leading-loose mb-6 text-foreground/80">
                Imagine describing your idea in plain English and watching it come to life. We're building AI that understands intent, not just syntax.
            </p>
            <ul className="list-disc list-inside space-y-3 mb-6 pl-4 text-lg leading-loose text-foreground/80">
                <li>Natural language to working code</li>
                <li>Smart suggestions that make sense</li>
                <li>Performance that self-optimizes</li>
                <li>Security that protects without asking</li>
            </ul>

            <h3 className="text-2xl font-bold text-primary mt-10 mb-4">
                Privacy That Can't Be Broken
            </h3>
            <p className="text-lg leading-loose mb-6 text-foreground/80">
                In a world where data is everything, we're building systems where privacy isn't a feature—it's the foundation. Your secrets stay secret, even from us.
            </p>
            <ul className="list-disc list-inside space-y-3 mb-6 pl-4 text-lg leading-loose text-foreground/80">
                <li>Private computation</li>
                <li>Secure collaboration</li>
                <li>Anonymous insights</li>
            </ul>

            <blockquote className="border-l-4 border-primary pl-4 my-8">
                <p className="text-xl italic font-medium text-foreground/90 leading-loose">
                    "The best technology is invisible. It gets out of your way and lets you create."
                </p>
                <cite className="block text-right mt-2 text-base text-foreground/60 not-italic">
                    — Our vision for tomorrow
                </cite>
            </blockquote>
        </>
    );
};

FutureGoals.displayName = 'FutureGoals';

export default FutureGoals; 