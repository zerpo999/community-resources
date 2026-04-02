import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Clock, DollarSign, ExternalLink, PhoneCall,
  ChevronDown, ChevronUp, Copy, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Resource } from "@/types/resource";

interface ResourceCardProps {
  resource: Resource;
  index: number;
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-foreground sm:text-lg">{resource.name}</h3>
            <Badge variant="secondary" className="text-xs">
              {resource.category}
            </Badge>
          </div>
          <p className="mb-2 text-sm text-muted-foreground">{resource.description}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {resource.distance} mi
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {resource.hours}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5" />
              {resource.fees}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
        <Button size="sm" variant="default" className="gap-1.5" asChild>
          <a href={resource.website} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3.5 w-3.5" />
            Visit Website
          </a>
        </Button>
        <Button size="sm" variant="outline" className="gap-1.5" asChild>
          <a href={`tel:${resource.phone}`}>
            <PhoneCall className="h-3.5 w-3.5" />
            Call
          </a>
        </Button>
        <Button size="sm" variant="ghost" className="gap-1.5" onClick={handleCopy}>
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Share"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="ml-auto gap-1"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Less" : "More details"}
          {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </Button>
      </div>

      {/* Expanded details */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 space-y-1 border-t border-border pt-3 text-sm text-muted-foreground"
        >
          <p><strong className="text-foreground">Address:</strong> {resource.address}</p>
          <p><strong className="text-foreground">Phone:</strong> {resource.phone}</p>
          <p><strong className="text-foreground">Hours:</strong> {resource.hours}</p>
          <p><strong className="text-foreground">Fees:</strong> {resource.fees}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResourceCard;
