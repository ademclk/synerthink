import React from 'react';

const TechnicalArchitecture: React.FC = () => {
    return (
        <>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-16 mb-6 pb-4 border-b border-foreground/10">
                The Engine of Simplicity
            </h2>
            <p className="text-lg leading-loose mb-6 text-foreground/80">
                At the heart of Dotlanth lies something extraordinary: technology that disappears. Our infrastructure is designed to be invisible, powerful, and effortlessly fast.
            </p>

            <h3 className="text-2xl font-bold text-primary mt-10 mb-4">
                The DOTVM: A Heart Built for Speed
            </h3>
            <p className="text-lg leading-loose mb-6 text-foreground/80">
                Our custom-built virtual machine executes your logic with maximum efficiency, without the bloat of traditional runtimes.
            </p>
            <ul className="list-disc list-inside space-y-3 mb-6 pl-4 text-lg leading-loose text-foreground/80">
                <li>Blazing-fast execution that keeps you in flow</li>
                <li>See your changes live, the moment you save</li>
                <li>Rock-solid stability you can trust</li>
            </ul>

            <h3 className="text-2xl font-bold text-primary mt-10 mb-4">
                DOTDB: Data That Just Works
            </h3>
            <p className="text-lg leading-loose mb-6 text-foreground/80">
                Your data deserves better than complex migrations and midnight panics. DOTDB handles the complexity so you don't have to.
            </p>
            <ul className="list-disc list-inside space-y-3 mb-6 pl-4 text-lg leading-loose text-foreground/80">
                <li>Zero-configuration setup that works instantly</li>
                <li>Scales automatically as you grow</li>
                <li>Built-in reliability and consistency</li>
            </ul>
        </>
    );
};

TechnicalArchitecture.displayName = 'TechnicalArchitecture';

export default TechnicalArchitecture; 