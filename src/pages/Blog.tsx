import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
    const blogPosts = [
        {
            title: "Introducing Dotlanth",
            description: "Learn about our vision for simplifying software development with Dotlanth, a new foundation for your software projects.",
            slug: "introducing-dotlanth",
            category: "Vision"
        }
        // Add more blog posts here as they are created
    ];

    return (
        <>
            <title>Blog | Synerthink</title>
            <meta name="description" content="Explore our latest insights, updates, and thoughts on software development, technology, and innovation at Synerthink." />
            <meta name="keywords" content="Synerthink, blog, software development, technology, innovation, Dotlanth" />
            <meta property="og:title" content="Blog | Synerthink" />
            <meta property="og:description" content="Explore our latest insights, updates, and thoughts on software development, technology, and innovation at Synerthink." />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Blog | Synerthink" />
            <meta name="twitter:description" content="Explore our latest insights, updates, and thoughts on software development, technology, and innovation at Synerthink." />

            <div className="min-h-[calc(100vh-4rem)] py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <div className="inline-block backdrop-blur-xl bg-foreground/10 rounded-full px-6 sm:px-8 md:px-12 lg:px-16 py-3 sm:py-4 md:py-6 border border-foreground/10 shadow-2xl mb-4 sm:mb-6">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">Blog</h1>
                        </div>
                        <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto px-4">
                            Ideas being built over time. Our thoughts on creating what matters.
                        </p>
                    </div>

                    {/* Blog Posts */}
                    <div className="space-y-4 sm:space-y-6">
                        {blogPosts.map((post) => (
                            <Link
                                key={post.slug}
                                to={`/blog/${post.slug}`}
                                className="group block"
                            >
                                <article className="backdrop-blur-xl bg-foreground/10 rounded-full border border-foreground/10 shadow-2xl transition-all duration-300 hover:bg-foreground/15 hover:shadow-xl hover:scale-[1.01] transform-gpu overflow-hidden">
                                    <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                                        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                                    <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-primary/20 text-primary border border-primary/20">
                                                        {post.category}
                                                    </span>
                                                </div>
                                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-foreground group-hover:text-primary transition-colors leading-tight">
                                                    {post.title}
                                                </h2>
                                                <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed">
                                                    {post.description}
                                                </p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 transform group-hover:translate-x-0.5 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blog; 