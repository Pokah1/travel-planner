// components/ScrollReveal.js
import { useEffect, useRef, useState } from "react";

const ScrollReveal = ({ children, direction = "up", delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target); // reveal only once
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // direction based transforms
  const dirClasses = {
    up: "translate-y-10",
    down: "-translate-y-10",
    left: "translate-x-10",
    right: "-translate-x-10",
  };

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out delay-[${delay}ms]
        ${visible ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 " + dirClasses[direction]}
      `}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
