import { Box, Button, Paper, Typography } from "@mui/material";
import theme from "../../../../theme";
import { useState } from "react";
import { Add, CloseCircle } from "iconsax-react";
import FormikInput from "../../../common/inputs/FormikInput";

const BankAccountForm = () => {
    const [accounts, setAccounts] = useState([{ id: Date.now() }]);

    const addAccount = () => {
      if (accounts.length < 3) {
        setAccounts([...accounts, { id: Date.now() }]);
      }
    };
    const removeAccount = (id: number) => {
      console.log("id :", id);
  
      setAccounts(accounts.filter((heir) => heir.id !== id));
    };
  return (
    <Box
      component={Paper}
      className="w-full h-full "
      height={"100%"}
      overflow={"auto"}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          borderRadius: "8px  8px 0 0",
          width: "100%",
          bgcolor: theme.palette.primary.light,
          height: "64px",
          paddingX: "24px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">اطلاعات بانکی</Typography>
      </Box>

      <Box className="w-full h-fit p-4">
      {accounts.map((heir, index) => (
            <Box
              maxHeight={"100%"}
              overflow={"auto"}
              rowGap={1}
              className=" md:grid md:grid-cols-2 grid-cols-1 gap-8 w-full mb-4"
            >
              <Box className="flex w-100 py-3 justify-between col-span-2">
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  color={theme.palette.grey[300]}
                >
                  حساب {index + 1}
                </Typography>

                {accounts.length > 1 && (
                  <CloseCircle onClick={() => removeAccount(heir.id)} />
                )}
              </Box>
              <FormikInput
                type="text"
                name={`bank${index+1}_first_name`}
                label="نام"
              />
              <FormikInput
                type="text "
                name={`bank${index+1}_last_name`}
                label=" نام خانوادگی"
              />
              <FormikInput
                type="text"
                name={`bank${index+1}_name`}
                label=" نام بانک "
              />

              <FormikInput
                type="number"
                name={`bank${index+1}_account_number`}
                label="شماره حساب "
              />

              <FormikInput
                type="number"
                name={`bank${index+1}_card_number`}
                label="  شماره کارت "
              />
              <FormikInput
                type="number"
                name={`bank${index+1}_iban_number`}
                label=" شماره شبا  "
              />

              
            </Box>
          ))}
       <Button
            disabled={accounts.length >= 3}
            startIcon={<Add/>}
            variant="outlined"
            sx={{gap:1}}
            onClick={addAccount}
          >
            {" "}
            افزودن حساب
          </Button>
      </Box>
    </Box>
  );
};

export default BankAccountForm;
