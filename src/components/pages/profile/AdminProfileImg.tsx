import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  CircularProgress,
} from "@mui/material";
import UserAvatar from "../customers/profile/UserAvatar";
import { Export, Trash } from "iconsax-react";
import theme from "../../../theme";

import { notif } from "../../common/notification/Notification";
import { useUpdateStoreInformation } from "../../../api/store/editStoreInfo";

type Props = {
  storeData: StoreT;
};

const AdminProfileImage: React.FC<Props> = ({ storeData }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    storeData.icon_url ?? null
  );
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: updateAdminInfo, isSuccess: isChangeProfileSuccess, isError: isChangeProfileError, error: errorDescription } = useUpdateStoreInformation();

  const handleRemoveImage = () => {
    setUploadedImage(null);
    // updateAdminInfo({
    //   body: new FormData(),  // ارسال فرم دیتا خالی برای حذف تصویر
    // });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("icon_url", file);
    setIsLoading(true);

    updateAdminInfo(
      formData,
    );
  };

  useEffect(() => {
    if (isChangeProfileSuccess) {
      notif("تصویر پروفایل با موفقیت تغییر کرد.", { variant: "success" });
      setIsLoading(false);
    } else if (isChangeProfileError) {
      notif(`${errorDescription}`, { variant: "error" });
      setIsLoading(false);
    }
  }, [isChangeProfileError, isChangeProfileSuccess]);

  return (
    <Box
      component={Paper}
      width={"100%"}
      className="flex flex-row items-center p-4 gap-4"
    >
      <UserAvatar url={uploadedImage || undefined} />
      <Box>
        {uploadedImage && (
          <IconButton onClick={handleRemoveImage}>
            <Trash color={theme.palette.primary.main} />
          </IconButton>
        )}
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="upload-image"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="upload-image">
          <Button
            startIcon={<Export />}
            variant="outlined"
            component="span"
            sx={{ height: "48px" }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "بارگزاری عکس"}
          </Button>
        </label>
      </Box>
    </Box>
  );
};

export default AdminProfileImage;
