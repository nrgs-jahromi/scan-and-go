import { Menu, MenuItem, Typography } from "@mui/material";
import { FC } from "react";

type Action = {
  label: string;
  function: (id: number) => void; // Adjusted function type to accept id
};

type ActionMenuProps = {
  rowId: number;
  onClose: () => void;
  actions: Action[];
  isOpen: boolean;
  clickPosition: { x: number; y: number };
};

const ActionMenu: FC<ActionMenuProps> = ({
  rowId,
  actions,
  isOpen,
  clickPosition,
  onClose,
}) => {
  return (
    <>
      <Menu
        open={isOpen}
        anchorReference="anchorPosition"
        anchorPosition={{ top: clickPosition.y, left: clickPosition.x }}
        onClose={onClose}
        dir="rtl"
      >
        {actions.map((action, index) => (
          <MenuItem key={index} onClick={() => action.function(rowId)}>
            <Typography variant="body2">{action.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
export default ActionMenu;
