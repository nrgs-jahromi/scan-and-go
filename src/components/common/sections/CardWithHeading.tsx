import { Box, Paper, Typography, useTheme } from "@mui/material";
import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
}

const CardWithHeading: FC<Props> = ({ title, children }) => {
  const theme = useTheme();

  return (
    <Box component={Paper}>
      <Box
        sx={{
          width: "100%",
          bgcolor: theme.palette.primary.light,
          height: "64px",
          paddingX: "24px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{title}</Typography>
      </Box>

      <Box sx={{ padding: "1.5rem", position: "relative" }}>{children}</Box>
    </Box>
  );
};

export default CardWithHeading;
