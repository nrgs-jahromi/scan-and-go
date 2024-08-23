import { Menu, MenuItem, Typography } from "@mui/material";
import { FC } from "react";

type ActionMenuProps = {
  rowId: number;
  onClose: () => void;
  actions: ActionTableT[];
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
    <Menu
      open={isOpen}
      anchorReference="anchorPosition"
      anchorPosition={{ top: clickPosition.y, left: clickPosition.x }}
      onClose={onClose}
      dir="rtl"
    >
      {actions.map((action, index) => {
        // Determine if the action should be disabled
        const isDisabled = typeof action.disabled === 'function' ? action.disabled(rowId) : action.disabled;

        return (
          <MenuItem key={index} onClick={() => action.onClick(rowId)} disabled={isDisabled}>
            <Typography variant="body2">{action.label}</Typography>
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default ActionMenu;
