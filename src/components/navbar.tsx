import { useEffect, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import SynerthinkLogo from "./synerthink-logo";

const NAV_LINKS = [
    { name: "Products", href: "/products" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
];

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
    const [isAnimating, setIsAnimating] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const menuOverlayRef = useRef<HTMLDivElement>(null);
    const topLineRef = useRef<SVGPolylineElement>(null);
    const middleLineRef = useRef<SVGPolylineElement>(null);
    const bottomLineRef = useRef<SVGPolylineElement>(null);
    useBodyScrollLock(isMenuOpen);

    useEffect(() => {
        if (topLineRef.current && middleLineRef.current && bottomLineRef.current) {
            let cancelled = false;

            const topLine = topLineRef.current;
            const middleLine = middleLineRef.current;
            const bottomLine = bottomLineRef.current;

            (async () => {
                const { default: gsapRuntime } = await import("gsap");
                if (cancelled) return;

                if (isMenuOpen) {
                    setIsAnimating(true);
                    // Animate to X
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

                    // Animate menu overlay
                    if (menuOverlayRef.current) {
                        menuOverlayRef.current.style.display = 'flex';
                        gsapRuntime.fromTo(menuOverlayRef.current,
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
                    }
                } else {
                    setIsAnimating(true);
                    // Animate back to hamburger
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

                    // Animate menu overlay out
                    if (menuOverlayRef.current) {
                        gsapRuntime.to(menuOverlayRef.current, {
                            opacity: 0,
                            y: -20,
                            scale: 0.98,
                            duration: 0.4,
                            ease: "power2.in",
                            onComplete: () => {
                                if (menuOverlayRef.current) {
                                    menuOverlayRef.current.style.display = 'none';
                                    setIsAnimating(false);
                                }
                            }
                        });
                    }
                }
            })();

            return () => {
                cancelled = true;
            };
        }
    }, [isMenuOpen]);

    const closeMenu = () => {
        if (!isAnimating) {
            setMenuOpen(false);
        }
    };

    return (
        <>
            <header className="sticky top-4 z-[100] flex h-14 items-center justify-end bg-foreground/10 glass glass-4 px-4 lg:px-6 rounded-2xl mx-4 lg:mx-6">
                <div className="mx-auto flex w-full items-center relative">
                    <Link to="/" className="flex items-center gap-2 text-base font-semibold leading-none tracking-tight" onClick={closeMenu}>
                        <SynerthinkLogo className="h-6 w-6" />
                        <span className="font-semibold">Synerthink</span>
                    </Link>
                    <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-10">
                        {NAV_LINKS.map(({ name, href }) => (
                            <Link
                                key={name}
                                to={href}
                                className="text-base font-normal tracking-tight text-foreground/60 transition-colors hover:text-foreground/90"
                            >
                                {name}
                            </Link>
                        ))}
                    </nav>
	                    <div className="relative z-[101] ml-auto flex items-center gap-2">
	                        <a
	                            href="https://github.com/ademclk/dotlanth/releases"
	                            target="_blank"
	                            rel="noreferrer"
	                            className="inline-flex items-center gap-2 rounded-2xl bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm glass-float transition-colors hover:bg-black/90 active:scale-[0.98] dark:bg-white dark:text-black dark:hover:bg-white/90"
	                        >
	                            Releases
	                            <ArrowUpRightIcon className="h-4 w-4" weight="bold" />
	                        </a>
	                        <button
	                            ref={menuButtonRef}
	                            className="md:hidden lg:order-3 p-2"
                            onClick={() => {
                                if (!isAnimating) {
                                    setMenuOpen(!isMenuOpen);
                                }
                            }}
                            aria-label="Toggle navigation menu"
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18">
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
                className="fixed inset-0 z-[99] bg-background/70 glass-3 backdrop-saturate-150 flex flex-col px-8 py-8 h-full overflow-y-auto"
                style={{
                    minHeight: "100dvh",
                    display: 'none',
                    isolation: 'isolate'
                }}
            >
                <nav className="mt-24 space-y-8 flex flex-col">
                    {NAV_LINKS.map(({ name, href }) => (
                    <Link
                        key={name}
                        to={href}
                        className="group text-2xl font-semibold text-gray-800 dark:text-gray-100 block px-0 transition relative"
                        style={{ paddingRight: "2.5rem" }}
                        onClick={closeMenu}
                    >
                        <span className="cursor-pointer">{name}</span>
                        <span className="opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-opacity">
                            <svg className="inline h-6 w-6 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </Link>
                ))}
	                    <a
	                        href="https://github.com/ademclk/dotlanth/releases"
	                        target="_blank"
	                        rel="noreferrer"
	                        className="mt-4 inline-flex items-center justify-center rounded-2xl bg-black px-4 py-3 text-base font-semibold text-white shadow-sm glass-float transition-colors hover:bg-black/90 active:scale-[0.98] dark:bg-white dark:text-black dark:hover:bg-white/90"
	                        onClick={closeMenu}
	                    >
	                        Releases
	                        <ArrowUpRightIcon className="ml-2 h-5 w-5" weight="bold" />
	                    </a>
	            </nav>
	            </div>
	        </>
    );
}  
