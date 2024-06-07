import { FC } from "react";
import CardWithHeading from "../../../common/sections/CardWithHeading";
import { Box } from "@mui/material";
import ActionableCreditCard from "../../../dashboard/accounts/ActionableCreditCard";

const banks = [{}, {}];

const BankInformationSection: FC = () => {
  return (
    <CardWithHeading title="اطلاعات بانکی">
      <Box className="flex items-center gap-x-4">
        {banks.map((_b, i) => (
          <ActionableCreditCard key={i} />
        ))}
      </Box>
    </CardWithHeading>
  );
};

export default BankInformationSection;
