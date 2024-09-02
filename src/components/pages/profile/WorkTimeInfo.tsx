import React from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";

type Props = {
  storeData: StoreT;
};

const WorkTimeInfo: React.FC<Props> = ({ storeData }) => {
  const openingHours = storeData.opening_hours || {}; // Provide a fallback empty object

  return (
    <Box
      component={Paper}
      width={"100%"}
      className="p-6 space-y-5 m-0 flex flex-col justify-end"
    >
      <Typography textAlign={"right"} variant="body1" fontWeight={"bold"}>
        ساعات کار
      </Typography>
      <Divider />
      {Object.entries(openingHours).map(([day, hours]) => (
        <Box key={day} className="flex w-full justify-between items-center">
          <Typography variant="body1">{day}</Typography>
          <Typography variant="body2">{hours || "-"}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default WorkTimeInfo;
