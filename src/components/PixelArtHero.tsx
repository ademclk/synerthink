import { useRef, useEffect } from 'react';
import type p5 from 'p5';
import { loadP5 } from '@/lib/load-p5';

type NavigatorWithExtras = Navigator & {
    deviceMemory?: number;
    connection?: {
        effectiveType?: string;
        saveData?: boolean;
    };
};

type RGB = [number, number, number];

type Pixel = {
    x: number;
    y: number;
    originalColorIndex: number;
    currentColorIndex: number;
    targetColorIndex: number;
    colorTransition: number;
    transitionSpeed: number;
    nextTransitionTime: number;
    lastTransitionTime: number;
    opacity: number;
    isHovered: boolean;
    hoverTransition: number;
    hoverSpeed: number;
    needsUpdate: boolean;
    cachedFinalColor: RGB;
};

const STATIC_PATTERN_URL = '/pixel-hero.svg';

// Device performance detection utility
const detectLowEndDevice = (): boolean => {
    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 1;

    // Check memory (if available)
    const navigatorWithExtras = navigator as NavigatorWithExtras;
    const memory = navigatorWithExtras.deviceMemory;

    // Check user agent for old devices
    const ua = navigator.userAgent;
    const isOldAndroid = /Android\s([1-6]\.|7\.[0-1])/.test(ua);
    const isOldIOS = /iPhone OS [1-9]_/.test(ua) || /iPhone OS 1[0-2]_/.test(ua);

    // Low-end device criteria:
    // - Less than 4 CPU cores
    // - Less than 4GB RAM (if available)
    // - Old Android/iOS versions
    // - Connection speed (if available)
    const connection = navigatorWithExtras.connection;
    const effectiveType = connection?.effectiveType;
    const isSlowConnection = effectiveType === 'slow-2g' || effectiveType === '2g';
    const saveData = connection?.saveData === true;

    return cores < 4 ||
        (memory && memory < 4) ||
        isOldAndroid ||
        isOldIOS ||
        isSlowConnection ||
        saveData ||
        false; // Default to false for unknown devices
};

const PixelArtHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const hasStartedP5Ref = useRef(false);

    useEffect(() => {
        if (import.meta.env.SSR) return;
        // Detect device performance on mount
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
        const lowEnd = detectLowEndDevice() || prefersReducedMotion || isSmallScreen;

        if (lowEnd) {
            return;
        }

        let pixels: Pixel[] = [];
        let mouseX = 0;
        let mouseY = 0;
        let isHovering = false;
        let cachedColors: RGB[] = [];

        // Touch tracking for scroll detection
        let touchStartY = 0;
        let touchStartX = 0;
        let touchStartTime = 0;
        let isScrolling = false;

        const sketch = (p: p5) => {
            const pixelSize = 12; // Perfect square size
            const spacing = 16; // Spacing between pixels
            const hoverRadius = 60; // Radius of hover effect
            const hoverRadiusSquared = hoverRadius * hoverRadius; // Cache squared distance
            let frameCount = 0;

            const updateColors = () => {
                const isDark = document.documentElement.classList.contains('dark');

                // Cache colors array for performance
                cachedColors = [
                    [0, 166, 174], // Primary cyan
                    isDark ? [50, 50, 50] : [100, 100, 100], // Gray - lighter in dark mode for better contrast
                    isDark ? [0, 0, 0] : [255, 255, 255], // Background blend - matches CSS background exactly
                    isDark ? [0, 0, 0] : [255, 255, 255] // Background for hover - same as background blend
                ] as RGB[];
            };

            const getRandomColorIndex = () => {
                const rand = Math.random();
                const isLargeScreen = window.innerWidth >= 768;

                // Increase cyan presence significantly
                if (rand < 0.22) return 0; // Primary cyan (22%)

                // Different gray percentages based on screen size
                if (isLargeScreen) {
                    if (rand < 0.52) return 1; // Gray (30% on large screens)
                    return 2; // Background blend (48%)
                } else {
                    if (rand < 0.48) return 1; // Gray (26% on mobile)
                    return 2; // Background blend (52%)
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
                cnv.style.pointerEvents = 'none'; // Disable pointer events on canvas to allow scrolling
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
	        let isCancelled = false;
	        let p5Instance: p5 | null = null;

        const initP5 = async () => {
            if (hasStartedP5Ref.current) return;
            hasStartedP5Ref.current = true;
            const P5 = await loadP5();
            if (isCancelled) return;
            if (!containerRef.current) return;
            p5Instance = new P5(sketch, containerRef.current);
        };

        // Only load p5 after a real user interaction.
        const triggerInit = () => {
            initP5().catch(() => {
                // Best-effort only; keep the page usable even if p5 fails to load.
            });
        };

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

        // Touch event handlers for mobile devices with scroll detection
        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                touchStartY = e.touches[0].clientY;
                touchStartX = e.touches[0].clientX;
                touchStartTime = Date.now();
                isScrolling = false;

                if (p5Instance) {
                    const rect = containerRef.current?.getBoundingClientRect();
                    if (rect) {
                        mouseX = e.touches[0].clientX - rect.left;
                        mouseY = e.touches[0].clientY - rect.top;
                    }
                }

                // Only activate hover if not scrolling (wait a bit to determine)
                setTimeout(() => {
                    if (!isScrolling) {
                        isHovering = true;
                    }
                }, 100);
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const currentY = e.touches[0].clientY;
                const currentX = e.touches[0].clientX;
                const deltaY = Math.abs(currentY - touchStartY);
                const deltaX = Math.abs(currentX - touchStartX);
                const timeElapsed = Date.now() - touchStartTime;

                // Detect if this is a scroll gesture (vertical movement > threshold)
                if (deltaY > 10 && deltaY > deltaX && timeElapsed < 500) {
                    isScrolling = true;
                    isHovering = false;
                } else if (!isScrolling && p5Instance) {
                    // Only update hover position if we're not scrolling
                    const rect = containerRef.current?.getBoundingClientRect();
                    if (rect) {
                        mouseX = e.touches[0].clientX - rect.left;
                        mouseY = e.touches[0].clientY - rect.top;
                    }
                }
            }
        };

        const handleTouchEnd = () => {
            isHovering = false;
            isScrolling = false;
        };

        window.addEventListener('resize', handleResize);
        const container = containerRef.current;
        const overlay = container?.querySelector('[data-pixel-overlay]') as HTMLElement | null;

        window.addEventListener('keydown', triggerInit, { once: true });
        container?.addEventListener('pointerenter', triggerInit, { once: true, passive: true });
        container?.addEventListener('pointerdown', triggerInit, { once: true, passive: true });

        container?.addEventListener('mouseenter', handleMouseEnter);
        container?.addEventListener('mouseleave', handleMouseLeave);
        // Add touch event listeners to the overlay for better scroll performance
        overlay?.addEventListener('touchstart', handleTouchStart, { passive: true });
        overlay?.addEventListener('touchmove', handleTouchMove, { passive: true });
        overlay?.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            isCancelled = true;
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', triggerInit);
            container?.removeEventListener('pointerenter', triggerInit);
            container?.removeEventListener('pointerdown', triggerInit);
            container?.removeEventListener('mouseenter', handleMouseEnter);
            container?.removeEventListener('mouseleave', handleMouseLeave);
            // Remove touch event listeners
            overlay?.removeEventListener('touchstart', handleTouchStart);
            overlay?.removeEventListener('touchmove', handleTouchMove);
            overlay?.removeEventListener('touchend', handleTouchEnd);
            if (p5Instance) {
                p5Instance.remove();
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div
                className="absolute inset-0 z-0 bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${STATIC_PATTERN_URL})`, backgroundSize: 'cover' }}
            />
            {/* Transparent overlay for touch events */}
            <div data-pixel-overlay className="absolute inset-0 z-10 pointer-events-auto" />
        </div>
    );
};

export default PixelArtHero;
