import { Box } from "@mui/material";
import { FC } from "react";
import MockAvatar from "../../../../assets/changePassword.png";
import { API_BASE_URL } from "../../../../vars/env";

interface Props {
  size?: number;
  url?: string;
}

const UserAvatar: FC<Props> = ({ size = 64, url }) => {
  return (
    <Box width={size} height={size}>
      <img
        src={url ? API_BASE_URL + url : MockAvatar}
        alt="User"
        style={{ width: "100%", height: "100%", borderRadius: "4px" }}
      />
    </Box>
  );
};

export default UserAvatar;
