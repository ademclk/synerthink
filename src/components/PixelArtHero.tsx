import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const PixelArtHero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let pixels: any[] = [];
        let mouseX = 0;
        let mouseY = 0;
        let isHovering = false;
        let lastThemeCheck = 0;
        let cachedColors: number[][] = [];

        const sketch = (p: any) => {
            const pixelSize = 12; // Perfect square size
            const spacing = 16; // Spacing between pixels
            const hoverRadius = 60; // Radius of hover effect
            const hoverRadiusSquared = hoverRadius * hoverRadius; // Cache squared distance
            let frameCount = 0;

            const updateColors = () => {
                const isDark = document.documentElement.classList.contains('dark');

                // Cache colors array for performance
                cachedColors = [
                    [0, 180, 200], // Primary cyan
                    isDark ? [50, 50, 50] : [100, 100, 100], // Gray - lighter in dark mode for better contrast
                    isDark ? [0, 0, 0] : [255, 255, 255], // Background blend - matches CSS background exactly
                    isDark ? [0, 0, 0] : [255, 255, 255] // Background for hover - same as background blend
                ];
            };

            const getRandomColorIndex = () => {
                const rand = Math.random();
                const isLargeScreen = window.innerWidth >= 768;

                // Primary cyan stays same for both
                if (rand < 0.1) return 0; // Primary cyan (10%)

                // Different gray percentages based on screen size
                if (isLargeScreen) {
                    if (rand < 0.35) return 1; // Gray (25% on large screens)
                    return 2; // Background blend (65%)
                } else {
                    if (rand < 0.3) return 1; // Gray (20% on mobile)
                    return 2; // Background blend (70%)
                }
            };

            const createPixelGrid = () => {
                pixels = [];
                // Use consistent spacing for even distribution
                const effectiveSpacing = spacing * (window.innerWidth < 768 ? 1.5 : 1);
                const cols = Math.floor(p.width / effectiveSpacing);
                const rows = Math.floor(p.height / effectiveSpacing);

                // Increase pixel limit and use random sampling to avoid patterns
                const maxPixels = 1500; // Increased limit
                const totalPixels = cols * rows;

                if (totalPixels <= maxPixels) {
                    // If within limit, create all pixels
                    for (let col = 0; col < cols; col++) {
                        for (let row = 0; row < rows; row++) {
                            const x = col * effectiveSpacing + effectiveSpacing / 2;
                            const y = row * effectiveSpacing + effectiveSpacing / 2;

                            pixels.push({
                                x: x,
                                y: y,
                                originalColorIndex: getRandomColorIndex(),
                                currentColorIndex: getRandomColorIndex(),
                                targetColorIndex: getRandomColorIndex(),
                                colorTransition: 0,
                                transitionSpeed: 0.01 + Math.random() * 0.02,
                                nextTransitionTime: Math.random() * 4000 + 2000, // 2-6 seconds
                                lastTransitionTime: 0,
                                opacity: 0.7 + Math.random() * 0.3, // Slight opacity variation
                                isHovered: false,
                                hoverTransition: 0,
                                hoverSpeed: 0.08, // Speed of hover transition
                                needsUpdate: true, // Flag to skip unnecessary calculations
                                cachedFinalColor: [0, 0, 0] // Cache final color
                            });
                        }
                    }
                } else {
                    // Use random sampling to avoid diagonal patterns
                    const keepProbability = maxPixels / totalPixels;

                    for (let col = 0; col < cols; col++) {
                        for (let row = 0; row < rows; row++) {
                            // Random sampling to avoid systematic patterns
                            if (Math.random() < keepProbability) {
                                const x = col * effectiveSpacing + effectiveSpacing / 2;
                                const y = row * effectiveSpacing + effectiveSpacing / 2;

                                pixels.push({
                                    x: x,
                                    y: y,
                                    originalColorIndex: getRandomColorIndex(),
                                    currentColorIndex: getRandomColorIndex(),
                                    targetColorIndex: getRandomColorIndex(),
                                    colorTransition: 0,
                                    transitionSpeed: 0.01 + Math.random() * 0.02,
                                    nextTransitionTime: Math.random() * 4000 + 2000, // 2-6 seconds
                                    lastTransitionTime: 0,
                                    opacity: 0.7 + Math.random() * 0.3, // Slight opacity variation
                                    isHovered: false,
                                    hoverTransition: 0,
                                    hoverSpeed: 0.08, // Speed of hover transition
                                    needsUpdate: true, // Flag to skip unnecessary calculations
                                    cachedFinalColor: [0, 0, 0] // Cache final color
                                });
                            }
                        }
                    }
                }
            };

            p.setup = () => {
                // Get container dimensions
                const container = containerRef.current;
                if (!container) return;

                const rect = container.getBoundingClientRect();
                p.createCanvas(rect.width, rect.height);
                p.noStroke();
                updateColors();

                // Create initial pixel grid
                createPixelGrid();

                // Style canvas - remove scaling that causes stretching
                const cnv = p.canvas as HTMLCanvasElement;
                cnv.style.position = 'absolute';
                cnv.style.top = '0';
                cnv.style.left = '0';
                cnv.style.display = 'block';
                cnv.style.pointerEvents = 'auto'; // Enable pointer events for hover
                cnv.style.zIndex = '1';
                cnv.style.cursor = 'auto'; // Keep default cursor
            };

            p.draw = () => {
                // Clear canvas with transparent background
                p.clear();

                const currentTime = p.millis();
                frameCount++;

                // Only check theme every 30 frames (~0.5 seconds) instead of every frame
                if (frameCount % 30 === 0 || cachedColors.length === 0) {
                    updateColors();
                }

                // Update pixel properties with optimizations
                pixels.forEach((pixel) => {
                    // Use squared distance for performance (avoid Math.sqrt)
                    const dx = mouseX - pixel.x;
                    const dy = mouseY - pixel.y;
                    const distanceSquared = dx * dx + dy * dy;
                    const wasHovered = pixel.isHovered;
                    pixel.isHovered = isHovering && distanceSquared < hoverRadiusSquared;

                    let hasChanged = false;

                    // Update hover transition
                    if (pixel.isHovered && pixel.hoverTransition < 1) {
                        pixel.hoverTransition += pixel.hoverSpeed;
                        pixel.hoverTransition = Math.min(pixel.hoverTransition, 1);
                        hasChanged = true;
                    } else if (!pixel.isHovered && pixel.hoverTransition > 0) {
                        pixel.hoverTransition -= pixel.hoverSpeed * 0.5; // Slower fade out
                        pixel.hoverTransition = Math.max(pixel.hoverTransition, 0);
                        hasChanged = true;
                    }

                    // Check if it's time to start a new color transition (only when not being hovered)
                    if (!pixel.isHovered && pixel.hoverTransition < 0.1) {
                        if (currentTime - pixel.lastTransitionTime > pixel.nextTransitionTime && pixel.colorTransition >= 1) {
                            pixel.currentColorIndex = pixel.targetColorIndex;
                            pixel.targetColorIndex = getRandomColorIndex();
                            pixel.colorTransition = 0;
                            pixel.lastTransitionTime = currentTime;
                            pixel.nextTransitionTime = Math.random() * 4000 + 2000; // 2-6 seconds
                            hasChanged = true;
                        }

                        // Update color transition
                        if (pixel.colorTransition < 1) {
                            pixel.colorTransition += pixel.transitionSpeed;
                            pixel.colorTransition = Math.min(pixel.colorTransition, 1);
                            hasChanged = true;
                        }
                    }

                    // Only recalculate final color if something changed
                    if (hasChanged || pixel.needsUpdate || frameCount <= 1) {
                        // Determine final color
                        if (pixel.hoverTransition > 0) {
                            // Blend between normal color and background color based on hover
                            const currentColor = cachedColors[pixel.currentColorIndex];
                            const targetColor = cachedColors[pixel.targetColorIndex];
                            const normalR = currentColor[0] + (targetColor[0] - currentColor[0]) * pixel.colorTransition;
                            const normalG = currentColor[1] + (targetColor[1] - currentColor[1]) * pixel.colorTransition;
                            const normalB = currentColor[2] + (targetColor[2] - currentColor[2]) * pixel.colorTransition;

                            const hoverColor = cachedColors[3];
                            pixel.cachedFinalColor = [
                                normalR + (hoverColor[0] - normalR) * pixel.hoverTransition,
                                normalG + (hoverColor[1] - normalG) * pixel.hoverTransition,
                                normalB + (hoverColor[2] - normalB) * pixel.hoverTransition
                            ];
                        } else {
                            // Normal color interpolation
                            const currentColor = cachedColors[pixel.currentColorIndex];
                            const targetColor = cachedColors[pixel.targetColorIndex];
                            pixel.cachedFinalColor = [
                                currentColor[0] + (targetColor[0] - currentColor[0]) * pixel.colorTransition,
                                currentColor[1] + (targetColor[1] - currentColor[1]) * pixel.colorTransition,
                                currentColor[2] + (targetColor[2] - currentColor[2]) * pixel.colorTransition
                            ];
                        }
                        pixel.needsUpdate = false;
                    }

                    // Draw perfect square pixel using cached color
                    p.fill(pixel.cachedFinalColor[0], pixel.cachedFinalColor[1], pixel.cachedFinalColor[2], pixel.opacity * 255);
                    p.rect(pixel.x - pixelSize / 2, pixel.y - pixelSize / 2, pixelSize, pixelSize);
                });
            };

            p.windowResized = () => {
                // Get new container dimensions
                const container = containerRef.current;
                if (!container) return;

                const rect = container.getBoundingClientRect();
                p.resizeCanvas(rect.width, rect.height);

                // Recreate pixel grid for new dimensions
                createPixelGrid();
            };

            // Mouse events
            p.mouseMoved = () => {
                const rect = containerRef.current?.getBoundingClientRect();
                if (rect) {
                    mouseX = p.mouseX;
                    mouseY = p.mouseY;
                }
            };
        };

        // Defer p5 initialization to avoid blocking main thread
        let p5Instance: any = null;
        const initTimeout = setTimeout(() => {
            if (containerRef.current) {
                p5Instance = new p5(sketch, containerRef.current);
            }
        }, 100); // Small delay to let main content render first

        // Handle window resize to ensure canvas stays in sync
        const handleResize = () => {
            if (containerRef.current && p5Instance) {
                const rect = containerRef.current.getBoundingClientRect();
                p5Instance.resizeCanvas(rect.width, rect.height);
            }
        };

        // Mouse event handlers
        const handleMouseEnter = () => {
            isHovering = true;
        };

        const handleMouseLeave = () => {
            isHovering = false;
        };

        window.addEventListener('resize', handleResize);
        const container = containerRef.current;
        container?.addEventListener('mouseenter', handleMouseEnter);
        container?.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearTimeout(initTimeout);
            window.removeEventListener('resize', handleResize);
            container?.removeEventListener('mouseenter', handleMouseEnter);
            container?.removeEventListener('mouseleave', handleMouseLeave);
            if (p5Instance) {
                p5Instance.remove();
            }
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 overflow-hidden" />;
};

export default PixelArtHero;
