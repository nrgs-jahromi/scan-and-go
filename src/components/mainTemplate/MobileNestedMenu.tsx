import { useEffect, useState, FC } from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import theme from "../../theme";
import { List, ListItemButton, ListItemText } from "@mui/material";

const drawerBleeding = 56;

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  categoryName : string;
  items : NavbarCategory[]
};

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const NestedMenu: FC<Props> = ({ open, setOpen  , items , categoryName}) => {
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: "fit-content",
            overflow: "visible",
          },
        }}
        />

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        dir="rtl"
        ModalProps={{
            keepMounted: true,
        }}
       
            transitionDuration={{
              enter: 500,
              exit: 500,
            }}
      >
        <Puller />
        <Typography sx={{ p: 2, color: "text.secondary" }}>
          {categoryName}
        </Typography>
        <List component="div" disablePadding>
                  {items.map((option) => (
                    <ListItemButton
                      sx={{
                        padding: "8px 12px",
                        maxHeight: "32px",
                        bgcolor: "white",
                        ":hover": {
                          bgcolor: "white",
                          borderRight: "1px solid #C2BDF5",
                          color: theme.palette.primary.main,
                        },
                        // color:
                        //   active === option.id
                        //     ? theme.palette.primary.main
                        //     : theme.palette.grey[400],
                      }}
                    //   onClick={() => onNestedClick(option)}
                    >
                      <ListItemText
                        sx={{ textAlign: "initial" }}
                        primary={option.label}
                      />
                    </ListItemButton>
                  ))}
                </List>
      </SwipeableDrawer>
    </Root>
  );
};

export default NestedMenu;
