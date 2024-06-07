import { FC } from "react";
import CardWithHeading from "../../../common/sections/CardWithHeading";
import { Box, Button, Typography } from "@mui/material";
import { Edit2 } from "iconsax-react";
import UserAvatar from "./UserAvatar";
import EditableUserRating from "./EditableUserRating";
import MediaPreview from "../../../common/media/MediaPreview";

const data = [];

const BasicInformationSection: FC = () => {
  return (
    <CardWithHeading title="مشخصات اولیه">
      {/* Edit Button */}
      <Button
        variant="outlined"
        sx={{ position: "absolute", left: "1.5rem", top: "1.5rem" }}
        startIcon={<Edit2 size="18" />}
      >
        ویرایش
      </Button>

      {/* Fields */}
      <Box className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
        <Box className="flex items-center gap-x-3 col-span-4">
          <UserAvatar />

          <EditableUserRating />
        </Box>

        <Typography>تاریخ ثبت:</Typography>
        <Typography>نام:</Typography>
        <Typography>نام خانوادگی:</Typography>
        <Typography>تاریخ تولد:</Typography>
        <Typography>کد ملی:</Typography>
        <Typography>شماره شناسنامه:</Typography>
        <Typography>نام پدر:</Typography>
        <Typography>شغل:</Typography>
        <Typography>تلفن ثابت:</Typography>
        <Typography>شماره همراه:</Typography>
        <Typography>کد پستی:</Typography>
        <Typography>استان:</Typography>
        <Typography sx={{ gridColumnStart: 1, gridColumnEnd: -1 }}>آدرس:</Typography>

        <Box className="space-y-2">
          <Typography>عکس کارت ملی:</Typography>
          <MediaPreview name="card.jpeg" />
        </Box>

        <Box className="space-y-2">
          <Typography>عکس شناسنامه:</Typography>
          <MediaPreview name="card.jpeg" />
        </Box>
      </Box>
    </CardWithHeading>
  );
};

export default BasicInformationSection;
