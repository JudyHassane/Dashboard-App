import { Paper } from "@mui/material";
import { ChevronRight, Search } from "lucide-react";
import { cn } from "../utils/cn";
import { ui } from "../styles/ui";
import { type SuggestionType, SEARCH_CONFIG } from "../constants/appConfig";
import { useAppSearch } from "../hooks/useAppSearch";

export type SearchHook = ReturnType<typeof useAppSearch>;

interface SearchBarProps {
  search: SearchHook;
  onSuggestionClick: (suggestion: SuggestionType) => void;
}

export function SearchBar({ search, onSuggestionClick }: SearchBarProps) {
  const {
    headerSearch,
    setHeaderSearch,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    searchRef,
  } = search;

  const handleInputFocus = () => {
    if (headerSearch.trim().length >= SEARCH_CONFIG.minChars) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className={ui.app.searchInputWrapper} ref={searchRef}>
      <Search size={16} className={cn(ui.app.searchIcon, ui.text.muted)} />

      <input
        type="text"
        placeholder="Search books, authors..."
        value={headerSearch}
        onChange={(e) => setHeaderSearch(e.target.value)}
        onFocus={handleInputFocus}
        className={ui.app.searchInput}
      />

      {showSuggestions && suggestions.length > 0 && (
        <Paper elevation={3} className={ui.app.suggestionsDropdown}>
          {suggestions.map((s) => (
            <button
              key={s.id}
              onClick={() => onSuggestionClick(s)}
              className={ui.app.suggestionItem}
            >
              <div>
                <span>{s.name}</span>
                <span>{s.type}</span>
              </div>
              <ChevronRight size={14} />
            </button>
          ))}
        </Paper>
      )}
    </div>
  );
}
