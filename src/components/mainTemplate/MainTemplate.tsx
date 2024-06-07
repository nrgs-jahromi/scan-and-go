import { Box, useMediaQuery } from "@mui/material";
import SideNavigation from "./SideNavigation";
import { Outlet } from "react-router";
import theme from "../../theme";
import FixedBottomNavigation from "./MobileNavigation";

const MainTemplate = () => {
  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  return (
    <Box className="flex flex-row h-screen w-screen ">
 <SideNavigation />
      <Box className="flex flex-col w-full h-full  overflow-auto">
        {/* <TemplateHeader /> */}
        <Box component="main" sx={{ flexGrow: 1 , bgcolor: theme.palette.background.paper , padding:"32px", paddingBottom:isLargeScreen?"":"100px"}}>
          <Outlet />
        </Box>
      </Box>
    
    </Box>
  );
};
export default MainTemplate;
