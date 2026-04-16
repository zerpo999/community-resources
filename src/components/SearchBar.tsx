import { useState } from "react";
import { Search, LocateFixed, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchBarProps {
  onSearch: (zip: string, radius: number) => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [zip, setZip] = useState("");
  const [radius, setRadius] = useState("10");
  const [locating, setLocating] = useState(false);

  const handleSearch = () => {
    if (zip.trim().length >= 5) {
      onSearch(zip.trim(), Number(radius));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`
          );
          const data = await res.json();
          const postalCode = data.address?.postcode;
          if (postalCode) setZip(postalCode);
        } catch {
          // silently fail
        } finally {
          setLocating(false);
        }
      },
      () => setLocating(false)
    );
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="zip-input" className="mb-1.5 block text-sm font-medium text-foreground">
            ZIP Code
          </label>
          <Input
            id="zip-input"
            placeholder="Enter ZIP code"
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
            onKeyDown={handleKeyDown}
            className="text-base"
          />
        </div>
        <div className="w-full sm:w-36">
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Radius
          </label>
          <Select value={radius} onValueChange={setRadius}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 miles</SelectItem>
              <SelectItem value="10">10 miles</SelectItem>
              <SelectItem value="15">15 miles</SelectItem>
              <SelectItem value="25">25 miles</SelectItem>
              <SelectItem value="50">50 miles</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleUseLocation}
            disabled={locating}
            className="gap-1.5"
          >
            {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4" />}
            <span className="hidden sm:inline">My Location</span>
          </Button>
          <Button 
            onClick={handleSearch} 
            disabled={zip.length < 5 || isLoading} 
            className="gap-1.5">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin"/> : <Search className="h-4 w-4" />}
            {isLoading ? "Searching..." : <span className="hidden sm:inline">Search</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
