import { cn } from "@/lib/utils";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main" | "aside" | "nav" | "header" | "footer";
  /**
   * Container width variant.
   * @default "site" — max-w-7xl (1280px)
   */
  variant?: "site" | "narrow" | "wide" | "full";
}

/**
 * Responsive container component with consistent horizontal padding.
 * Use this instead of manually applying max-width and padding.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
  variant = "site",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        {
          "max-w-7xl": variant === "site",
          "max-w-5xl": variant === "narrow",
          "max-w-[1440px]": variant === "wide",
          "max-w-none": variant === "full",
        },
        className,
      )}
    >
      {children}
    </Tag>
  );
}