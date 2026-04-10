import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Clock, DollarSign, ExternalLink, PhoneCall,
  ChevronDown, ChevronUp, Copy, Check, Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Resource } from "@/types/resource";

interface ResourceCardProps {
  resource: Resource;
  index: number;
}

// Helper: Check if resource is open now based on hours string
// Expects format like "Monday: 9:00 AM – 5:00 PM, Tuesday: ..."
function isOpenNow(hoursString: string): boolean {
  if (!hoursString || hoursString === "Hours not available") return false;

  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
  const currentTime = now.getHours() * 60 + now.getMinutes();

  // Find the line for today
  const lines = hoursString.split(',');
  for (const line of lines) {
    if (line.trim().startsWith(currentDay)) {
      const timePart = line.split(':')[1]?.trim();
      if (!timePart) continue;
      // Parse time range like "9:00 AM – 5:00 PM"
      const match = timePart.match(/(\d{1,2}:\d{2})\s*(AM|PM)\s*[–-]\s*(\d{1,2}:\d{2})\s*(AM|PM)/i);
      if (match) {
        let startHour = parseInt(match[1].split(':')[0]);
        const startMin = parseInt(match[1].split(':')[1]);
        const startMeridiem = match[2].toUpperCase();
        let endHour = parseInt(match[3].split(':')[0]);
        const endMin = parseInt(match[3].split(':')[1]);
        const endMeridiem = match[4].toUpperCase();

        if (startMeridiem === 'PM' && startHour !== 12) startHour += 12;
        if (endMeridiem === 'PM' && endHour !== 12) endHour += 12;
        if (startMeridiem === 'AM' && startHour === 12) startHour = 0;
        if (endMeridiem === 'AM' && endHour === 12) endHour = 0;

        const startTotal = startHour * 60 + startMin;
        const endTotal = endHour * 60 + endMin;
        return currentTime >= startTotal && currentTime <= endTotal;
      }
      break;
    }
  }
  return false;
}

// Format hours as an array of lines for expanded view
function formatHoursLines(hoursString: string): string[] {
  if (!hoursString || hoursString === "Hours not available") return ["Hours not available"];
  return hoursString.split(',').map(line => line.trim());
}

const ResourceCard = ({ resource, index }: ResourceCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${resource.name} - ${resource.address} - ${resource.phone}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openNow = useMemo(() => isOpenNow(resource.hours), [resource.hours]);
  const hoursLines = useMemo(() => formatHoursLines(resource.hours), [resource.hours]);

  // Format distance
  const formattedDistance = typeof resource.distance === 'number' 
    ? resource.distance.toFixed(1) 
    : resource.distance;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
    >
      {/* Header: name and category badge */}
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-foreground">{resource.name}</h3>
        <Badge variant="secondary" className="text-xs">
          {resource.category}
        </Badge>
      </div>

      {/* Collapsed info: distance, open now, fees, and buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {formattedDistance} mi
          </span>
          <span className={`flex items-center gap-1 ${openNow ? 'text-green-600' : 'text-red-500'}`}>
            <Clock className="h-3.5 w-3.5" />
            {openNow ? 'Open Now' : 'Closed'}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="h-3.5 w-3.5" />
            {resource.fees}
          </span>
        </div>

        {/* Action buttons row */}
        <div className="flex flex-wrap gap-2">
          {resource.website ? (
            <Button size="sm" variant="default" className="gap-1.5" asChild>
              <a href={resource.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Website</span>
              </a>
            </Button>
          ) : (
            <Button size="sm" variant="default" className="gap-1.5" disabled>
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">No Website</span>
            </Button>
          )}

          {resource.phone ? (
            <Button size="sm" variant="outline" className="gap-1.5" asChild>
              <a href={`tel:${resource.phone}`}>
                <PhoneCall className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Call</span>
              </a>
            </Button>
          ) : (
            <Button size="sm" variant="outline" className="gap-1.5" disabled>
              <PhoneCall className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">No Phone</span>
            </Button>
          )}

          <Button size="sm" variant="ghost" className="gap-1.5" onClick={handleCopy}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="gap-1"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Less" : "More"}
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 space-y-3 border-t border-border pt-4 text-sm"
        >
          {/* Address */}
          <p><strong className="text-foreground">Address:</strong> {resource.address}</p>

          {/* Phone if available */}
          {resource.phone && (
            <p><strong className="text-foreground">Phone:</strong> {resource.phone}</p>
          )}

          {/* Hours: one per line */}
          <div>
            <strong className="text-foreground">Hours:</strong>
            <ul className="mt-1 list-inside list-disc space-y-0.5 text-muted-foreground">
              {hoursLines.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </div>

          {/* Fees */}
          <p><strong className="text-foreground">Fees:</strong> {resource.fees}</p>

          {/* Services / description */}
          {resource.description && resource.description !== "Community resource" && (
            <div>
              <strong className="text-foreground">Services:</strong>
              <p className="mt-1 text-muted-foreground">{resource.description}</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResourceCard;