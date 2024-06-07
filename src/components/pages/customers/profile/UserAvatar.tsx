import { Box } from "@mui/material";
import { FC } from "react";

import MockAvatar from "../../../../assets/avatar.png";

interface Props {}

const UserAvatar: FC<Props> = () => {
  return (
    <Box className="size-16">
      <img src={MockAvatar} alt="User" />
    </Box>
  );
};

export default UserAvatar;
