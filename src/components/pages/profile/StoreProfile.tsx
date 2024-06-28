import { Box, Paper } from "@mui/material";
import GlobalInfo from "./GlobalInfo";
import PageHeader from "../pageHeader/PageHeader";

const Profile = () => {
  return (
 
    
      
        <Box className="flex flex-col gap-4 h-full">
        <PageHeader
            title="اطلاعات فروشگاه"
            buttons={[
              {
                text: " ویرایش اطلاعات ",
                onClick: () => {},
                variant: "contained",
              },
             
            ]}
          />
          <Box className="w-full md:grid md:grid-cols-4 gap-8 h-full">
          <GlobalInfo />
          <Box component={Paper} className="col-span-3 "
          height={"100%"}>

          </Box>
          </Box>
        </Box>
     

    
  );
};

export default Profile;