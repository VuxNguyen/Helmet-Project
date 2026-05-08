import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Section background variant.
   * @default "default"
   */
  variant?: "default" | "muted" | "primary" | "accent";
  /**
   * Container width variant.
   * @default "site"
   */
  containerVariant?: "site" | "narrow" | "wide" | "full";
  /**
   * Whether to include a container wrapper.
   * @default true
   */
  withContainer?: boolean;
  /**
   * Custom id for scroll anchoring.
   */
  id?: string;
}

const backgroundVariants: Record<string, string> = {
  default: "bg-background",
  muted: "bg-muted/50",
  primary: "bg-primary",
  accent: "bg-accent",
};

/**
 * Reusable page section with consistent vertical spacing and background.
 * This is the primary building block for page layouts.
 */
export function Section({
  children,
  className,
  variant = "default",
  containerVariant = "site",
  withContainer = true,
  id,
}: SectionProps) {
  const content = (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        backgroundVariants[variant],
        className,
      )}
    >
      {withContainer ? (
        <Container variant={containerVariant}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );

  return content;
}