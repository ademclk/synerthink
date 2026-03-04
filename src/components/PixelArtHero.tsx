import { useRef, useEffect, useState } from 'react';
import type p5 from 'p5';

type NavigatorWithExtras = Navigator & {
    deviceMemory?: number;
    connection?: {
        effectiveType?: string;
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

    return cores < 4 ||
        (memory && memory < 4) ||
        isOldAndroid ||
        isOldIOS ||
        isSlowConnection ||
        false; // Default to false for unknown devices
};

const PixelArtHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLowEndDevice, setIsLowEndDevice] = useState<boolean>(false);
    const [staticPattern, setStaticPattern] = useState<string>('');

    // Generate a static SVG pattern for low-end devices
    const generateStaticPattern = () => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const pixelSize = 12;
        const spacing = 24; // Larger spacing for fewer pixels
        const cols = Math.floor(width / spacing);
        const rows = Math.floor(height / spacing);

        // Limit pixels for performance
        const maxPixels = 500;
        const totalPixels = cols * rows;
        const keepProbability = totalPixels > maxPixels ? maxPixels / totalPixels : 1;

        // Generate SVG pixels
        let svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;

        // Get theme colors
        const isDark = document.documentElement.classList.contains('dark');
        const primaryColor = '#00A6AE'; // Cyan
        const grayColor = isDark ? '#323232' : '#646464';
        const bgColor = isDark ? '#000000' : '#FFFFFF';

        const colors = [primaryColor, grayColor, bgColor];

        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                if (Math.random() < keepProbability) {
                    const x = col * spacing + spacing / 2 - pixelSize / 2;
                    const y = row * spacing + spacing / 2 - pixelSize / 2;
                    const r = Math.random();
                    const colorIndex = r < 0.08 ? 0 : (r < 0.34 ? 1 : 2);
                    const color = colors[colorIndex];
                    const opacity = 0.7 + Math.random() * 0.3;

                    svgContent += `<rect x="${x}" y="${y}" width="${pixelSize}" height="${pixelSize}" fill="${color}" opacity="${opacity}" />`;
                }
            }
        }

        svgContent += '</svg>';

        // Convert to data URL
        const dataUrl = `data:image/svg+xml;base64,${btoa(svgContent)}`;
        setStaticPattern(dataUrl);
    };

    useEffect(() => {
        // Detect device performance on mount
        const lowEnd = detectLowEndDevice();
        setIsLowEndDevice(lowEnd);

        // For low-end devices, generate a static SVG pattern once
        if (lowEnd) {
            // Delay generation to ensure container is sized
            setTimeout(generateStaticPattern, 100);

            // Add resize handler for static pattern
            const handleStaticResize = () => {
                setTimeout(generateStaticPattern, 100);
            };

            window.addEventListener('resize', handleStaticResize);

            return () => {
                window.removeEventListener('resize', handleStaticResize);
            };
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
        let initTimeout: ReturnType<typeof setTimeout> | undefined;

        (async () => {
            const { default: P5 } = await import('p5');
            if (isCancelled) return;

            initTimeout = window.setTimeout(() => {
                if (containerRef.current) {
                    p5Instance = new P5(sketch, containerRef.current);
                }
            }, 100); // Small delay to let main content render first
        })();

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
        const overlay = container?.querySelector('div') as HTMLElement; // Get the overlay div

        container?.addEventListener('mouseenter', handleMouseEnter);
        container?.addEventListener('mouseleave', handleMouseLeave);
        // Add touch event listeners to the overlay for better scroll performance
        overlay?.addEventListener('touchstart', handleTouchStart, { passive: true });
        overlay?.addEventListener('touchmove', handleTouchMove, { passive: true });
        overlay?.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            isCancelled = true;
            if (initTimeout) clearTimeout(initTimeout);
            window.removeEventListener('resize', handleResize);
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

    // Render static pattern for low-end devices
    if (isLowEndDevice) {
        return (
            <div ref={containerRef} className="absolute inset-0 overflow-hidden">
                {staticPattern && (
                    <div
                        className="absolute inset-0 bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${staticPattern})`,
                            backgroundSize: 'cover'
                        }}
                    />
                )}
                {/* Transparent overlay for touch events */}
                <div className="absolute inset-0 z-10 pointer-events-auto" />
            </div>
        );
    }

    // Render full interactive version for high-end devices
    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden">
            {/* Transparent overlay for touch events */}
            <div className="absolute inset-0 z-10 pointer-events-auto" />
        </div>
    );
};

export default PixelArtHero;
