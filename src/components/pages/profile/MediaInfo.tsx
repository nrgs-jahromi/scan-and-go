import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useUpdateStoreInformation } from "../../../api/store/editStoreInfo";
import { notif } from "../../common/notification/Notification";

type Props = {
  storeData: StoreT;
};

const MediaInfo: React.FC<Props> = ({ storeData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(storeData);

  const {
    mutate: updateAdminInfo,
    isSuccess: isChangeMediaSuccess,
    isError: isChangeMediaError,
    error: errorDescription,
  } = useUpdateStoreInformation();

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

    updateAdminInfo(formDataToSubmit);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isChangeMediaSuccess) {
      notif("ویرایش اطلاعات فروشگاه با موفقیت انجام شد.", {
        variant: "success",
      });
    } else if (isChangeMediaError) {
      notif(`${errorDescription}`, { variant: "error" });
    }
  }, [isChangeMediaError, isChangeMediaSuccess]);

  return (
    <Box
      component={Paper}
      width={"100%"}
      className="p-6 space-y-5 m-0 flex flex-col justify-end cursor-pointer"
      onClick={handleEditToggle}
    >
      <Typography textAlign={"right"} variant="body1" fontWeight={"bold"}>
        صفحات مجازی
      </Typography>
      <Divider />
      <Box className="flex w-full justify-between items-center gap-3">
        <Typography variant="body1">تلگرام</Typography>
        {isEditing ? (
          <TextField
            name="telegram"
            value={formData.telegram || ""}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            fullWidth
            placeholder="https://t.me/scanbuy_channel"
          />
        ) : (
          <Typography variant="body2">{storeData.telegram || "-"}</Typography>
        )}
      </Box>
      <Box className="flex w-full justify-between items-center gap-3">
        <Typography variant="body1">اینستاگرام</Typography>
        {isEditing ? (
          <TextField
            name="instagram"
            value={formData.instagram || ""}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            fullWidth
            placeholder="https://www.instagram.com/scanbuy"
          />
        ) : (
          <Typography variant="body2">{storeData.instagram || "-"}</Typography>
        )}
      </Box>
      <Box className="flex w-full justify-between items-center  gap-3">
        <Typography variant="body1">وبسایت</Typography>
        {isEditing ? (
          <TextField
            name="facebook"
            value={formData.facebook || ""}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            fullWidth
            placeholder="https://www.scanbuy.com"
          />
        ) : (
          <Typography variant="body2">{storeData.facebook || "-"}</Typography>
        )}
      </Box>
      {isEditing && (
        <Box className="flex justify-end space-x-2 mt-4 gap-3">
          <Button
            variant="outlined"
            fullWidth
            sx={{ height: 40 }}
            onClick={()=>setIsEditing(false)}
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
      )}
    </Box>
  );
};

export default MediaInfo;
