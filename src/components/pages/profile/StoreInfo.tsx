import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import theme from "../../../theme";
import { notif } from "../../common/notification/Notification";
import { useUpdateStoreInformation } from "../../../api/store/editStoreInfo";
import defaultProfile from "../../../assets/react.svg";
import { API_BASE_URL } from "../../../api/config";
import { Edit } from "iconsax-react";

type Props = {
  storeData: StoreT;
  refetchStoreData: () => void;
};

type FormItem = {
  label: string;
  key: keyof StoreT;
};

const StoreInfo: React.FC<Props> = ({ storeData, refetchStoreData }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(storeData);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const {
    mutate: updateAdminInfo,
    isSuccess: isChangeProfileSuccess,
    isError: isChangeProfileError,
    error: errorDescription,
  } = useUpdateStoreInformation();

  const formItems: FormItem[] = [
    { label: "نام مالک", key: "owner_name" },
    { label: "کد ملی مالک", key: "owner_national_code" },
    { label: "شماره همراه", key: "phone" },
    { label: "تلفن", key: "phone" },
    { label: "شماره ثبت", key: "registration_number" },
    { label: "شماره مالیاتی", key: "tax_number" },
    { label: "سیاست تخفیف", key: "discount_policy" },
    { label: "رنگ سازمانی", key: "store_color" },
    { label: "کد پستی", key: "postal_code" },
    { label: "شهر", key: "city" },
    { label: "آدرس", key: "address" },
  ];

  useEffect(() => {
    if (isChangeProfileSuccess) {
      notif("تصویر پروفایل با موفقیت تغییر کرد.", { variant: "success" });
      setIsLoading(false);
    } else if (isChangeProfileError) {
      notif(`${errorDescription}`, { variant: "error" });
      setIsLoading(false);
    }
  }, [isChangeProfileError, isChangeProfileSuccess, refetchStoreData]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setUploadedImage(URL.createObjectURL(file));
    }
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

    if (selectedImage) {
      formDataToSubmit.append("icon", selectedImage);
    }

    for (const pair of formDataToSubmit.entries()) {
      console.log(pair[0], pair[1]);
  }
  
    updateAdminInfo(formDataToSubmit);
    setIsEditing(false);
  };

  useEffect(() => {
    setUploadedImage(API_BASE_URL + storeData.icon);
  }, [storeData]);

  return (
    <Box
      component={Paper}
      width={"100%"}
      height={"100%"}
      className="p-6 space-y-5"
      position="relative"
    >
      <IconButton
        aria-label="edit"
        size="small"
        sx={{
          position: "absolute",
          top: theme.spacing(1),
          left: theme.spacing(1),
        }}
        onClick={handleEditToggle}
      >
        <Edit />
      </IconButton>
      <Box className="flex justify-start items-center gap-3">
        <Box width={88} height={88}>
          <img
            src={uploadedImage || defaultProfile}
            alt="User"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: `2px solid ${theme.palette.primary.light}`,
            }}
          />
        </Box>
        <Box className="flex flex-col justify-between">
          {isEditing ? (
            <>
              <TextField
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                fullWidth
              />
              <TextField
                name="business_type"
                value={formData.business_type || ""}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                fullWidth
              />
              <TextField
                name="trade_name"
                value={formData.trade_name || ""}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                fullWidth
              />
              <Button variant="contained" component="label" color="primary">
                بارگذاری تصویر
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" fontWeight={"bold"}>
                {storeData.name || "-"}
              </Typography>
              <Typography
                variant="caption"
                color={theme.palette.primary.main}
                fontWeight={"bold"}
              >
                {storeData.business_type || "-"}
              </Typography>
              <Typography variant="body2">
                {storeData.trade_name || "-"}
              </Typography>
            </>
          )}
        </Box>
      </Box>
      <Divider />
      <Box className="space-y-3">
        {formItems.map(({ label, key }) => (
          <Box key={key} className="flex w-full justify-between items-center">
            <Typography variant="body1">{label}</Typography>
            {isEditing ? (
              key === "store_color" ? (
                <TextField
                  name={key}
                  type="color"
                  value={formData[key] || "#000000"}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  sx={{ width: 80 }}
                />
              ) : (
                <TextField
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              )
            ) : key === "store_color" ? (
              <Box className="flex items-center gap-2">
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: storeData[key] || "#000000",
                  }}
                />
                <Typography variant="body2">
                  {storeData[key] || "#000000"}
                </Typography>
              </Box>
            ) : (
              <Typography>
                {typeof storeData[key] === "object"
                  ? JSON.stringify(storeData[key])
                  : storeData[key]?.toString() || ""}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
      {isEditing && (
        <Box className="flex justify-end space-x-2 mt-4">
          <Button variant="outlined" onClick={handleEditToggle}>
            لغو
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            ذخیره
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default StoreInfo;
