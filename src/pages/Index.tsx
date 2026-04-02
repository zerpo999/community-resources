import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CategoryGrid from "@/components/CategoryGrid";
import ResourceCard from "@/components/ResourceCard";
import SuggestForm from "@/components/SuggestForm";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { MOCK_RESOURCES } from "@/types/resource";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const { isDark, toggle } = useDarkMode();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchZip, setSearchZip] = useState("");

  const results = useMemo(() => {
    if (!hasSearched) return [];
    if (selectedCategory) {
      return MOCK_RESOURCES.filter((r) => r.category === selectedCategory);
    }
    return MOCK_RESOURCES;
  }, [hasSearched, selectedCategory]);

  const handleSearch = (zip: string, radius: number) => {
    setSearchZip(zip);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setHasSearched(true);
      setIsLoading(false);
    }, 800);
  };

  const handleCategorySelect = (label: string) => {
    setSelectedCategory((prev) => (prev === label ? null : label));
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header isDark={isDark} onToggleDark={toggle} />

      <main className="flex-1">
        {/* main section */}
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
              Search local community resources            </motion.p>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </section>

        {/* Categories */}
        <section className="px-4 py-8">
          <CategoryGrid selectedCategory={selectedCategory} onSelect={handleCategorySelect} />
        </section>

        {/* Results */}
        {hasSearched && (
          <section className="border-t border-border px-4 py-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {results.length} result{results.length !== 1 && "s"} near{" "}
                  <span className="font-medium text-foreground">{searchZip}</span>
                  {selectedCategory && (
                    <>
                      {" "}in <span className="font-medium text-foreground">{selectedCategory}</span>
                    </>
                  )}
                </p>
              </div>
              {results.length > 0 ? (
                <div className="space-y-3">
                  {results.map((r, i) => (
                    <ResourceCard key={r.id} resource={r} index={i} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-border bg-card p-8 text-center">
                  <p className="text-muted-foreground">
                    No resources found for this category. Try a different category or ZIP code.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <img src="/icon.png" alt="Logo" className="h-5 w-5" />
            Community Resource App
          </div>
          <SuggestForm />
        </div>
      </footer>
    </div>
  );
};

export default Index;
