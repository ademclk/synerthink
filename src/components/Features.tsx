import { useEffect, useRef, type ReactNode } from "react";
import type p5 from "p5";

type Star = {
    x: number;
    y: number;
    z: number;
    pz: number;
};

type Dot = {
    x: number;
    y: number;
    baseSize: number;
    phase: number;
};

// Warp Speed Animation with p5.js
function WarpSpeedAnimation() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        let isCancelled = false;
        let p5Instance: p5 | null = null;
        let isVisible = false;

        // Intersection Observer to pause animation when not visible
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    isVisible = entry.isIntersecting;
                    if (p5Instance) {
                        if (isVisible) {
                            p5Instance.loop();
                        } else {
                            p5Instance.noLoop();
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(containerRef.current);

        const sketch = (p: p5) => {
            let stars: Star[] = [];
            const numStars = 40; // Reduced number of stars
            let lastTime = 0;

            const createStars = () => {
                stars = [];
                for (let i = 0; i < numStars; i++) {
                    stars.push({
                        x: p.random(-p.width / 2, p.width / 2),
                        y: p.random(-p.height / 2, p.height / 2),
                        z: p.random(0, 1000),
                        pz: p.random(0, 1000)
                    });
                }
            };

            p.setup = () => {
                const container = canvasRef.current;
                if (!container) return;

                const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
                canvas.parent(canvasRef.current);
                p.background(0, 0);
                p.frameRate(30); // Limit frame rate

                createStars();
            };

            p.draw = () => {
                if (!isVisible) return;

                const currentTime = p.millis();
                if (currentTime - lastTime < 33) return; // ~30fps max
                lastTime = currentTime;

                p.clear();

                const isDark = document.documentElement.classList.contains('dark');
                const strokeColor = isDark ? [52, 211, 153] : [6, 182, 212]; // cyan colors

                p.translate(p.width / 2, p.height / 2);

                const speed = 6; // Reduced speed

                for (const star of stars) {
                    star.pz = star.z;
                    star.z -= speed;

                    if (star.z <= 0) {
                        star.z = 1000;
                        star.pz = 1000;
                        star.x = p.random(-p.width / 2, p.width / 2);
                        star.y = p.random(-p.height / 2, p.height / 2);
                    }

                    const x = p.map(star.x / star.z, 0, 1, 0, p.width);
                    const y = p.map(star.y / star.z, 0, 1, 0, p.height);
                    const px = p.map(star.x / star.pz, 0, 1, 0, p.width);
                    const py = p.map(star.y / star.pz, 0, 1, 0, p.height);

                    const alpha = p.map(star.z, 0, 1000, 255, 180);
                    p.stroke(strokeColor[0], strokeColor[1], strokeColor[2], alpha);
                    p.strokeWeight(p.map(star.z, 0, 1000, 4, 1.5));

                    p.line(px, py, x, y);
                }
            };

            p.windowResized = () => {
                const container = canvasRef.current;
                if (container) {
                    p.resizeCanvas(container.offsetWidth, container.offsetHeight);
                    createStars();
                }
            };
        };

        (async () => {
            const { default: P5 } = await import("p5");
            if (isCancelled || !canvasRef.current) return;
            p5Instance = new P5(sketch, canvasRef.current);
        })();

        return () => {
            isCancelled = true;
            observer.disconnect();
            if (p5Instance) {
                p5Instance.remove();
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full">
            <div ref={canvasRef} className="w-full h-full" />
        </div>
    );
}

// Modular APIs Animation with p5.js
function ModularAPIsAnimation() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        let isCancelled = false;
        let p5Instance: p5 | null = null;
        let isVisible = false;

        // Intersection Observer to pause animation when not visible
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    isVisible = entry.isIntersecting;
                    if (p5Instance) {
                        if (isVisible) {
                            p5Instance.loop();
                        } else {
                            p5Instance.noLoop();
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(containerRef.current);

        const sketch = (p: p5) => {
            let dots: Dot[] = [];
            let animationTime = 0;
            let lastTime = 0;

            const createDots = () => {
                dots = [];
                const spacing = window.innerWidth < 768 ? 10 : 12;
                const centerX = p.width / 2;
                const centerY = p.height / 2;
                const radiusX = p.width / 2 - 10;
                const radiusY = p.height / 2 - 10;

                for (let x = spacing; x < p.width; x += spacing) {
                    for (let y = spacing; y < p.height; y += spacing) {
                        const dx = (x - centerX) / radiusX;
                        const dy = (y - centerY) / radiusY;
                        if (dx * dx + dy * dy <= 1) {
                            dots.push({
                                x: x,
                                y: y,
                                baseSize: p.random(2, 6),
                                phase: p.random(0, Math.PI * 2)
                            });
                        }
                    }
                }
            };

            p.setup = () => {
                const container = canvasRef.current;
                if (!container) return;

                const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
                canvas.parent(canvasRef.current);
                p.background(0, 0);
                p.noStroke();
                p.frameRate(30); // Limit frame rate to save resources

                createDots();
            };

            p.draw = () => {
                if (!isVisible) return;

                const currentTime = p.millis();
                if (currentTime - lastTime < 33) return; // ~30fps max
                lastTime = currentTime;

                animationTime += 0.02;
                p.clear();

                const isDark = document.documentElement.classList.contains('dark');

                for (const dot of dots) {
                    const wave = Math.sin(animationTime * 2 + dot.phase);
                    const size = dot.baseSize + wave * 2;
                    const alpha = 120 + wave * 80;

                    if (isDark) {
                        p.fill(52, 211, 153, alpha);
                    } else {
                        p.fill(6, 182, 212, alpha);
                    }

                    p.rect(dot.x - size / 2, dot.y - size / 2, size, size);
                }
            };

            p.windowResized = () => {
                const container = canvasRef.current;
                if (container) {
                    p.resizeCanvas(container.offsetWidth, container.offsetHeight);
                    createDots();
                }
            };
        };

        (async () => {
            const { default: P5 } = await import("p5");
            if (isCancelled || !canvasRef.current) return;
            p5Instance = new P5(sketch, canvasRef.current);
        })();

        return () => {
            isCancelled = true;
            observer.disconnect();
            if (p5Instance) {
                p5Instance.remove();
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full">
            <div ref={canvasRef} className="w-full h-full" />
        </div>
    );
}

interface FeatureCardProps {
    title: string;
    colorClass: string;
    bgClass: string;
    span?: string;
    children?: ReactNode;
}

const FeatureCard = ({ title, colorClass, bgClass, span = "", children }: FeatureCardProps) => {
    const defaultBgClass = "bg-foreground/10 backdrop-blur-lg";
    const appliedBgClass = bgClass || defaultBgClass;

    return (
        <div
            className={`relative ${appliedBgClass} border border-border rounded-full transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 cursor-pointer group ${span} px-4 py-3 min-h-[60px] flex flex-col items-center justify-center`}
        >
            {children ? (
                children
            ) : (
                <span className={`font-bold text-base md:text-lg text-center ${colorClass} group-hover:text-primary transition-colors duration-300`}>
                    {title}
                </span>
            )}

            {/* Interactive glow effect on hover */}
            <div className="absolute inset-0 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
    );
};

export default function Features() {
    return (
        <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 sm:mb-16 md:mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Introducing Dotlanth</h2>
                    <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
                        Write your business logic once, deploy instantly, and get a polished UI out of the box.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 auto-rows-[60px] sm:auto-rows-[70px] md:auto-rows-[80px] lg:auto-rows-[90px] xl:auto-rows-[100px]">
                    {/* Modular APIs at top-left */}
                    <div className="relative col-span-2 row-span-2">
                        {/* Animation behind the card */}
                        <div className="absolute inset-0 overflow-hidden rounded-full">
                            <ModularAPIsAnimation />
                        </div>

                        {/* Card with backdrop blur over the animation */}
                        <div className="absolute inset-0 bg-foreground/10 backdrop-blur-lg border border-border rounded-full transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 cursor-pointer group flex flex-col items-center justify-center">
                            <span className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl texy-primary group-hover:text-primary transition-colors duration-300 text-center select-none px-4">
                                Modular APIs
                            </span>
                        </div>
                    </div>

                    {/* Regular cards in the middle */}
                    <FeatureCard
                        title="Instant Scale"
                        colorClass="texy-primary"
                        bgClass=""
                    >
                        <div className="relative z-10 flex flex-col items-center justify-center px-3">
                            <span className="font-bold text-base sm:text-lg md:text-xl text-center texy-primary group-hover:text-primary transition-colors duration-300">
                                Instant Scale
                            </span>
                        </div>
                    </FeatureCard>

                    <FeatureCard title="Built-In UI" colorClass="texy-primary" bgClass="">
                        <div className="relative z-10 flex flex-col items-center justify-center px-3">
                            <span className="font-bold text-base sm:text-lg md:text-xl text-center texy-primary group-hover:text-primary transition-colors duration-300">
                                Built-In UI
                            </span>
                        </div>
                    </FeatureCard>

                    <FeatureCard title="Live Metrics" colorClass="texy-primary" bgClass="">
                        <div className="relative z-10 flex flex-col items-center justify-center px-3">
                            <span className="font-bold text-sm sm:text-base md:text-lg text-center texy-primary group-hover:text-primary transition-colors duration-300">
                                Live Metrics
                            </span>
                        </div>
                    </FeatureCard>

                    <FeatureCard title="Custom Workflows" colorClass="texy-primary" bgClass="">
                        <div className="relative z-10 flex flex-col items-center justify-center px-3">
                            <span className="font-bold text-sm sm:text-base md:text-lg text-center texy-primary group-hover:text-primary transition-colors duration-300">
                                Custom Workflows
                            </span>
                        </div>
                    </FeatureCard>

                    {/* Privacy Controls - wider card */}
                    <FeatureCard
                        title="Privacy Controls"
                        colorClass="texy-primary"
                        bgClass=""
                        span="col-span-2"
                    >
                        <div className="relative z-10 flex flex-col items-center justify-center px-3">
                            <span className="font-bold text-base sm:text-lg md:text-xl text-center texy-primary group-hover:text-primary transition-colors duration-300">
                                Privacy Controls
                            </span>
                        </div>
                    </FeatureCard>

                    {/* Auto Updates at bottom-right */}
                    <div className="relative col-span-2 row-span-2">
                        {/* Animation behind the card */}
                        <div className="absolute inset-0 overflow-hidden rounded-full">
                            <WarpSpeedAnimation />
                        </div>

                        {/* Card with backdrop blur over the animation */}
                        <div className="absolute inset-0 bg-foreground/10 backdrop-blur-sm border border-border rounded-full transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 cursor-pointer group flex flex-col items-center justify-center">
                            <span className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl texy-primary group-hover:text-primary transition-colors duration-300 text-center px-4">
                                Auto Updates
                            </span>
                        </div>
                    </div>

                    {/* Built-In Storage - wider card */}
                    <FeatureCard
                        title="Built-In Storage"
                        colorClass="texy-primary"
                        bgClass=""
                        span="col-span-2"
                    >
                        <div className="relative z-10 flex flex-col items-center justify-center px-3">
                            <span className="font-bold text-base sm:text-lg md:text-xl text-center texy-primary group-hover:text-primary transition-colors duration-300">
                                Built-In Storage
                            </span>
                        </div>
                    </FeatureCard>
                </div>
            </div>
        </section>
    );
} 
