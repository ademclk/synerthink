import { Link } from "@tanstack/react-router";

const footerLinks = [
    {
        heading: "Product",
        links: [
            { label: "Dotlanth", href: "/products/dotlanth" },
            { label: "Releases", href: "https://github.com/ademclk/dotlanth/releases", external: true },
            { label: "Roadmap", href: "/#roadmap" },
        ],
    },
    {
        heading: "Company",
        links: [
            { label: "About", href: "/about" },
            { label: "Blog", href: "/blog" },
        ],
    },
    {
        heading: "Developers",
        links: [
            { label: "GitHub", href: "https://github.com/synerthink", external: true },
            { label: "Documentation", href: "https://github.com/ademclk/dotlanth", external: true },
        ],
    },
    {
        heading: "Connect",
        links: [
            { label: "LinkedIn", href: "https://linkedin.com/company/synerthink", external: true },
            { label: "X / Twitter", href: "https://twitter.com/synerthink", external: true },
        ],
    },
];

export function Footer() {
    return (
        <footer className="relative overflow-clip bg-background border-t border-foreground/[0.06]">
            {/* Top section: nav links + brand statement */}
            <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16 pt-20 pb-16">
                <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:gap-16">
                    {footerLinks.map((group) => (
                        <div key={group.heading}>
                            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60 mb-5">
                                {group.heading}
                            </h2>
                            <ul className="space-y-3">
                                {group.links.map((link) =>
                                    link.external ? (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-foreground/55 transition-colors hover:text-foreground"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ) : (
                                        <li key={link.label}>
                                            <Link
                                                to={link.href}
                                                className="text-sm text-foreground/55 transition-colors hover:text-foreground"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="mt-16 border-t border-foreground/[0.06]" />

                {/* Bottom bar */}
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-sm text-foreground/60">
                        &copy; 2026 Synerthink. All rights reserved.
                    </p>
                    <p className="text-sm text-foreground/60">
                        Building foundational computing products for the AI era.
                    </p>
                </div>
            </div>

            {/* Giant SYNERTHINK wordmark */}
            <div
                className="w-full overflow-clip select-none pointer-events-none flex justify-center items-center"
                aria-hidden="true"
            >
                <img
                    src="/wordmark-synerthink.svg"
                    alt=""
                    width={1200}
                    height={220}
                    decoding="async"
                    className="opacity-[0.08] dark:invert"
                    style={{
                        height: 'clamp(5rem, 22vw, 20rem)',
                        paddingInline: '1.5rem',
                        paddingBlock: '1.5rem',
                    }}
                />
            </div>
        </footer>
    );
}
