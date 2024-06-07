import { Box, Typography } from "@mui/material";
import { FC } from "react";

interface Props {
  image?: string;
  name: string;
}

const MediaPreview: FC<Props> = ({ image, name }) => {
  return (
    <Box className="p-2 flex items-center gap-x-4 min-w-fit border rounded-md">
      <Box className="rounded-sm h-14 w-16" bgcolor="primary.light">
        {image && <img src={image} alt={name} title={name} className="size-full" />}
      </Box>

      <Typography>{name}</Typography>
    </Box>
  );
};

export default MediaPreview;
