import { useState, useEffect, useRef } from "react";
import { SEARCH_CONFIG, type SuggestionType } from "../constants/appConfig";

/// Hook to manage header search functionality and suggestions

export const useAppSearch = () => {
  const [headerSearch, setHeaderSearch] = useState("");
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  // Handle click outside search area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        event.target instanceof Node &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load suggestions with debouncing
  useEffect(() => {
    const loadSuggestions = async () => {
      if (headerSearch.trim().length < SEARCH_CONFIG.minChars) {
        setSuggestions([]);
        return;
      }

      const filtered: SuggestionType[] = [];

      // TODO: Replace with actual API calls
      // const allBooks = await fetchBooks();
      // const authors = await fetchAuthors();
      // ... filter logic here

      setSuggestions(filtered.slice(0, SEARCH_CONFIG.maxResults));
      setShowSuggestions(true);
    };

    const timer = setTimeout(loadSuggestions, SEARCH_CONFIG.debounceDelay);
    return () => clearTimeout(timer);
  }, [headerSearch]);

  const clearSearch = () => {
    setHeaderSearch("");
    setShowSuggestions(false);
  };

  return {
    headerSearch,
    setHeaderSearch,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    clearSearch,
    searchRef,
  };
};
