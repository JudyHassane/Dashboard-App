import { Box, Menu, MenuItem } from "@mui/material";
import SearchInput from "./SearchInput";

export type SelectMenuOption = {
  label: string;
  value: string;
};

type SelectMenuProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;

  options: SelectMenuOption[];
  selectedValue?: string;

  onSelect: (value: string | undefined) => void;

  showAllOption?: boolean;

  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
};

const SelectMenu = ({
  anchorEl,
  open,
  onClose,
  options,
  selectedValue,
  onSelect,
  showAllOption = true,
  searchValue,
  searchPlaceholder = "Search...",
  onSearchChange,
}: SelectMenuProps) => {
  const hasSearch = onSearchChange !== undefined;

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      onClick={(e) => e.stopPropagation()}
    >
      <Box sx={hasSearch ? { width: 260, p: 1 } : undefined}>
        {hasSearch && (
          <SearchInput
            value={searchValue ?? ""}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
          ></SearchInput>
        )}

        {showAllOption && (
          <MenuItem
            onClick={() => {
              onSelect(undefined);
              onClose();
            }}
            selected={!selectedValue}
          >
            All
          </MenuItem>
        )}

        {options.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => {
              onSelect(option.value);
              onClose();
            }}
            selected={selectedValue === option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Box>
    </Menu>
  );
};

export default SelectMenu;
