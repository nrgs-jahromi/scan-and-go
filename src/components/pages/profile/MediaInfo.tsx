import React from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";

type Props = {
  storeData: StoreT;
};

const MediaInfo: React.FC<Props> = ({ storeData }) => {
  return (
    <Box
      component={Paper}
      width={"100%"}
      className="p-6 space-y-5 m-0 flex flex-col justify-end"
    >
      <Typography textAlign={"right"} variant="body1" fontWeight={"bold"}>صفحات مجازی</Typography>
      <Divider />
      <Box className="flex w-full justify-between items-center">
        <Typography variant="body1">تلگرام</Typography>
        <Typography variant="body2">{storeData.telegram || "-"}</Typography>
      </Box>
      <Box className="flex w-full justify-between items-center">
        <Typography variant="body1">اینستاگرام</Typography>
        <Typography variant="body2">{storeData.instagram || "-"}</Typography>
      </Box>
      {/* <Box className="flex w-full justify-between items-center">
        <Typography variant="body1">فیس‌بوک</Typography>
        <Typography variant="body2">{storeData.facebook || "-"}</Typography>
      </Box> */}
      <Box className="flex w-full justify-between items-center">
        <Typography variant="body1">وبسایت</Typography>
        <Typography variant="body2">{storeData.facebook || "-"}</Typography>
      </Box>
    </Box>
  );
};

export default MediaInfo;
