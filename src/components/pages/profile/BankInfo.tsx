import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import card from "../../../assets/card2.svg";
import { useUpdateStoreInformation } from "../../../api/store/editStoreInfo";
import { notif } from "../../common/notification/Notification";

type Props = {
  storeData: StoreT;
};

const BankInfo: React.FC<Props> = ({ storeData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(storeData);

  const {
    mutate: updateBankInfo,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    error: updateErrorDescription,
  } = useUpdateStoreInformation();

  useEffect(() => {
    setFormData(storeData);
  }, [storeData]);

  const handleEditToggle = () => {
    if (!isEditing) setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        formDataToSubmit.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        formDataToSubmit.append(key, String(value));
      }
    });

    for (const pair of formDataToSubmit.entries()) {
      console.log(pair[0], pair[1]);
    }

    updateBankInfo(formDataToSubmit);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      notif("ویرایش اطلاعات بانکی با موفقیت انجام شد.", {
        variant: "success",
      });
    } else if (isUpdateError) {
      notif(`${updateErrorDescription}`, { variant: "error" });
    }
  }, [isUpdateError, isUpdateSuccess]);

  return (
    <Box
      component={Paper}
      width={"100%"}
      className="p-6 space-y-5 m-0 flex flex-col justify-end items-center cursor-pointer"
      onClick={handleEditToggle}
    >
      {isEditing ? (
        <>
          <Box className="flex w-full justify-between items-center gap-2">
            <Typography variant="body1" sx={{ whiteSpace: "nowrap" }}>
              نام بانک
            </Typography>
            <TextField
              name="bank_name"
              value={formData.bank_name }
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Box>
          <Box className="flex w-full justify-between items-center gap-2">
            <Typography variant="body1" sx={{ whiteSpace: "nowrap" }}>
              شماره کارت
            </Typography>
            <TextField
              name="bank_account_number"
              value={formData.bank_account_number }
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Box>
          <Box className="flex w-full justify-between items-center gap-2">
            <Typography variant="body1" sx={{ whiteSpace: "nowrap" }}>
              شماره شبا
            </Typography>
            <TextField
              name="bank_shaba_number"
              value={formData.bank_shaba_number }
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Box>

          <Box className="flex justify-end space-x-2 mt-4 gap-3 w-full">
            <Button
              variant="outlined"
              fullWidth
              sx={{ height: 40 }}
              onClick={() => setIsEditing(false)}
            >
              لغو
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{ height: 40 }}
              color="primary"
              onClick={handleSave}
            >
              ذخیره
            </Button>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            width: "100%",
            aspectRatio: "3 / 2", // نسبت دو سوم (عرض / ارتفاع)
            backgroundImage: `url(${card})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 4,
            borderRadius: 4,
            color: "white",
          }}
        >
          <Typography variant="body1">
            {formData.bank_name || "نام بانک"}
          </Typography>
          <Typography textAlign={"center"} variant="body1" fontWeight={"bold"}>
            {formData.bank_account_number || "شماره کارت"}
          </Typography>{" "}
          <Typography textAlign={"left"} variant="body1" fontWeight={"bold"}>
            {formData.bank_shaba_number || "--------IR"}
          </Typography>
          <Box className="w-full flex justify-between items-center">
            <Typography textAlign={"left"} variant="body1" fontWeight={"bold"}>
              {"04/07"}
            </Typography>
            <Typography textAlign={"left"} variant="body1" fontWeight={"bold"}>
              {formData.owner_name || "نام و نام خانوادگی مالک"}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BankInfo;
