import { Box, useMediaQuery } from "@mui/material";
import SideNavigation from "./SideNavigation";
import { Outlet } from "react-router";
import theme from "../../theme";
// import FixedBottomNavigation from "./MobileNavigation";

const MainTemplate = () => {
  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  return (
    <Box
      className="flex flex-row h-screen w-screen box-border"
      sx={{
        flexGrow: 1,
        bgcolor: theme.palette.background.paper,
        padding: "32px",
        gap: 4,
        paddingBottom: isLargeScreen ? "" : "100px",
      }}
      component="main"
    >
      <SideNavigation />

      <Box
        component="main"
        sx={{ flexGrow: 1, paddingBottom: isLargeScreen ? "" : "100px" }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
export default MainTemplate;
