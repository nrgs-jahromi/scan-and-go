import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import FormikInput from "../../common/inputs/FormikInput";
import { Edit2 } from "iconsax-react";
import { useAdminInformationUpdate } from "../../../api/admin/updateAdminInfo";
import { notif } from "../../common/notification/Notification";
interface PersonalInformationProps {
  userInfo: {
    first_name: string;
    last_name: string;
    username: string;
    national_code: string;
    birth_date: string;
    telephone_number: string;
    phone_number: string;
    profile_image: {
      id: string;
      url: string;
    } | null;
  };
}

const ChangePassword: React.FC<PersonalInformationProps> = ({ userInfo }) => {
  const [editMode, setEditMode] = useState(false);
  const {
    mutate: updateAdminInfo,
    isLoading,
    isSuccess: isChangePassSuccess,
    isError: isChangePassError,
    error: errorDescription,
  } = useAdminInformationUpdate();

  const formik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
    },
    validationSchema: Yup.object().shape({
      current_password: Yup.string().required("این فیلد اجباری است."),
      new_password: Yup.string()
        .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد.")
        .required("این فیلد اجباری است."),
    }),
    onSubmit: (values) => {
      updateAdminInfo({
        body: {
          ...values,
          old_password: values.current_password,
          new_password: values.new_password,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          username: userInfo.username,
          national_code: userInfo.national_code,
          birth_date: userInfo.birth_date,
          telephone_number: userInfo.telephone_number,
          phone_number: userInfo.phone_number,
          profile_image: userInfo.profile_image ? userInfo.profile_image.id : null,
        },
      });
    },
  });

  const toggleEditMode = () => {
    setEditMode(!editMode);
    formik.resetForm();
  };

  useEffect(() => {
    if (isChangePassSuccess) {
      notif("رمز عبور با موفقیت تغییر کرد.", { variant: "success" });

      setEditMode(false);
      formik.resetForm();
    } else if (isChangePassError) {
      notif(`${errorDescription}`, { variant: "error" });
    }
  }, [isChangePassError, isChangePassSuccess]);

  return (
    <Box component={Paper} width={"100%"} py={2} px={4} className="space-y-4">
      <Box className="w-full flex justify-between items-center">
        <Typography variant="h6">تغییر رمز عبور</Typography>
        <Button
          disabled={editMode}
          variant="outlined"
          sx={{ height: "48px" }}
          startIcon={<Edit2 size={16} />}
          onClick={toggleEditMode}
        >
          ویرایش
        </Button>
      </Box>
      <FormikProvider value={formik}>
        <Form>
          <Box className="w-full md:grid md:grid-cols-2 gap-8">
            <FormikInput
              fullWidth
              name="current_password"
              label="رمز عبور فعلی"
              type="password"
              disabled={!editMode}
            />
            <FormikInput
              fullWidth
              name="new_password"
              label="رمز عبور جدید"
              type="password"
              disabled={!editMode}
            />
          </Box>
        </Form>
      </FormikProvider>
      {editMode && (
        <Box className="w-full flex gap-8 h-14 px-3">
          <Button fullWidth variant="outlined" onClick={toggleEditMode}>
            انصراف
          </Button>
          <Button fullWidth variant="contained" onClick={formik.submitForm} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : "ثبت"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ChangePassword;
