import {
  Box,
  BoxProps,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { FC, useRef, useState } from "react";
import { Edit2 } from "iconsax-react";
import { MoreVertRounded } from "@mui/icons-material";

interface Props {
  wrapperProps?: BoxProps;
}

const CreditCardActionMenu: FC<Props> = ({ wrapperProps }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuIconRef = useRef(null);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <Box {...wrapperProps}>
      <IconButton
        ref={menuIconRef}
        aria-controls={isMenuOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? "true" : undefined}
        onClick={handleMenuOpen}
      >
        <MoreVertRounded />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={menuIconRef.current}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Edit2 size="14" />
          </ListItemIcon>
          <ListItemText>ویرایش</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CreditCardActionMenu;
