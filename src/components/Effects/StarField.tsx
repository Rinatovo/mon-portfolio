import { useEffect, useRef } from 'react';

interface StarFieldProps {
    speed?: number;
    starCount?: number;
}

export default function StarField({ speed = 0.5, starCount = 800 }: StarFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const stars: { x: number; y: number; z: number }[] = [];

        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width - width / 2,
                y: Math.random() * height - height / 2,
                z: Math.random() * width
            });
        }

        let animationId: number;

        const animate = () => {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, width, height);

            for (let i = 0; i < starCount; i++) {
                const star = stars[i];
                star.z -= speed * 2; // Move stars towards viewer

                if (star.z <= 0) {
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                    star.z = width;
                }

                const x = (star.x / star.z) * width + width / 2;
                const y = (star.y / star.z) * height + height / 2;
                const size = (1 - star.z / width) * 2;

                // Opacity based on distance
                const opacity = (1 - star.z / width);

                if (x >= 0 && x < width && y >= 0 && y < height) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            animationId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, [speed, starCount]);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}
