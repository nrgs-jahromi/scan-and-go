import { FC } from "react";
import CardWithHeading from "../../../common/sections/CardWithHeading";
import { Box, Button, Typography } from "@mui/material";
import { Edit2 } from "iconsax-react";

const AdditionalInformationSection: FC = () => {
  return (
    <CardWithHeading title="مشخصات تکمیلی">
      {/* Edit Button */}
      <Button
        variant="outlined"
        sx={{ position: "absolute", left: "1.5rem", top: "1.5rem" }}
        startIcon={<Edit2 size="18" />}
      >
        ویرایش
      </Button>

      <Box className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
        <Typography color="primary" sx={{ gridColumnStart: 1, gridColumnEnd: -1 }}>
          مشخصات قیم
        </Typography>

        <Typography>نام:</Typography>
        <Typography>نام خانوادگی:</Typography>
        <Typography>نسبت:</Typography>
        <Typography>کد ملی:</Typography>
        <Typography>شماره همراه:</Typography>
        <Typography>کد پستی:</Typography>
        <Typography>آدرس:</Typography>

        <Typography mt={2} color="primary" sx={{ gridColumnStart: 1, gridColumnEnd: -1 }}>
          مشخصات وارث
        </Typography>

        <Typography>نام:</Typography>
        <Typography>نام خانوادگی:</Typography>
        <Typography>نسبت:</Typography>
        <Typography>کد ملی:</Typography>
        <Typography>شماره همراه:</Typography>
        <Typography>میزان سهم:</Typography>
        <Typography>آدرس:</Typography>

        <Typography mt={2} color="primary" sx={{ gridColumnStart: 1, gridColumnEnd: -1 }}>
          مشخصات معرف
        </Typography>

        <Typography>نام:</Typography>
        <Typography>نام خانوادگی:</Typography>
        <Typography>کد ملی:</Typography>
        <Typography>شماره همراه:</Typography>
      </Box>
    </CardWithHeading>
  );
};

export default AdditionalInformationSection;
