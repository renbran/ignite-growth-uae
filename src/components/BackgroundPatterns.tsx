interface BackgroundPatternsProps {
  pattern?: "geometric" | "hexagon" | "circuit" | "none";
  opacity?: number;
  position?: "top" | "bottom" | "center" | "full";
  className?: string;
}

const BackgroundPatterns = ({
  pattern = "hexagon",
  opacity = 0.15,
  position = "center",
  className = "",
}: BackgroundPatternsProps) => {
  const patterns = {
    geometric: "/patterns/pattern-geometric-abstract-light.png",
    hexagon: "/patterns/pattern-hexagon-tech-dark.png",
    circuit: "/patterns/pattern-circuit-board-seamless.png",
  };

  if (pattern === "none") return null;

  const positionClasses = {
    top: "top-0 h-1/2",
    bottom: "bottom-0 h-1/2",
    center: "top-1/2 transform -translate-y-1/2 h-96",
    full: "inset-0",
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} w-full pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <img
        src={patterns[pattern]}
        alt="background pattern"
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};

export default BackgroundPatterns;
