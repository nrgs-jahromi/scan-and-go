import { MoreHoriz } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';


interface ActionMenuProps {
  id: string; // یا نوع دیگری که برای شناسایی سطرها استفاده می‌کنید
}

const ActionMenu: React.FC<ActionMenuProps> = ({ id }) => {
  const [actionMenuOpen, setActionMenuOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionMenuOpen(true);
  };

  const handleMenuClose = () => {
    setActionMenuOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <MoreHoriz />
      </IconButton>
      <Menu
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        anchorEl={null}
        open={actionMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => console.log(`Clicked item for row with id ${id}`)}>{id}  </MenuItem>
        {/* Add more menu items as needed */}
      </Menu>
    </>
  );
};

export default ActionMenu;
