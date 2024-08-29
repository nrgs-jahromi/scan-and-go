import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import AdminProfileImage from "./AdminProfileImg";
import PersonalInformation from "./PersonalInfo";
import ChangePassword from "./ChangePassword";
import PageHeader from "../pageHeader/PageHeader";
import { useStoreInformation } from "../../../api/store/getStoreInfo";
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
    <Box className="space-y-4">
       <PageHeader
        title="اطلاعات فروشگاه"
        // buttons={[
        //   {
        //     text: " ویرایش اطلاعات ",
        //     onClick: () => {},
        //     variant: "contained",
        //   },
        // ]}
      />
      {data && (
        <>
          <AdminProfileImage storeData={data} />
          {/* <PersonalInformation userInfo={data} /> */}
          {/* <ChangePassword userInfo={data} /> */}
        </>
      )}
    </Box>
  );
};

export default StoreProfile;
