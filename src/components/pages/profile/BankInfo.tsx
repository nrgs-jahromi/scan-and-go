import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import card from "../../../assets/card2.svg";

type Props = {
  storeData: StoreT;
};

const BankInfo: React.FC<Props> = ({ storeData }) => {
  return (
    <Box
      component={Paper}
      width={"100%"}
      className="p-6 space-y-5 m-0 flex flex-col justify-end items-center"
    >
      <Box
        sx={{
          width: "100%",
          aspectRatio: "3 / 2", // نسبت دو سوم (عرض / ارتفاع)
          backgroundImage: `url(${card})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        //   alignItems: "center",
          padding:4,
          borderRadius: 4,
          color:"white",
        //   rowGap:3,
        }}
      >
        <Typography variant="body1" >نام بانک</Typography>
        
        <Typography variant="body1" fontWeight={"bold"} textAlign={"center"}>شماره کارت</Typography>
        <Typography textAlign={"left"} variant="body1" fontWeight={"bold"}>{`IR${storeData.bank_shaba_number}`}</Typography>
      <Box className="w-full flex justify-between items-center">
      <Typography variant="body1" fontWeight={"bold"} textAlign={"center"}> 04/07</Typography>
      <Typography textAlign={"left"} variant="body1" fontWeight={"bold"}>{storeData.owner_name??"نرگس جهرمی زاده"}</Typography>
      </Box>
      </Box>
    </Box>
  );
};

export default BankInfo;
