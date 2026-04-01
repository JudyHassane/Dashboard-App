import { Paper } from "@mui/material";
import { ChevronRight, Search } from "lucide-react";
import { cn } from "../utils/cn";
import { ui } from "../styles/ui";
import {
  type SuggestionType,
  type SearchHook,
  SEARCH_CONFIG,
} from "../constants/appConfig";

interface SearchSuggestionsProps {
  search: SearchHook;
  searchRef: React.RefObject<HTMLDivElement | null>;
  onSuggestionClick: (suggestion: SuggestionType) => void;
}

export function SearchSuggestions({
  search,
  searchRef,
  onSuggestionClick,
}: SearchSuggestionsProps) {
  const handleInputFocus = () => {
    if (search.headerSearch.trim().length >= SEARCH_CONFIG.minChars) {
      search.setShowSuggestions(true);
    }
  };

  return (
    <div className={ui.app.searchInputWrapper} ref={searchRef}>
      <Search size={16} className={cn(ui.app.searchIcon, ui.text.muted)} />

      <input
        type="text"
        placeholder="Search books, authors..."
        value={search.headerSearch}
        onChange={(e) => search.setHeaderSearch(e.target.value)}
        onFocus={handleInputFocus}
        className={ui.app.searchInput}
      />

      {/* Suggestions Dropdown */}
      {search.showSuggestions && search.suggestions.length > 0 && (
        <Paper
          elevation={3}
          className={cn(
            ui.app.suggestionsDropdown,
            ui.layout.surface,
            ui.border.primary,
          )}
        >
          {search.suggestions.map((s) => (
            <button
              key={`${s.id}`}
              onClick={() => onSuggestionClick(s)}
              className={ui.app.suggestionItem}
            >
              <div className="flex flex-col items-start">
                <span className={cn("text-sm font-medium", ui.text.primary)}>
                  {s.name}
                </span>
                <span
                  className={cn(
                    "text-[10px] uppercase tracking-wider font-bold",
                    ui.text.muted,
                  )}
                >
                  {s.type}
                </span>
              </div>
              <ChevronRight
                size={14}
                className="text-gray-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors"
              />
            </button>
          ))}
        </Paper>
      )}
    </div>
  );
}
