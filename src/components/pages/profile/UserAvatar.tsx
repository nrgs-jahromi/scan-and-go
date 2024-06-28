import { Box } from "@mui/material";
import { FC } from "react";

import MockAvatar from "../../../assets/samllLogo.svg";

interface Props {
  size?: number;
}

const UserAvatar: FC<Props> = ({ size = 64 }) => {
  return (
    <Box width={size} height={size}>
      <img src={MockAvatar} alt="User" />
    </Box>
  );
};

export default UserAvatar;
