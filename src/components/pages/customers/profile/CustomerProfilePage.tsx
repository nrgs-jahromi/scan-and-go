import { Box } from "@mui/material";
import { useParams } from "react-router";
import BasicInformationSection from "./BasicInformationSection";
import AdditionalInformationSection from "./AdditionalInformationSection";
import BankInformationSection from "./BankInformationSection";
import InvestmentInformationSection from "./InvestmentInformationSection";

const CustomerProfilePage = () => {
  const params = useParams();
  const userId = params.userId!;

  return (
    <Box>
      <BasicInformationSection />

      <AdditionalInformationSection />

      <BankInformationSection />

      <InvestmentInformationSection />
    </Box>
  );
};

export default CustomerProfilePage;
