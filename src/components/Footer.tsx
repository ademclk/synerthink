import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const footerLinks = {
    products: [
        { label: "Platform", href: "/" },
        { label: "Solutions", href: "/" },
        { label: "Features", href: "/" }
    ],
    solutions: [
        { label: "Enterprise", href: "/" },
        { label: "Startups", href: "/" },
        { label: "Developers", href: "/" }
    ],
    developer: [
        { label: "Documentation", href: "/" },
        { label: "API Reference", href: "/" },
        { label: "SDK", href: "/" }
    ],
    research: [
        { label: "Publications", href: "/" },
        { label: "Case Studies", href: "/" },
        { label: "Research Papers", href: "/" }
    ],
    about: [
        { label: "Company", href: "/" },
        { label: "Careers", href: "/" },
        { label: "Press", href: "/" }
    ],
    contact: [
        { label: "Support", href: "/" },
        { label: "Sales", href: "/" },
        { label: "Partners", href: "/" }
    ],
    training: [
        { label: "Courses", href: "/" },
        { label: "Certification", href: "/" },
        { label: "Workshops", href: "/" }
    ],
    investor: [
        { label: "Investors", href: "/" },
        { label: "Financials", href: "/" },
        { label: "News", href: "/" }
    ]
};

export function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const sectionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx: gsap.Context | undefined;

        (async () => {
            const { default: gsapRuntime } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");

            gsapRuntime.registerPlugin(ScrollTrigger);

            ctx = gsapRuntime.context(() => {
                gsapRuntime.from(sectionsRef.current?.children || [], {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top bottom-=100",
                        end: "top center",
                        toggleActions: "play none none none"
                    }
                });
            }, footerRef);
        })();

        return () => ctx?.revert?.();
    }, []);

    const renderFooterSection = (title: string, items: typeof footerLinks.products) => (
        <div>
            <h3 className="text-xs font-semibold leading-6 text-gray-800 dark:text-gray-200">{title}</h3>
            <ul role="list" className="space-y-1">
                {items.map((item, index) => (
                    <li key={index}>
                        <Link
                            to={item.href}
                            className="text-xs leading-6 text-gray-800 dark:text-gray-200 hover:underline"
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );

    const renderFooterLinks = (items: typeof footerLinks.products) => (
        <ul role="list" className="space-y-1">
            {items.map((item, index) => (
                <li key={index}>
                    <Link
                        to={item.href}
                        className="text-xs leading-6 text-gray-800 dark:text-gray-200 hover:underline"
                    >
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    );

    return (
        <footer
            ref={footerRef}
            className="py-8 bg-zinc-100 dark:bg-zinc-900 px-4"
            aria-labelledby="footer-heading"
        >
            <div className="max-w-4xl mx-auto text-left">
                <p className="max-w-4xl text-sm text-center text-gray-800 dark:text-gray-200">
                    Advancing technology for all. Building the next generation of digital infrastructure that enables people to connect, create, and collaborate.
                </p>

                <div className="h-4" />
                <div className="border-t border-gray-200 dark:border-gray-800" />
                <div className="h-4" />

                <div className="hidden md:grid md:grid-cols-2 gap-8 mt-16 xl:col-span-2 xl:mt-0">
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        {renderFooterSection("Products", footerLinks.products)}
                        {renderFooterSection("Solutions", footerLinks.solutions)}
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        {renderFooterSection("Developer", footerLinks.developer)}
                        {renderFooterSection("Research", footerLinks.research)}
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        {renderFooterSection("About", footerLinks.about)}
                        {renderFooterSection("Contact", footerLinks.contact)}
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        {renderFooterSection("Training", footerLinks.training)}
                        {renderFooterSection("Investor", footerLinks.investor)}
                    </div>
                </div>

                <div className="md:hidden">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="products">
                            <AccordionTrigger className="text-sm">Products</AccordionTrigger>
                            <AccordionContent>
                                {renderFooterLinks(footerLinks.products)}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="solutions">
                            <AccordionTrigger className="text-sm">Solutions</AccordionTrigger>
                            <AccordionContent>
                                {renderFooterLinks(footerLinks.solutions)}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="developer">
                            <AccordionTrigger className="text-sm">Developer</AccordionTrigger>
                            <AccordionContent>
                                {renderFooterLinks(footerLinks.developer)}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="research">
                            <AccordionTrigger className="text-sm">Research</AccordionTrigger>
                            <AccordionContent>
                                {renderFooterLinks(footerLinks.research)}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="about">
                            <AccordionTrigger className="text-sm">About</AccordionTrigger>
                            <AccordionContent>
                                {renderFooterLinks(footerLinks.about)}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="contact">
                            <AccordionTrigger className="text-sm">Contact</AccordionTrigger>
                            <AccordionContent>
                                {renderFooterLinks(footerLinks.contact)}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="training">
                            <AccordionTrigger className="text-sm">Training</AccordionTrigger>
                            <AccordionContent>
                                {renderFooterLinks(footerLinks.training)}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="investor">
                            <AccordionTrigger className="text-sm">Investor</AccordionTrigger>
                            <AccordionContent>
                                {renderFooterLinks(footerLinks.investor)}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div className="h-4" />
                <div className="px-2 mt-2 pt-4 flex justify-center">
                    <p className="text-xs leading-5 text-gray-500 text-center">
                        © {new Date().getFullYear()} Synerthink. All rights reserved.
                    </p>
                </div>
                <div className="h-2" />
                <div className="border-t border-gray-200 dark:border-gray-800" />
                <div className="px-2 md:px-unit-xl py-4 flex justify-center">
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://github.com/synerthink"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-800 dark:text-gray-200 hover:underline"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com/company/synerthink"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-800 dark:text-gray-200 hover:underline"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://twitter.com/synerthink"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-800 dark:text-gray-200 hover:underline"
                        >
                            Twitter
                        </a>
                        <a
                            href="https://instagram.com/synerthink"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-800 dark:text-gray-200 hover:underline"
                        >
                            Instagram
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
} 
