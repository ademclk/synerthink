import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const updateCanvasSize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        // Animation variables
        let time = 0;
        const colorStops = [
            { color: [0, 248, 241], pos: 0 },    // #00f8f1 (cyan)
            { color: [255, 189, 30], pos: 0.33 }, // #ffbd1e (yellow)
            { color: [254, 132, 143], pos: 0.66 }, // #fe848f (pink)
            { color: [169, 0, 255], pos: 1 }      // #a900ff (purple)
        ];

        const animate = () => {
            time += 0.002;

            const rect = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);

            // Create multiple moving gradients with smoother transitions
            for (let i = 0; i < 3; i++) {
                const offsetTime = time + (i * Math.PI * 0.67);
                const centerX = rect.width * 0.5 + Math.sin(offsetTime * 0.3) * rect.width * 0.15;
                const centerY = rect.height * 0.5 + Math.cos(offsetTime * 0.2) * rect.height * 0.15;

                const gradient = ctx.createRadialGradient(
                    centerX, centerY, 0,
                    centerX, centerY, rect.width * 0.9
                );

                // Smoother color transitions
                const animatedStops = colorStops.map((stop, index) => {
                    const animatedPos = (stop.pos + Math.sin(offsetTime * 0.5 + index) * 0.05) % 1;
                    const [r, g, b] = stop.color;
                    const alpha = 0.12 + Math.sin(offsetTime * 0.8 + index) * 0.06;
                    return {
                        pos: Math.abs(animatedPos),
                        color: `rgba(${r}, ${g}, ${b}, ${alpha})`
                    };
                });

                // Sort by position and add to gradient
                animatedStops.sort((a, b) => a.pos - b.pos);
                animatedStops.forEach(stop => {
                    gradient.addColorStop(stop.pos, stop.color);
                });

                ctx.globalCompositeOperation = i === 0 ? 'source-over' : 'screen';
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, rect.width, rect.height);
            }

            // Add subtle moving particles with smoother motion
            ctx.globalCompositeOperation = 'screen';
            for (let i = 0; i < 15; i++) {
                const particleTime = time + i * 0.2;
                const x = (rect.width * 0.5) + Math.sin(particleTime * 0.4 + i) * rect.width * 0.3;
                const y = (rect.height * 0.5) + Math.cos(particleTime * 0.3 + i) * rect.height * 0.3;
                const size = 1.5 + Math.sin(particleTime * 1.2) * 0.8;

                const colorIndex = i % colorStops.length;
                const [r, g, b] = colorStops[colorIndex].color;
                const alpha = 0.2 + Math.sin(particleTime * 1.5) * 0.15;

                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ filter: 'blur(40px)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/20 to-background/40" />
        </div>
    );
};

export default AnimatedBackground; 