  import { Box, Paper, Typography } from "@mui/material";
  import { FC, ReactNode, useState } from "react";
  import theme from "../../theme";

  type ReportProps = {
    name: string;
    report_value: number;
    unit?: string;
    Icon: ReactNode;
  };

  const ShortReportCard: FC<ReportProps> = ({
    name,
    report_value,
    unit,
    Icon,
  }) => {
    const [hover , setHover]  = useState(false)
    return (
      <Box component={Paper} className="p-6 min-w-56 w-full" color={hover? "white" :""} bgcolor={hover ? theme.palette.primary.main: "white"} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
        <Box color={hover ? "white":theme.palette.primary.main}>{Icon}</Box>
        <Typography variant="subtitle1" color={hover ? "white":theme.palette.grey[400]}>
          {name}
        </Typography>
        <Typography variant="subtitle1" fontWeight={"bold"}>
          {report_value.toLocaleString("fa-IR")}
          {unit ? unit : ""}
        </Typography>
      </Box>
    );
  };
  export default ShortReportCard;
