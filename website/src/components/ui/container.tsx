import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article" | "main";
  size?: "sm" | "md" | "lg" | "xl";
}

const sectionSizeMap = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
  xl: "py-24 md:py-40",
};

export function Section({
  as: Tag = "section",
  size = "md",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn(sectionSizeMap[size], className)} {...props}>
      {children}
    </Tag>
  );
}

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  narrow?: boolean;
  wide?: boolean;
}

export function Container({ narrow, wide, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        narrow ? "max-w-3xl" : wide ? "max-w-7xl" : "max-w-5xl",
        className
      )}
      {...props}
    />
  );
}

export function SectionHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-12 md:mb-16 text-center max-w-2xl mx-auto", className)} {...props}>
      {children}
    </div>
  );
}
