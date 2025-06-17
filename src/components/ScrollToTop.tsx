import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top when route changes
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth' // Use smooth scrolling for better UX
        });
    }, [pathname]);

    return null; // This component doesn't render anything
}

export default ScrollToTop; 