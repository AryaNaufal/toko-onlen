import { useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function SearchInput({ onSearch }: any) {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center">
      <BiSearch />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border-transparent h-3 w-36 md:w-full focus:border-transparent focus:ring-0"
        placeholder="Search here..."
      />
    </div>
  );
}
