import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Clock,
  Filter,
  ExternalLink,
  PhoneCall,
  Copy,
  ChevronDown,
  PlusCircle,
} from "lucide-react";

const Instructions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-xl border border-border bg-muted/30 p-5 shadow-sm sm:p-6"
    >
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
        <Search className="h-5 w-5 text-primary" />
        How to Use This Tool
      </h3>

      <div className="grid gap-5 text-sm text-muted-foreground sm:grid-cols-2">
        {/* Column 1 */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <span className="font-medium text-foreground">1. Search by Location</span>
              <p className="text-xs leading-relaxed">
                Enter a ZIP code, choose a radius (5–50 miles), and click <strong>Search</strong>. 
                Results will show resources near that area.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Filter className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <span className="font-medium text-foreground">2. Filter by Category</span>
              <p className="text-xs leading-relaxed">
                Click any category button (e.g., <em>Food</em>, <em>Shelter</em>, <em>Medical</em>) 
                to see only those services. Click again to remove the filter.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <span className="font-medium text-foreground">3. Real‑time Open/Closed</span>
              <p className="text-xs leading-relaxed">
                Each resource card shows <span className="font-medium text-green-600">Open Now</span> or{" "}
                <span className="font-medium text-red-500">Closed</span> based on the current time. 
                The status updates automatically every minute.
              </p>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <span className="font-medium text-foreground">4. Website & Call</span>
              <p className="text-xs leading-relaxed">
                Use the <strong>Website</strong> button to visit the resource’s site, or the{" "}
                <strong>Call</strong> button to dial the phone number directly.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Copy className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <span className="font-medium text-foreground">5. Share / Copy Details</span>
              <p className="text-xs leading-relaxed">
                Click <strong>Share</strong> to copy the resource’s name, address, and phone number 
                to your clipboard.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <span className="font-medium text-foreground">6. Expand for More Info</span>
              <p className="text-xs leading-relaxed">
                Click <strong>More</strong> to see full hours, fees, services, and a detailed 
                description. Click <strong>Less</strong> to collapse.
              </p>
            </div>
          </div>

          {/* <div className="flex gap-3">
            <PlusCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <span className="font-medium text-foreground">7. Suggest a Resource</span>
              <p className="text-xs leading-relaxed">
                Use the <strong>Suggest a Resource</strong> link in the footer to submit new 
                community resources for review.
              </p>
            </div>
          </div> */}
        </div>
      </div>

      <div className="mt-4 border-t border-border pt-3 text-center text-xs text-muted-foreground">
        💡 Tip: Results update automatically when you change a category after a search.
      </div>
    </motion.div>
  );
};

export default Instructions;