import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type FadeInProps = {
  as?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
} & Omit<HTMLAttributes<HTMLElement>, "as" | "color" | "style">;

export function FadeIn({
  as: Component = "div",
  children,
  className = "",
  delay = 0,
  style,
  ...props
}: FadeInProps) {
  const SafeComponent = (Component || "div") as any;

  return (
    <SafeComponent
      className={`fade-up ${className}`.trim()}
      style={{ animationDelay: `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </SafeComponent>
  );
}
