import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import p5 from 'p5';

gsap.registerPlugin(ScrollTrigger);

interface StepProps {
    title: string;
    stepNumber: number;
    animationType: 'write' | 'deploy' | 'scale';
}

const Step = ({ title, stepNumber, animationType }: StepProps) => {
    const stepRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        let p5Instance: any = null;

        const sketch = (p: any) => {
            let animationTime = 0;
            const pixelSize = 8;
            let isDarkMode = false;

            p.setup = () => {
                const canvas = p.createCanvas(200, 40);
                canvas.parent(canvasRef.current);
                p.noStroke();
            };

            // Check for dark mode
            const checkDarkMode = () => {
                const htmlElement = document.documentElement;
                isDarkMode = htmlElement.classList.contains('dark');
            };

            // Get theme-compatible colors
            const getColors = () => {
                checkDarkMode();
                return {
                    primary: isDarkMode ? [6, 182, 212] : [8, 145, 178], // cyan-500 / cyan-600
                    background: isDarkMode ? [3, 7, 18] : [248, 250, 252], // gray-950 / gray-50
                    muted: isDarkMode ? [100, 116, 139] : [148, 163, 184] // slate-500 / slate-400
                };
            };

            p.draw = () => {
                const colors = getColors();

                // Clear with transparent background
                p.clear();

                animationTime += 0.016; // ~60fps

                if (animationType === 'write') {
                    drawWriteAnimation(colors);
                } else if (animationType === 'deploy') {
                    drawDeployAnimation(colors);
                } else if (animationType === 'scale') {
                    drawScaleAnimation(colors);
                }
            };

            const drawWriteAnimation = (colors: any) => {
                // Continuous typing animation with 3 dots appearing and fading
                const cycleTime = 3; // 3 second cycle
                const progress = (animationTime % cycleTime) / cycleTime;

                const centerX = p.width / 2;
                const centerY = p.height / 2;
                const spacing = 20;

                // Draw cursor first (blinking)
                const cursorAlpha = Math.sin(animationTime * 4) > 0 ? 255 : 100;
                p.fill(colors.muted[0], colors.muted[1], colors.muted[2], cursorAlpha);
                p.rect(centerX - spacing * 1.8, centerY - pixelSize / 2, 2, pixelSize);

                // Three dots with staggered appearance and cycling fade
                for (let i = 0; i < 3; i++) {
                    const dotDelay = i * 0.2;
                    const dotProgress = (progress + dotDelay) % 1;

                    let alpha = 0;
                    if (dotProgress < 0.3) {
                        // Fade in
                        alpha = (dotProgress / 0.3) * 255;
                    } else if (dotProgress < 0.7) {
                        // Stay visible
                        alpha = 255;
                    } else {
                        // Fade out
                        alpha = (1 - (dotProgress - 0.7) / 0.3) * 255;
                    }

                    const dotX = centerX - spacing + (i * spacing);
                    p.fill(colors.primary[0], colors.primary[1], colors.primary[2], alpha);
                    p.rect(dotX - pixelSize / 2, centerY - pixelSize / 2, pixelSize, pixelSize);
                }
            };

            const drawDeployAnimation = (colors: any) => {
                // Continuous left-to-right movement
                const cycleTime = 2.5; // 2.5 second cycle
                const progress = (animationTime % cycleTime) / cycleTime;

                const startX = 40;
                const endX = p.width - 40;
                const centerY = p.height / 2;

                // Multiple dots moving from left to right with staggered timing
                for (let i = 0; i < 3; i++) {
                    const dotDelay = i * 0.3;
                    const dotProgress = (progress + dotDelay) % 1;

                    const dotX = startX + (endX - startX) * dotProgress;
                    const alpha = Math.sin(dotProgress * Math.PI) * 255; // Fade in and out during travel

                    p.fill(colors.primary[0], colors.primary[1], colors.primary[2], alpha);
                    p.rect(dotX - pixelSize / 2, centerY - pixelSize / 2, pixelSize, pixelSize);
                }
            };

            const drawScaleAnimation = (colors: any) => {
                // Continuous scaling: dot comes from left, scales up, scales down, goes right
                const cycleTime = 4; // 4 second cycle
                const progress = (animationTime % cycleTime) / cycleTime;

                const centerX = p.width / 2;
                const centerY = p.height / 2;
                const startX = 40;
                const endX = p.width - 40;

                if (progress < 0.25) {
                    // Phase 1: Dot arrives from left
                    const arrivalProgress = progress / 0.25;
                    const dotX = startX + (centerX - startX) * arrivalProgress;

                    p.fill(colors.primary[0], colors.primary[1], colors.primary[2], 255);
                    p.rect(dotX - pixelSize / 2, centerY - pixelSize / 2, pixelSize, pixelSize);
                } else if (progress < 0.5) {
                    // Phase 2: Scale up into 2x2 grid
                    const scaleProgress = (progress - 0.25) / 0.25;
                    const gridSize = 2;
                    const spacing = pixelSize * 1.2;

                    // Original dot fades out
                    const originalAlpha = (1 - scaleProgress) * 255;
                    if (originalAlpha > 0) {
                        p.fill(colors.primary[0], colors.primary[1], colors.primary[2], originalAlpha);
                        p.rect(centerX - pixelSize / 2, centerY - pixelSize / 2, pixelSize, pixelSize);
                    }

                    // Grid dots fade in
                    const gridAlpha = scaleProgress * 255;
                    for (let i = 0; i < gridSize; i++) {
                        for (let j = 0; j < gridSize; j++) {
                            const gridX = centerX - spacing / 2 + j * spacing;
                            const gridY = centerY - spacing / 2 + i * spacing;

                            p.fill(colors.primary[0], colors.primary[1], colors.primary[2], gridAlpha);
                            p.rect(gridX - pixelSize / 2, gridY - pixelSize / 2, pixelSize, pixelSize);
                        }
                    }
                } else if (progress < 0.75) {
                    // Phase 3: Scale down back to single dot
                    const scaleDownProgress = (progress - 0.5) / 0.25;
                    const gridSize = 2;
                    const spacing = pixelSize * 1.2;

                    // Grid dots fade out
                    const gridAlpha = (1 - scaleDownProgress) * 255;
                    for (let i = 0; i < gridSize; i++) {
                        for (let j = 0; j < gridSize; j++) {
                            const gridX = centerX - spacing / 2 + j * spacing;
                            const gridY = centerY - spacing / 2 + i * spacing;

                            p.fill(colors.primary[0], colors.primary[1], colors.primary[2], gridAlpha);
                            p.rect(gridX - pixelSize / 2, gridY - pixelSize / 2, pixelSize, pixelSize);
                        }
                    }

                    // Single dot fades in
                    const singleAlpha = scaleDownProgress * 255;
                    p.fill(colors.primary[0], colors.primary[1], colors.primary[2], singleAlpha);
                    p.rect(centerX - pixelSize / 2, centerY - pixelSize / 2, pixelSize, pixelSize);
                } else {
                    // Phase 4: Dot travels to right and fades out
                    const exitProgress = (progress - 0.75) / 0.25;
                    const dotX = centerX + (endX - centerX) * exitProgress;
                    const alpha = (1 - exitProgress) * 255;

                    p.fill(colors.primary[0], colors.primary[1], colors.primary[2], alpha);
                    p.rect(dotX - pixelSize / 2, centerY - pixelSize / 2, pixelSize, pixelSize);
                }
            };
        };

        p5Instance = new p5(sketch, canvasRef.current);

        return () => {
            if (p5Instance) {
                p5Instance.remove();
            }
        };
    }, [animationType]);

    return (
        <div ref={stepRef} className="group flex flex-col items-center">
            {/* Pill-shaped container with text and animation */}
            <div className="relative bg-foreground/10 backdrop-blur-3xl border border-border rounded-full px-12 py-8 min-w-[280px] h-[180px] flex flex-col items-center justify-center transition-all duration-300 group-hover:border-primary/60 group-hover:shadow-lg group-hover:shadow-primary/20 cursor-pointer">
                {/* Step number */}
                <div className="text-sm font-medium text-primary/60 mb-2">
                    {stepNumber.toString().padStart(2, '0')}
                </div>

                {/* Main title */}
                <h3 className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 text-center mb-4">
                    {title}
                </h3>

                {/* Animation area at bottom */}
                <div ref={canvasRef} className="relative" />

                {/* Interactive glow effect on hover */}
                <div className="absolute inset-0 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
        </div>
    );
};

export default function HowItWorks() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = sectionRef.current;
        if (!element) return;

        gsap.fromTo(element.querySelector('.section-header'),
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-20 sm:py-24 md:py-28 px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32">
            <div className="max-w-6xl mx-auto">
                {/* Clean, confident typography header */}
                <div className="section-header text-center mb-20 sm:mb-24 md:mb-28">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                        From a single dot to a global scale.
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl text-foreground/70 max-w-2xl mx-auto">
                        Three simple steps. Infinite possibilities.
                    </p>
                </div>

                {/* The Triptych - Three pill-shaped containers with animations */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
                    <Step
                        title="Write"
                        stepNumber={1}
                        animationType="write"
                    />
                    <Step
                        title="Deploy"
                        stepNumber={2}
                        animationType="deploy"
                    />
                    <Step
                        title="Scale"
                        stepNumber={3}
                        animationType="scale"
                    />
                </div>
            </div>
        </section>
    );
} 