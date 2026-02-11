interface VideoLogoProps {
  className?: string;
}

const VideoLogo = ({ className = "w-32 h-32" }: VideoLogoProps) => {
  return (
    <div className={`relative group ${className} flex items-center justify-center`}>
      <div className="relative w-full h-full rounded-lg overflow-hidden border border-border/50 shadow-lg icon-wrapper-premium bg-background-secondary/40 backdrop-blur-md">
        <img
          src="https://res.cloudinary.com/dsl5fhclj/image/upload/v1769923568/tl6tnnqrgsssuhn5fqjw.png"
          alt="SGC TECH AI Logo"
          className="w-full h-full object-contain"
          loading="lazy"
        />
        <div className="absolute inset-2 border-2 border-accent/30 rounded-lg opacity-50 group-hover:opacity-70 transition-opacity pointer-events-none"></div>
      </div>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default VideoLogo;
