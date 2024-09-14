import React from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  useTheme,
  ButtonProps,
  TextField,
  Paper,
  InputAdornment,
} from "@mui/material";
import { SearchNormal1 } from "iconsax-react";

type ButtonConfig = {
  text?: string; // Make text optional
  onClick?: () => void; // Make onClick optional
  variant?: ButtonProps["variant"]; // Optional variant property
  customComponent?: React.ReactNode; // For custom components like DatePicker
};


type PageHeaderProps = {
  title: string;
  buttons?: ButtonConfig[];
  showSearchBar?: boolean;
  searchValue?: string;
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  buttons,
  showSearchBar,
  searchValue,
  onSearchChange,
}) => {
  const theme = useTheme();
  return (
    <Box className="w-full flex justify-between items-center px-6 py-2 sticky top-0 z-10 rounded-lg" 
    sx={{
      background: `linear-gradient(to left, white, ${theme.palette.background.paper})`,
    }}
    >
      <Box className=" h-full align-middle items-center gap-3">
        <Typography variant="h6">{title}</Typography>
        <Divider
          orientation="horizontal"
          // variant="middle"
          className="h-1 rounded-sm"
          sx={{ bgcolor: theme.palette.primary.main }}
        />
      </Box>
      <Box className="flex gap-3">
        {showSearchBar && (
          <TextField
            variant="outlined"
            component={Paper}
            className="max-h-full"
            value={searchValue}
            onChange={onSearchChange}
            placeholder=" جستجو کنید ..."
            InputProps={{
              style: {
                maxHeight: "48px",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchNormal1 color={theme.palette.primary.light} />
                </InputAdornment>
              ),
            }}
          />
        )}
        {buttons &&
          buttons.map((button, index) => (
            <React.Fragment key={index}>
              {button.customComponent ? (
                button.customComponent
              ) : (
                <Button
                  variant={button.variant || "contained"} // Use the variant from props or default to "contained"
                  sx={{ height: "48px", minWidth: "120px", boxShadow: "none" }}
                  onClick={button.onClick}
                >
                  {button.text}
                </Button>
              )}
            </React.Fragment>
          ))}
      </Box>
    </Box>
  );
};

export default PageHeader;
