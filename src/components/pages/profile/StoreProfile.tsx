import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import StoreInfo from "./AdminProfileImg";
import PersonalInformation from "./PersonalInfo";
import ChangePassword from "./ChangePassword";
import PageHeader from "../pageHeader/PageHeader";
import { useStoreInformation } from "../../../api/store/getStoreInfo";
import QRCodeInfo from "./QRCodeInfo";
// import { useAdminInformation } from "../../../api/admin/getAdminInfo";

const StoreProfile = () => {
  const { data, isLoading, error } = useStoreInformation();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">خطا در بارگزاری اطلاعات</Typography>;
  }

  console.log("store:" , data);
  
  return (
    <Box className=" md:grid grid-cols-3 h-full gap-6">

      {data && (
        <>
          <StoreInfo storeData={data} />
          <QRCodeInfo storeData={data} />
          {/* <PersonalInformation userInfo={data} /> */}
          {/* <ChangePassword userInfo={data} /> */}
        </>
      )}
    </Box>
  );
};

export default StoreProfile;
