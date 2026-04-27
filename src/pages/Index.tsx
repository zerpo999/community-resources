import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CategoryGrid from "@/components/CategoryGrid";
import ResourceCard from "@/components/ResourceCard";
import SuggestForm from "@/components/SuggestForm";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { motion } from "framer-motion";
import { CATEGORIES, type Resource } from "@/types/resource";
import Instructions from "@/components/instructions";

const Index = () => {
  const { isDark, toggle } = useDarkMode();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchZip, setSearchZip] = useState("");
  const [lastRadius, setLastRadius] = useState(10);
  const [resources, setResources] = useState<Resource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const DEFAULT_KEYWORD = "community resources OR social services OR non-profit OR help near me";

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSearch = async (zip: string, radius: number, categoryOverride?: string | null) => {
    const effectiveCategory = categoryOverride !== undefined ? categoryOverride : selectedCategory;
    
    let keyword = DEFAULT_KEYWORD;
    let displayCategory = "Community Resource"; // default when no category selected
    if (effectiveCategory) {
      const categoryObj = CATEGORIES.find(c => c.label === effectiveCategory);
      keyword = categoryObj ? categoryObj.keyword : effectiveCategory;
      displayCategory = effectiveCategory;
    }

    setSearchZip(zip);
    setLastRadius(radius);
    setIsLoading(true);
    setError(null);
    setHasSearched(false);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/resources?zip=${encodeURIComponent(zip)}&category=${encodeURIComponent(keyword)}&radius=${radius}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch resources");
      }

      const data = await response.json();
      
      const fetchedResources: Resource[] = data.resources.map((place: any) => ({
        id: place.id,
        name: place.name,
        address: place.address,
        category: place.category,   // <-- shows actual category or "Community Resource"
        hours: place.hours || "Hours not specified",
        fees: place.fees || "Call for information",
        distance: place.distance,
        website: place.website || "",
        phone: place.phone || "",
        description: place.description || "Community resource",
        coordinates: place.coordinates || { lat: 0, lng: 0 },
      }));

      setResources(fetchedResources);
      setHasSearched(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
      setResources([]);
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = (label: string) => {
    const newCategory = selectedCategory === label ? null : label;
    setSelectedCategory(newCategory);
    if (hasSearched && searchZip) {
      handleSearch(searchZip, lastRadius, newCategory);
    }
  };

  useEffect(() => {
    if (hasSearched && !isLoading) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hasSearched, isLoading]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header isDark={isDark} onToggleDark={toggle} />

      <main className="flex-1">
        <section className="border-b border-border bg-card px-4 pb-8 pt-10 sm:pb-12 sm:pt-14">
          <div className="mx-auto max-w-2xl text-center">
            <img src="/icon.png" alt="Logo" className="mx-auto mb-4 h-20 w-20" />
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-2 text-2xl font-bold text-foreground sm:text-3xl"
            >
              Find Help Near You
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-muted-foreground"
            >
              Enter Zip Code to find local community resources
              <br></br>
              Then click Search to begin!
            </motion.p>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </section>

        {/* <section className="px-4 py-6">
          <div className="mx-auto max-w-3xl">
            <Instructions />
          </div>
        </section> */}

        <section className="px-4 py-8">
          <CategoryGrid selectedCategory={selectedCategory} onSelect={handleCategorySelect} />
        </section>

        {hasSearched && (
          <section className="border-t border-border px-4 py-8" ref={resultsRef}>
            <div className="mx-auto max-w-3xl">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {resources.length} result{resources.length !== 1 && "s"} near{" "}
                  <span className="font-medium text-foreground">{searchZip}</span>
                  {selectedCategory && (
                    <>
                      {" "}in <span className="font-medium text-foreground">{selectedCategory}</span>
                    </>
                  )}
                </p>
              </div>

              {error && (
                <div className="mb-4 rounded-md bg-destructive/10 p-3 text-destructive">
                  {error}
                </div>
              )}

              {resources.length > 0 ? (
                <div className="space-y-3">
                  {resources.map((r, i) => (
                    <ResourceCard key={r.id} resource={r} index={i} />
                  ))}
                </div>
              ) : (
                !error && (
                  <div className="rounded-xl border border-border bg-card p-8 text-center">
                    <p className="text-muted-foreground">
                      No resources found. Try a different category or ZIP code.
                    </p>
                  </div>
                )
              )}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-border bg-card px-4 py-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <img src="/icon.png" alt="Logo" className="h-5 w-5" />
            Community Resource Finder
          </div>
          {/* <SuggestForm />  still in progress */} 
        </div>
      </footer>
    </div>
  );
};

export default Index;