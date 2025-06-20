import React from 'react';

const DotVariants: React.FC = () => {
    return (
        <>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-16 mb-6 pb-4 border-b border-foreground/10">
                Your Creative Toolkit
            </h2>
            <p className="text-lg leading-loose mb-6 text-foreground/80">
                Every creator needs the right tools. These aren't just components—they're your superpowers, each designed to amplify a different aspect of your creative process.
            </p>

            <h3 className="text-2xl font-bold text-primary mt-10 mb-4">
                ParaDots: Scale Without Limits
            </h3>
            <p className="text-lg leading-loose mb-6 text-foreground/80">
                Your logic, multiplied across infinite cores. When one isn't enough, ParaDots make a thousand feel effortless.
            </p>
            <ul className="list-disc list-inside space-y-3 mb-6 pl-4 text-lg leading-loose text-foreground/80">
                <li>Thinks in parallel, naturally</li>
                <li>Optimizes resources automatically</li>
                <li>Coordinates without complexity</li>
            </ul>

            <h3 className="text-2xl font-bold text-primary mt-10 mb-4">
                DataDots: Structure Without Struggle
            </h3>
            <p className="text-lg leading-loose mb-6 text-foreground/80">
                Your data, exactly how you envision it. No migrations, no headaches—just information that flows like your thoughts.
            </p>
            <ul className="list-disc list-inside space-y-3 mb-6 pl-4 text-lg leading-loose text-foreground/80">
                <li>Validates with wisdom</li>
                <li>Transforms as you need</li>
                <li>Updates in real-time</li>
            </ul>

            <h3 className="text-2xl font-bold text-primary mt-10 mb-4">
                UILinks: Interfaces That Build Themselves
            </h3>
            <p className="text-lg leading-loose mb-6 text-foreground/80">
                Beautiful interfaces emerge from your logic, not the other way around. Focus on what users need; we'll handle how it looks.
            </p>
            <ul className="list-disc list-inside space-y-3 mb-6 pl-4 text-lg leading-loose text-foreground/80">
                <li>Generates beauty automatically</li>
                <li>Adapts to every screen</li>
                <li>Stays in perfect sync</li>
            </ul>

            <blockquote className="border-l-4 border-primary pl-4 my-8">
                <p className="text-xl italic font-medium text-foreground/90 leading-loose">
                    "Each Dot is a wish granted—the complexity handled, the power unleashed."
                </p>
            </blockquote>
        </>
    );
};

DotVariants.displayName = 'DotVariants';

export default DotVariants; 