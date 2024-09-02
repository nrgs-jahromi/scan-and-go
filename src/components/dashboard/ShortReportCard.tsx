import { Box, Paper, Typography } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import theme from "../../theme";
import IconBox from "../common/IconBox";

type ReportProps = {
  name: string;
  report_value: number| undefined;
  unit?: string;
  Icon: ReactNode;
};

const ShortReportCard: FC<ReportProps> = ({
  name,
  report_value,
  unit,
  Icon,
}) => {
  const [hover, setHover] = useState(false);
  return (
    <Box  className="p-4 w-full flex col-span-1 gap-3 rounded-lg min-w-fit" >
    
      <IconBox
        icon={Icon}
        color={theme.palette.primary.main}
        size={48}
        borderRadius="8px"
      />
      {/* <Box color={hover ? "white":theme.palette.primary.main}>{Icon}</Box> */}
      <Box>
        <Typography
          variant="subtitle2"
          color={hover ? "white" : theme.palette.grey[400]}
          className="whitespace-nowrap"
        >
          {name}
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          {report_value?.toLocaleString("fa-IR")}
          {unit ? unit : ""}
        </Typography>
      </Box>
    
    </Box>
  );
};
export default ShortReportCard;
