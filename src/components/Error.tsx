import { Box, Button, Typography } from "@mui/material";

interface Props {
  message?: string;
  onRetry: () => void;
}

export default function Error({ message, onRetry }: Props) {
  return (
    <Box
      sx={{
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Typography variant="h6">
        {message || "Failed to complete the action!"}
      </Typography>

      <Button variant="contained" onClick={onRetry}>
        Retry
      </Button>
    </Box>
  );
}
