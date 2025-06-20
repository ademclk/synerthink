import React from 'react';

const DevelopmentExperience: React.FC = () => {
    return (
        <>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-16 mb-6 pb-4 border-b border-foreground/10">
                Creation Without Friction
            </h2>
            <p className="text-lg leading-loose mb-6 text-foreground/80">
                Imagine a world where your tools disappear and only your creativity remains. Where building software feels as natural as sketching an idea on paper.
            </p>

            <blockquote className="border-l-4 border-primary pl-4 my-8">
                <p className="text-xl italic font-medium text-foreground/90 leading-loose">
                    "Development should feel like magic, not archaeology."
                </p>
            </blockquote>

            <h3 className="text-2xl font-bold text-primary mt-10 mb-4">
                Instant Everything
            </h3>
            <p className="text-lg leading-loose mb-6 text-foreground/80">
                No more waiting. No more setup. Your environment is ready the moment inspiration strikes.
            </p>
            <ul className="list-disc list-inside space-y-3 mb-6 pl-4 text-lg leading-loose text-foreground/80">
                <li>Zero-second startup time</li>
                <li>Live updates as you type</li>
                <li>Debugging that actually helps</li>
            </ul>

            <h3 className="text-2xl font-bold text-primary mt-10 mb-4">
                Confidence in Every Line
            </h3>
            <p className="text-lg leading-loose mb-6 text-foreground/80">
                Build with certainty. Our testing suite catches issues before they become problems.
            </p>
            <ul className="list-disc list-inside space-y-3 mb-6 pl-4 text-lg leading-loose text-foreground/80">
                <li>Tests write themselves</li>
                <li>Performance insights built-in</li>
                <li>Quality you can trust</li>
            </ul>

            <h3 className="text-2xl font-bold text-primary mt-10 mb-4">
                One Command to Rule Them All
            </h3>
            <p className="text-lg leading-loose mb-6 text-foreground/80">
                From your laptop to the world in seconds. Deployment should be the easiest part of your day.
            </p>
            <ul className="list-disc list-inside space-y-3 mb-6 pl-4 text-lg leading-loose text-foreground/80">
                <li>Single command deployment</li>
                <li>Scales without thinking</li>
                <li>Updates without downtime</li>
            </ul>
        </>
    );
};

DevelopmentExperience.displayName = 'DevelopmentExperience';

export default DevelopmentExperience; 