import { useEffect, useState } from "react";
import { Sun, Moon, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  isDark: boolean;
  onToggleDark: () => void;
}

const MAX_ZOOM = 3;

const Header = ({ isDark, onToggleDark }: HeaderProps) => {
  const [zoomLevel, setZoomLevel] = useState(0);

  // Apply initial zoom class on mount
  useEffect(() => {
    document.documentElement.classList.add("zoom-0");
  }, []);

  const cycleZoom = () => {
    const next = (zoomLevel + 1) % (MAX_ZOOM + 1);

    // Remove old zoom class
    document.documentElement.classList.remove(`zoom-${zoomLevel}`);

    // Add new zoom class
    document.documentElement.classList.add(`zoom-${next}`);

    setZoomLevel(next);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">

        {/* Left side */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full">
            <img src="/icon.png" alt="Logo" className="h-8 w-8" />
          </div>
          <h1 className="text-lg font-bold text-foreground sm:text-xl">
            Community Resource Finder
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button
            onClick={cycleZoom}
            variant="header"
            className="rounded-full flex items-center gap-2 hover:bg-[hsl(214_62%_53%)] hover:text-white"
          >
            {/* Icon changes at max zoom */}
            {zoomLevel === MAX_ZOOM ? (
              <ZoomOut className="h-5 w-5" />
            ) : (
              <ZoomIn className="h-5 w-5" />
            )}

            {/* Label updates based on zoom level */}
            <span>
              {zoomLevel === 0 || zoomLevel === 1 || zoomLevel === 2 ? "Text Size" : null}
              {zoomLevel === 3 && "Reset Size"}
            </span>
          </Button>

          <Button
            onClick={onToggleDark}
            variant="header"
            className="rounded-full flex items-center gap-2 hover:bg-[hsl(214_62%_53%)] hover:text-white"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span>{isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
          </Button>
        </div>

      </div>
    </header>
  );
};

export default Header;