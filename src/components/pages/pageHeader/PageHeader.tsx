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
  text: string;
  onClick: () => void;
  variant?: ButtonProps["variant"]; // Optional variant property
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
    <Box className="w-full flex justify-between">
      <Box className="flex align-middle items-center py-3 gap-3">
        <Divider
          orientation="vertical"
          variant="middle"
          className="w-1 rounded-sm"
          sx={{ bgcolor: theme.palette.primary.main }}
        />
        <Typography variant="h6">{title}</Typography>
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
            <Button
              key={index}
              variant={button.variant || "contained"} // Use the variant from props or default to "contained"
              sx={{ height: "48px", minWidth: "120px", boxShadow: "none" }}
              onClick={button.onClick}
            >
              {button.text}
            </Button>
          ))}
      </Box>
    </Box>
  );
};

export default PageHeader;
