import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "display-2xl" | "display-xl" | "display-lg" | "display-md" | "display-sm" | "xl" | "lg" | "md" | "sm";
  gradient?: boolean;
};

const sizeMap: Record<NonNullable<HeadingProps["size"]>, string> = {
  "display-2xl": "text-display-2xl",
  "display-xl":  "text-display-xl",
  "display-lg":  "text-display-lg",
  "display-md":  "text-display-md",
  "display-sm":  "text-display-sm",
  xl:  "text-4xl font-bold",
  lg:  "text-3xl font-bold",
  md:  "text-2xl font-bold",
  sm:  "text-xl font-semibold",
};

export function Heading({
  as: Tag = "h2",
  size = "lg",
  gradient = false,
  className,
  children,
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        sizeMap[size],
        "font-bold tracking-tight text-foreground",
        gradient && "text-gradient",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  as?: "p" | "span" | "div";
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  muted?: boolean;
  lead?: boolean;
};

const textSizeMap: Record<NonNullable<TextProps["size"]>, string> = {
  xs:   "text-xs",
  sm:   "text-sm",
  base: "text-base",
  lg:   "text-lg",
  xl:   "text-xl",
};

export function Text({
  as: Tag = "p",
  size = "base",
  muted = false,
  lead = false,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(
        textSizeMap[size],
        "leading-relaxed",
        muted ? "text-muted-foreground" : "text-foreground",
        lead && "text-lg text-muted-foreground leading-relaxed font-normal",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Lead({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-lg md:text-xl text-muted-foreground leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function Label({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
