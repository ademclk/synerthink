import { useEffect, useState, useRef, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import SynerthinkLogo from "./synerthink-logo";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const NAV_LINKS = [
    { name: "Products", href: "/products" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
];

let gsapPromise: Promise<typeof import("gsap")["default"]> | null = null;

async function loadGsap() {
    if (!gsapPromise) {
        gsapPromise = import("gsap")
            .then((module) => module.default)
            .catch((error) => {
                gsapPromise = null;
                throw error;
            });
    }

    return gsapPromise;
}

function useBodyScrollLock(isLocked: boolean) {
    useEffect(() => {
        if (isLocked) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isLocked]);
}

export default function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isMenuRendered, setMenuRendered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const menuOverlayRef = useRef<HTMLDivElement>(null);
    const topLineRef = useRef<SVGPolylineElement>(null);
    const middleLineRef = useRef<SVGPolylineElement>(null);
    const bottomLineRef = useRef<SVGPolylineElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useBodyScrollLock(isMenuRendered);

    const closeMenu = () => {
        if (!isAnimating) {
            setMenuOpen(false);
        }
    };

    const toggleMenu = () => {
        if (isAnimating) return;
        if (isMenuOpen) {
            setMenuOpen(false);
            return;
        }

        setMenuRendered(true);
        setMenuOpen(true);
    };

    const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
        if (!isMenuOpen) return;

        if (event.key === "Escape") {
            event.preventDefault();
            closeMenu();
            return;
        }

        if (event.key !== "Tab") return;

        const root = menuOverlayRef.current;
        if (!root) return;

        const focusable = Array.from(
            root.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
        ).filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (event.shiftKey) {
            if (active === first || !active) {
                event.preventDefault();
                last.focus();
            }
            return;
        }

        if (active === last) {
            event.preventDefault();
            first.focus();
        }
    };

    useEffect(() => {
        if (isMenuOpen) {
            const raf = requestAnimationFrame(() => {
                closeButtonRef.current?.focus();
            });
            return () => cancelAnimationFrame(raf);
        }

        if (menuOverlayRef.current?.contains(document.activeElement)) {
            menuButtonRef.current?.focus();
        }
    }, [isMenuOpen]);

    useEffect(() => {
        if (!topLineRef.current || !middleLineRef.current || !bottomLineRef.current) {
            return;
        }

        let cancelled = false;

        const topLine = topLineRef.current;
        const middleLine = middleLineRef.current;
        const bottomLine = bottomLineRef.current;
        const menuOverlay = menuOverlayRef.current;

        if (!isMenuRendered && !isMenuOpen) {
            topLine.setAttribute("points", "2 5, 16 5");
            middleLine.style.opacity = "1";
            bottomLine.setAttribute("points", "2 15, 16 15");
            if (menuOverlay) {
                menuOverlay.style.opacity = "0";
                menuOverlay.style.transform = "translateY(-20px) scale(0.98)";
            }
            return;
        }

        if (prefersReducedMotion) {
            if (isMenuOpen) {
                topLine.setAttribute("points", "3.5 3.5, 15 15");
                middleLine.style.opacity = "0";
                bottomLine.setAttribute("points", "3.5 15, 15 3.5");
            } else {
                topLine.setAttribute("points", "2 5, 16 5");
                middleLine.style.opacity = "1";
                bottomLine.setAttribute("points", "2 15, 16 15");
                setMenuRendered(false);
            }

            if (menuOverlay) {
                menuOverlay.style.opacity = isMenuOpen ? "1" : "0";
                menuOverlay.style.transform = isMenuOpen ? "none" : "translateY(-20px) scale(0.98)";
            }

            return;
        }

        (async () => {
            const gsapRuntime = await loadGsap();
            if (cancelled) return;

            if (isMenuOpen) {
                setIsAnimating(true);
                gsapRuntime.to(topLine, {
                    attr: { points: "3.5 3.5, 15 15" },
                    duration: 0.24,
                    ease: "power2.inOut"
                });
                gsapRuntime.to(middleLine, {
                    opacity: 0,
                    duration: 0.2
                });
                gsapRuntime.to(bottomLine, {
                    attr: { points: "3.5 15, 15 3.5" },
                    duration: 0.24,
                    ease: "power2.inOut"
                });

                if (menuOverlay) {
                    gsapRuntime.killTweensOf(menuOverlay);
                    gsapRuntime.fromTo(menuOverlay,
                        {
                            opacity: 0,
                            y: -20,
                            scale: 0.98
                        },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.4,
                            ease: "power2.out",
                            onComplete: () => setIsAnimating(false)
                        }
                    );
                } else {
                    setIsAnimating(false);
                }
            } else {
                setIsAnimating(true);
                gsapRuntime.to(topLine, {
                    attr: { points: "2 5, 16 5" },
                    duration: 0.24,
                    ease: "power2.inOut"
                });
                gsapRuntime.to(middleLine, {
                    opacity: 1,
                    duration: 0.2,
                    delay: 0.1
                });
                gsapRuntime.to(bottomLine, {
                    attr: { points: "2 15, 16 15" },
                    duration: 0.24,
                    ease: "power2.inOut"
                });

                if (menuOverlay) {
                    gsapRuntime.killTweensOf(menuOverlay);
                    gsapRuntime.to(menuOverlay, {
                        opacity: 0,
                        y: -20,
                        scale: 0.98,
                        duration: 0.4,
                        ease: "power2.in",
                        onComplete: () => {
                            if (cancelled) return;
                            setIsAnimating(false);
                            setMenuRendered(false);
                        }
                    });
                } else {
                    setIsAnimating(false);
                    setMenuRendered(false);
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [isMenuOpen, isMenuRendered, prefersReducedMotion]);

    return (
        <>
            <header className="sticky top-4 z-[100] flex h-14 items-center justify-end bg-foreground/10 glass glass-4 px-4 lg:px-6 rounded-2xl mx-4 lg:mx-6">
                <div className="mx-auto flex w-full items-center relative">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-base font-semibold leading-none tracking-tight rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25"
                        onClick={closeMenu}
                    >
                        <SynerthinkLogo className="h-6 w-6" aria-hidden="true" focusable="false" />
                        <span className="font-semibold">Synerthink</span>
                    </Link>
                    <nav aria-label="Primary navigation" className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-10">
                        {NAV_LINKS.map(({ name, href }) => (
                            <Link
                                key={name}
                                to={href}
                                className="text-base font-normal tracking-tight text-foreground/60 transition-colors hover:text-foreground/90 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25"
                            >
                                {name}
                            </Link>
                        ))}
                    </nav>
	                    <div className="relative z-[101] ml-auto flex items-center gap-2">
	                        <a
	                            href="https://github.com/ademclk/dotlanth/releases"
	                            target="_blank"
	                            rel="noopener noreferrer"
	                            aria-label="Dotlanth releases on GitHub"
	                            className="inline-flex items-center gap-2 rounded-2xl bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm glass-float transition-colors hover:bg-black/90 active:scale-[0.98] dark:bg-white dark:text-black dark:hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25"
	                        >
	                            Releases
	                            <ArrowUpRightIcon className="h-4 w-4" weight="bold" aria-hidden="true" focusable="false" />
	                        </a>
	                        <button
	                            ref={menuButtonRef}
	                            type="button"
	                            className="md:hidden lg:order-3 p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25"
                            onClick={toggleMenu}
                            aria-label="Toggle navigation menu"
                            aria-controls="mobile-menu"
                            aria-expanded={isMenuOpen}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
                                <polyline
                                    ref={topLineRef}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    points="2 5, 16 5"
                                />
                                <polyline
                                    ref={middleLineRef}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    points="2 10, 16 10"
                                />
                                <polyline
                                    ref={bottomLineRef}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    points="2 15, 16 15"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
            <div
                ref={menuOverlayRef}
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-menu-title"
                className="fixed inset-0 z-[99] bg-background/70 glass-3 backdrop-saturate-150 flex flex-col px-8 py-8 h-full overflow-y-auto"
                onKeyDown={handleMenuKeyDown}
                style={{
                    minHeight: "100dvh",
                    display: isMenuRendered ? "flex" : "none",
                    isolation: 'isolate'
                }}
            >
                <div className="flex items-center justify-between">
                    <h2 id="mobile-menu-title" className="sr-only">Navigation menu</h2>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={closeMenu}
                        className="ml-auto inline-flex items-center justify-center rounded-2xl bg-foreground/10 px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25"
                        aria-label="Close navigation menu"
                    >
                        Close
                    </button>
                </div>

                <nav aria-label="Mobile navigation" className="mt-10 space-y-8 flex flex-col">
                    {NAV_LINKS.map(({ name, href }) => (
                    <Link
                        key={name}
                        to={href}
                        className="group text-2xl font-semibold text-gray-800 dark:text-gray-100 block px-0 transition relative rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25"
                        style={{ paddingRight: "2.5rem" }}
                        onClick={closeMenu}
                    >
                        <span>{name}</span>
                        <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-opacity">
                            <svg className="inline h-6 w-6 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </Link>
                ))}
	                    <a
	                        href="https://github.com/ademclk/dotlanth/releases"
	                        target="_blank"
	                        rel="noopener noreferrer"
	                        aria-label="Dotlanth releases on GitHub"
	                        className="mt-4 inline-flex items-center justify-center rounded-2xl bg-black px-4 py-3 text-base font-semibold text-white shadow-sm glass-float transition-colors hover:bg-black/90 active:scale-[0.98] dark:bg-white dark:text-black dark:hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25"
	                        onClick={closeMenu}
	                    >
	                        Releases
	                        <ArrowUpRightIcon className="ml-2 h-5 w-5" weight="bold" aria-hidden="true" focusable="false" />
	                    </a>
	            </nav>
	            </div>
	        </>
    );
}  
