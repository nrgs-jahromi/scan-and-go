import React, { useEffect, useState } from "react";
import { Box, Divider, Paper, Typography, TextField, Button } from "@mui/material";
import { useUpdateStoreInformation } from "../../../api/store/editStoreInfo";
import { notif } from "../../common/notification/Notification";

type OpeningHours = { [key: string]: string | null };

type Props = {
  storeData: StoreT;
};

const WorkTimeInfo: React.FC<Props> = ({ storeData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<OpeningHours>(storeData.opening_hours);

  const {
    mutate: updateStoreInfo,
    isSuccess: isChangeMediaSuccess,
    isError: isChangeMediaError,
    error: errorDescription,
  } = useUpdateStoreInformation();

  useEffect(() => {
    setFormData(storeData.opening_hours);
  }, [storeData]);

  const handleEditToggle = () => {
    if (!isEditing) setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, day: string) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [day]: value || null
    }));
  };

  const handleSave = () => {
    const formDataToSubmit = new FormData();


    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(`${key}`, value || '');    
    });

    console.log("FormData to submit:", formDataToSubmit);

    updateStoreInfo(formDataToSubmit);
    setIsEditing(false);
    // refetchStoreData(); // Re-fetch store data after update
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
        ساعات کار
      </Typography>
      <Divider />
      {Object.entries(formData).map(([day, hours]) => (
        <Box key={day} className="flex w-full justify-between items-center gap-3">
          <Typography variant="body1">{day}</Typography>
          {isEditing ? (
            <TextField
              name={day}
              value={hours || ""}
              onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, day)}
              variant="outlined"
              size="small"
              fullWidth
              placeholder="8:00-12:00"
            />
          ) : (
            <Typography variant="body2">{hours || "-"}</Typography>
          )}
        </Box>
      ))}
      {isEditing && (
        <Box className="flex justify-end space-x-2 mt-4 gap-3">
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
      )}
    </Box>
  );
};

export default WorkTimeInfo;
