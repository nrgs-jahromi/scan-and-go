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
import { Camera, Edit } from "iconsax-react";

type Props = {
  storeData: StoreT;
  refetchStoreData: () => void;
};

type FormItem = {
  label: string;
  key: keyof StoreT;
  placeholder?: string;
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
    { label: "نام مالک", key: "owner_name", placeholder: " علی احمدی" },
    { label: "کد ملی مالک", key: "owner_national_code", placeholder: " 1280000000" },
    { label: "شماره همراه", key: "phone", placeholder: " ۰۹۱۲۱۲۳۴۵۶۷" },
    { label: "تلفن", key: "phone", placeholder: " ۰۲۱۱۲۳۴۵۶۷۸" },
    { label: "شماره ثبت", key: "registration_number", placeholder: " ۱۲۳۴۵۶۷۸۹" },
    { label: "شماره مالیاتی", key: "tax_number", placeholder: " ۹۸۷۶۵۴۳۲۱" },
    { label: "سیاست تخفیف", key: "discount_policy", placeholder: "توضیحی برای سیاست تخفیف" },
    { label: "رنگ سازمانی", key: "store_color", placeholder: "#000000" },
    { label: "کد پستی", key: "postal_code", placeholder: " ۱۲۳۴۵۶۷۸۹" },
    { label: "شهر", key: "city", placeholder: " تهران" },
    { label: "آدرس", key: "address", placeholder: " خیابان ولیعصر، پلاک ۱۰" },
  ];

  useEffect(() => {
    if (isChangeProfileSuccess) {
      notif("ویرایش اطلاعات فروشگاه با موفقیت انجام شد.", { variant: "success" });
      setIsLoading(false);
    } else if (isChangeProfileError) {
      notif(`${errorDescription}`, { variant: "error" });
      setIsLoading(false);
    }
  }, [isChangeProfileError, isChangeProfileSuccess, refetchStoreData]);

  const handleEditToggle = () => {
    if (!isEditing) setIsEditing(true);
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
    if (storeData.icon) setUploadedImage(API_BASE_URL + storeData.icon);
    else setUploadedImage(defaultProfile);
  }, [storeData]);

  return (
    <Box
      component={Paper}
      width={"100%"}
      height={"100%"}
      className="p-6 space-y-5 cursor-pointer"
      position="relative"
      onClick={handleEditToggle}
    >
      <Box
        className={`${
          isEditing ? "" : "flex"
        } justify-start items-center gap-3`}
      >
        <Box width={88} height={88} position="relative">
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
          {isEditing && (
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                padding: 1,
                borderRadius: "50%",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.default,
                border: `2px solid ${theme.palette.background.default}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                id="icon-button-file"
                onChange={handleImageChange}
              />
              <label htmlFor="icon-button-file" style={{ cursor: "pointer" }}>
                <Camera size={18} />
              </label>
            </Box>
          )}
        </Box>
        <Box className="flex flex-col justify-between ">
          {isEditing ? (
            <Box className="space-y-3">
              <Box>
                <Typography> نام فروشگاه</Typography>
                <TextField
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Box>
              <Box>
                <Typography> نوع فروشگاه</Typography>
                <TextField
                  name="business_type"
                  value={formData.business_type || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                  
                />
              </Box>
              <Box>
                <Typography> نام تجاری</Typography>
                <TextField
                  name="trade_name"
                  value={formData.trade_name || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Box>
            </Box>
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
        {formItems.map(({ label, key , placeholder }) => (
          <Box
            key={key}
            className="flex w-full justify-between items-center gap-2"
          >
            <Typography variant="body1" sx={{ whiteSpace: "nowrap" }}>
              {label}
            </Typography>
            {isEditing ? (
              key === "store_color" ? (
                <TextField
                  name={key}
                  type="color"
                  value={formData[key] || "#000000"}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                  // sx={{ width: 80 }}
                  />
                ) : (
                  <TextField
                  name={key}
                  value={formData[key] || ""}
                  placeholder={placeholder}
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
              <Typography variant="body2">
                {typeof storeData[key] === "object"
                  ? (storeData[key]?JSON.stringify(storeData[key]) :"-")
                  : storeData[key]?.toString() || "-"}
              </Typography>
            )}
          </Box>
        ))}
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

export default StoreInfo;
