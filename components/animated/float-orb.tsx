type FloatOrbProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  delay?: number;
};

const sizeMap = {
  sm: "h-20 w-20",
  md: "h-36 w-36",
  lg: "h-56 w-56",
};

export function FloatOrb({
  className = "",
  size = "md",
  delay = 0,
}: FloatOrbProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(96,165,250,0.75),rgba(37,99,235,0.3)_30%,rgba(15,23,42,0)_70%)] blur-3xl opacity-70 ${sizeMap[size]} ${className}`.trim()}
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}
