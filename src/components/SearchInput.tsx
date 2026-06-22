import { TextField, InputAdornment, type TextFieldProps } from "@mui/material";
import { Search } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
} & Omit<TextFieldProps, "onChange" | "value">;

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  sx,
  ...props
}: SearchInputProps) => {
  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={sx}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search size={16} className="text-gray-400" />
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
};

export default SearchInput;
