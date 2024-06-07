import { FC } from "react";
import CreditCard from "./CreditCard";
import { Box } from "@mui/material";
import CreditCardActionMenu from "./CreditCardActionMenu";

const ActionableCreditCard: FC = () => {
  return (
    <Box className="relative w-80">
      <CreditCardActionMenu wrapperProps={{ className: "absolute top-2 right-2" }} />
      <CreditCard mode="view" />
    </Box>
  );
};

export default ActionableCreditCard;
