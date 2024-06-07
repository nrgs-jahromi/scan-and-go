import { Badge, Box, Divider, Typography, useMediaQuery } from "@mui/material";
import theme from "../../theme";
import { ArrowDown2, Notification } from "iconsax-react";
import moment from "jalali-moment";
import profile from "../../assets/react.svg";

const TemplateHeader = () => {
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));
  const today = moment().locale("fa").format("dddd DD  MMMM ماه  YYYY ");

  return (
    <Box className="w-full h-16 flex flex-rows justify-between px-8 py-6 sticky top-0 bg-white z-10 border-b bottom-1 md:border-none ">
      <Box className="w-fit h-full flex flex-rows justify-between gap-4 items-center">
        {isMdScreen && (
          <>
            <Typography variant="subtitle1" fontWeight="bold" color="#2C266A">
              زهرا عزیز؛ خوش اومدی!
            </Typography>
            <Divider orientation="vertical" variant="middle" />
          </>
        )}
        <Typography variant="subtitle1">{today}</Typography>
      </Box>
      <Box className="w-fit h-full flex flex-rows justify-between gap-4 items-center">
        <Badge badgeContent={400} color="primary" >
          <Notification color="#2C266A" />
        </Badge>

        <Divider orientation="vertical" variant="middle" />
        <img src={profile} className="rounded-full h-8 w-8 " alt="profileImg" />
        {isMdScreen && <Typography variant="subtitle1">زهرا</Typography>}
        <ArrowDown2 size={24} />
      </Box>
    </Box>
  );
};
export default TemplateHeader;
