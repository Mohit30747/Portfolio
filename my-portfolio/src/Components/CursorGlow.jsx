// import { useEffect, useRef } from "react";

// export default function CursorParticles() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     let particles = [];

//     const mouse = {
//       x: window.innerWidth / 2,
//       y: window.innerHeight / 2,
//     };

//     window.addEventListener("mousemove", (e) => {
//       mouse.x = e.clientX;
//       mouse.y = e.clientY;

//       for (let i = 0; i < 5; i++) {
//         particles.push({
//           x: mouse.x,
//           y: mouse.y,
//           size: Math.random() * 8 + 2,
//           speedX: (Math.random() - 0.5) * 3,
//           speedY: (Math.random() - 0.5) * 3,
//           life: 100,
//         });
//       }
//     });

//     function animate() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       particles.forEach((p, index) => {
//         p.x += p.speedX;
//         p.y += p.speedY;
//         p.life--;

//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

//         ctx.fillStyle = `rgba(59,130,246,${p.life / 100})`;
//         ctx.fill();

//         if (p.life <= 0) {
//           particles.splice(index, 1);
//         }
//       });

//       requestAnimationFrame(animate);
//     }

//     animate();

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     window.addEventListener("resize", resize);

//     return () => {
//       window.removeEventListener("resize", resize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: "fixed",
//         inset: 0,
//         pointerEvents: "none",
//         zIndex: 9999,
//       }}
//     />
//   );
// }
///// new code for cursor glow effect
import { useEffect, useRef } from "react";

export default function CursorParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const mouse = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      for (let i = 0; i < 8; i++) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          size: Math.random() * 6 + 2,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 80,
          hue: Math.random() * 360,
        });
      }
    });

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        p.size *= 0.98;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        ctx.fillStyle = `hsla(${p.hue},100%,60%,${p.life / 80})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsl(${p.hue},100%,60%)`;

        ctx.fill();

        if (p.life <= 0) {
          particles.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}
