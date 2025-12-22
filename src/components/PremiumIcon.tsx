import { cn } from "@/lib/utils";

interface PremiumIconProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  wrapperClassName?: string;
  animated?: boolean;
}

const sizeMap = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-20 h-20",
};

const iconSizeMap = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const PremiumIcon = ({
  src,
  alt,
  size = "md",
  className,
  wrapperClassName,
  animated = true,
}: PremiumIconProps) => {
  return (
    <div
      className={cn(
        "icon-wrapper-premium",
        sizeMap[size],
        animated && "transition-all duration-300 hover:scale-110",
        wrapperClassName
      )}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          "icon-image-gold object-contain",
          iconSizeMap[size],
          className
        )}
        loading="lazy"
      />
    </div>
  );
};

export default PremiumIcon;
