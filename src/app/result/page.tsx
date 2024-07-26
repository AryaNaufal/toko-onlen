"use client";
import { useSearchParams } from "next/navigation";
import SearchProductsPage from "./SearchProductsPage";

export default function SearchResult() {
  const router = useSearchParams();
  const query: any = router.get("search");
  return (
    <div className="container mt-10">
      <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
      <div className="flex flex-wrap gap-4 mt-4 justify-center lg:justify-start">
        <SearchProductsPage />
      </div>
    </div>
  );
}
