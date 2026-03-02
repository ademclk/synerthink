import React, { useRef, useEffect } from 'react';
import type p5 from 'p5';

type Pixel = {
    originalX: number;
    originalY: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    targetOpacity: number;
    phase: number;
};

const HeroArtwork: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let mouseX = 0;
        let mouseY = 0;
        let isHovered = false;
        let pixels: Pixel[] = [];

        const sketch = (p: p5) => {
            const pixelSize = 4;
            const spacing = 8;
            const waveRadius = 80;

            // Dithering pattern - creates classic pixel art look
            const ditherPattern = [
                [1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1]
            ];

            p.setup = () => {
                p.createCanvas(p.windowWidth, p.windowHeight);
                p.noStroke();

                // Create dithered pixel grid
                pixels = [];
                for (let x = 0; x < p.width; x += spacing) {
                    for (let y = 0; y < p.height; y += spacing) {
                        // Use dither pattern to determine if pixel should exist
                        const patternX = Math.floor(x / spacing) % 6;
                        const patternY = Math.floor(y / spacing) % 6;

                        if (ditherPattern[patternY][patternX]) {
                            pixels.push({
                                originalX: x,
                                originalY: y,
                                x: x,
                                y: y,
                                size: pixelSize,
                                opacity: 0.7,
                                targetOpacity: 0.7,
                                phase: p.random(0, p.TWO_PI) // For gentle animation
                            });
                        }
                    }
                }

                // Style canvas
                const cnv = p.canvas as HTMLCanvasElement;
                cnv.style.position = 'absolute';
                cnv.style.top = '0';
                cnv.style.left = '0';
                cnv.style.width = '100%';
                cnv.style.height = '100%';
                cnv.style.pointerEvents = 'none';
                cnv.style.zIndex = '1';
                // Remove any custom cursor
                cnv.style.cursor = 'auto';
            };

            p.draw = () => {
                p.clear();

                // Get theme-appropriate colors
                const isDark = document.documentElement.classList.contains('dark');
                const pixelColor = isDark ? [180, 180, 180] : [60, 60, 60];

                // Simple time-based animation
                const time = p.millis() * 0.001;

                // Update pixel properties
                pixels.forEach((pixel) => {
                    if (isHovered) {
                        const dist = p.dist(mouseX, mouseY, pixel.originalX, pixel.originalY);

                        if (dist < waveRadius) {
                            // Simple wave effect - just slight opacity and size changes
                            const wave = 1 - (dist / waveRadius);
                            pixel.targetOpacity = 0.4 + wave * 0.4;

                            // Very subtle position offset
                            const offset = p.sin(time * 2 + pixel.phase) * wave * 2;
                            pixel.x = pixel.originalX + offset;
                            pixel.y = pixel.originalY + offset;
                        } else {
                            pixel.targetOpacity = 0.3;
                            pixel.x = pixel.originalX;
                            pixel.y = pixel.originalY;
                        }
                    } else {
                        // Gentle breathing animation when not hovered
                        const breathe = p.sin(time * 0.5 + pixel.phase) * 0.1;
                        pixel.targetOpacity = 0.4 + breathe;
                        pixel.x = pixel.originalX;
                        pixel.y = pixel.originalY;
                    }

                    // Smooth interpolation
                    pixel.opacity = p.lerp(pixel.opacity, pixel.targetOpacity, 0.05);
                });

                // Draw pixels as circles (dots)
                pixels.forEach(pixel => {
                    p.fill(pixelColor[0], pixelColor[1], pixelColor[2], pixel.opacity * 255);
                    p.ellipse(pixel.x, pixel.y, pixel.size, pixel.size);
                });
            };

            p.windowResized = () => {
                p.resizeCanvas(p.windowWidth, p.windowHeight);

                // Recreate dithered pixel grid for new dimensions
                pixels = [];
                for (let x = 0; x < p.width; x += spacing) {
                    for (let y = 0; y < p.height; y += spacing) {
                        const patternX = Math.floor(x / spacing) % 6;
                        const patternY = Math.floor(y / spacing) % 6;

                        if (ditherPattern[patternY][patternX]) {
                            pixels.push({
                                originalX: x,
                                originalY: y,
                                x: x,
                                y: y,
                                size: pixelSize,
                                opacity: 0.7,
                                targetOpacity: 0.7,
                                phase: p.random(0, p.TWO_PI)
                            });
                        }
                    }
                }
            };
        };

        let isCancelled = false;
        let p5Instance: p5 | undefined;

        // Initialize p5
        (async () => {
            const { default: P5 } = await import('p5');
            if (isCancelled || !containerRef.current) return;
            p5Instance = new P5(sketch, containerRef.current);
        })();

        // Mouse tracking and hover handlers
        const handleMouseMove = (e: MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
            }
        };

        const handleMouseEnter = () => {
            isHovered = true;
        };

        const handleMouseLeave = () => {
            isHovered = false;
        };

        const container = containerRef.current;
        container?.addEventListener('mousemove', handleMouseMove);
        container?.addEventListener('mouseenter', handleMouseEnter);
        container?.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            isCancelled = true;
            container?.removeEventListener('mousemove', handleMouseMove);
            container?.removeEventListener('mouseenter', handleMouseEnter);
            container?.removeEventListener('mouseleave', handleMouseLeave);
            if (p5Instance) p5Instance.remove();
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 rounded-3xl overflow-hidden" style={{ cursor: 'auto' }} />;
};

export default HeroArtwork; 
