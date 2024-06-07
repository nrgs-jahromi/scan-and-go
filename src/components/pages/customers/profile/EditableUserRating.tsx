import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import StarRating from "../../../common/StarRating";
import { Edit2 } from "iconsax-react";

interface Props {}

const EditableUserRating: FC<Props> = () => {
  return (
    <Box>
      <StarRating rating={2.5} />

      <Button variant="text" startIcon={<Edit2 size="14" />} size="small">
        ویرایش
      </Button>
    </Box>
  );
};

export default EditableUserRating;
