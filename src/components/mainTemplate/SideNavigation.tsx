import * as React from "react";
import { useEffect, ReactNode, useMemo, useState } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import logo from "../../assets/logo.svg";
import smallLogo from "../../assets/samllLogo.svg";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Collapse, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router";
import theme from "../../theme";
import moment from "jalali-moment";

import {
  ArrowDown2,
  ArrowUp2,
  Element4,
  Home,
  LogoutCurve,
  Profile,
  Profile2User,
  Wallet1,
} from "iconsax-react";

const drawerWidth = 273;

type NavbarItem = {
  id: string;
  category_id: string;
  label: string;
  path: string;
};
type NavbarCategory = {
  id: string;
  label: string;
  path?: string;
  icon1: ReactNode;
  icon2: ReactNode;
  options?: NavbarItem[] | undefined;
};

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  borderLeft: "none",
  backgroundColor: "white",
  padding: theme.spacing(4, 4),
  border: "none",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  borderLeft: "none",
  backgroundColor: "white",
  border: "none",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  padding: "0",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4, 4),
    width: "112px",
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",

  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideNavigation() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const navigate = useNavigate();
  const today = moment().locale("fa").format("dddd DD  MMMM ماه  YYYY ");

  const navbarItems: NavbarCategory[] = useMemo(
    () => [
      {
        id: "dashboard",
        label: "میز کار",
        path: "dashboard",
        icon1: <Home />,
        icon2: <Home variant="Bold" />,
      },
      {
        id: "products",
        label: "محصولات",
        icon1: <Element4 />,
        icon2: <Element4 variant="Bold" />,
        options: [
          {
            id: "products-add",
            category_id: "products",
            label: "افزودن محصول",
            path: "products/add",
          },
          {
            id: "products-list",
            category_id: "products",
            label: "لیست محصولات",
            path: "products",
          },
        ],
      },
      {
        id: "reports",
        label: "گزارشات",
        icon1: <Element4 />,
        icon2: <Element4 variant="Bold" />,
        options: [
          {
            id: "periodic-reports",
            category_id: "reports",
            label: "گزارشات دوره‌ای",
            path: "reports/periodic",
          },
          {
            id: "invoices",
            category_id: "reports",
            label: "فاکتورها",
            path: "reports/invoices",
          },
        ],
      },
      {
        id: "profile",
        label: "اطلاعات پروفایل",
        path: "profile",
        icon1: <Profile />,
        icon2: <Profile variant="Bold" />,
      },
      {
        id: "exit",
        label: "خروج",
        path: "login",
        icon1: <LogoutCurve />,
        icon2: <LogoutCurve variant="Bold" />,
      },
    ],
    []
  );
  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const lastPathPart = pathParts[pathParts.length - 1];

    const matchingNavbarItem = navbarItems.find(
      (item) => lastPathPart === item.id
    );
    if (matchingNavbarItem) {
      setActive(matchingNavbarItem.id);
    }
  }, [navbarItems, active]);
  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isLargeScreen) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isLargeScreen]);
  const navigateHandler = (item: NavbarCategory) => {
    if (selectedCategory === item.id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(item.id);
    }
    setActive(item.id);
    if (item.path) navigate(item.path);
  };

  const onNestedClick = (item: NavbarItem) => {
    setActive(item.id);
    navigate(item.path);
  };

  return (
    <Drawer anchor="right" variant="permanent" open={open}>
      <DrawerHeader>
        <Box onClick={handleDrawerClose} className="flex flex-row gap-2">
          {<img src={smallLogo}></img>}
        </Box>
      </DrawerHeader>
      <List>
        {navbarItems.map((item) => (
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onMouseDown={() => setOpen(true)}
          >
            <ListItemButton
              onClick={() => navigateHandler(item)}
              sx={{
                minHeight: 43,
                borderRadius: "12px",
                marginY: 3,
                justifyContent: open ? "initial" : "center",
                padding: "8px 12px",
                columnGap: 1,
                bgcolor: active === item.id ? "#F0EEFD" : "white",
                ":hover": {
                  bgcolor: "#F0EEFD", // Change to the desired hover color
                  color: theme.palette.primary.main,
                },
                color:
                  active === item.id
                    ? theme.palette.primary.main
                    : theme.palette.grey[400],
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mx: 0,
                  justifyContent: "center",
                  fontSize: 20,
                  color:
                    active === item.id
                      ? theme.palette.primary.main
                      : theme.palette.grey[400],
                }}
              >
                {active === item.id ? item.icon2 : item.icon1}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={item.label}
                  sx={{
                    textAlign: "initial",
                    fontSize: "18px",
                  }}
                />
              )}
              {item.options ? (
                selectedCategory === item.id ? (
                  <ArrowUp2 size={16} />
                ) : (
                  <ArrowDown2 size={16} />
                )
              ) : (
                <></>
              )}
            </ListItemButton>
            {item.options && open && (
              <Collapse
                in={selectedCategory === item.id}
                timeout="auto"
                unmountOnExit
                sx={{ marginTop: "-16px" }}
              >
                <List component="div" disablePadding>
                  {item.options.map((option) => (
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
                        color:
                          active === option.id
                            ? theme.palette.primary.main
                            : theme.palette.grey[400],
                      }}
                      onClick={() => onNestedClick(option)}
                    >
                      <ListItemText
                        sx={{ textAlign: "initial" }}
                        primary={option.label}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </ListItem>
        ))}
      </List>
      {open && (
        <Typography
          sx={{
            position: "absolute",
            bottom: "12px",
            right: "32px",
            width: "100%",
            padding: "8px 12px",
            backgroundColor: "white",
          }}
          variant="subtitle1"
        >
          {today}
        </Typography>
      )}
    </Drawer>
  );
}
