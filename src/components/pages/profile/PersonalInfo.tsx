import React, { useEffect, useState } from "react";
import { Box, Paper, Button, Typography, CircularProgress } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import FormikInput from "../../common/inputs/FormikInput";
import FormikDatePicker from "../../common/inputs/FormikDatePicker";
import { Edit2 } from "iconsax-react";
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

const PersonalInformation: React.FC<PersonalInformationProps> = ({ userInfo }) => {
  const [editMode, setEditMode] = useState(false);

  const initialValues = {
    first_name: userInfo.first_name,
    username: userInfo.username,
    last_name: userInfo.last_name,
    national_code: userInfo.national_code,
    birth_date: userInfo.birth_date,
    telephone_number: userInfo.telephone_number,
    phone_number: userInfo.phone_number,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      username: Yup.string().required("این فیلد اجباری است."),
    }),
    onSubmit: (values) => {
    
    },
  });

  const toggleEditMode = () => {
    setEditMode(!editMode);
    formik.resetForm();
  };

  // useEffect(() => {
  //   if (isChangePassSuccess) {
  //     notif("اطلاعات کاربری با موفقیت تغییر کرد.", { variant: "success" });

  //     setEditMode(false);
  //   } else if (isChangePassError) {
  //     notif("مشکلی در ثبت فرم وجود دارد.", { variant: "error" });
  //   }
  // }, [isChangePassError, isChangePassSuccess]);

  return (
    <>
      <Box component={Paper} width={"100%"} height={"100%"} py={2} px={4} className="space-y-4">
        <Box className=" w-full flex justify-between items-center">
          <Typography variant="h6">مشخصات فردی</Typography>{" "}
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
              <FormikInput fullWidth name="first_name" label="نام" disabled={!editMode} />
              <FormikInput fullWidth name="last_name" label="نام خانوادگی" disabled={!editMode} />
              <FormikInput fullWidth name="username" label="نام کاربری" disabled={!editMode} />
              <FormikInput
                fullWidth
                name="national_code"
                label="کد ملی"
                type="text"
                disabled={!editMode}
              />
              <FormikDatePicker name="birth_date" label="تاریخ تولد" disabled={!editMode} />
              <FormikInput
                fullWidth
                name="telephone_number"
                label="تلفن ثابت"
                type="text"
                disabled={!editMode}
              />
              <FormikInput
                fullWidth
                name="phone_number"
                label="شماره همراه"
                type="text"
                disabled={!editMode}
              />
            </Box>
          </Form>
        </FormikProvider>
        {editMode && (
          <Box className="w-full flex gap-8 h-14 ">
            <Button fullWidth variant="outlined" onClick={toggleEditMode}>
              انصراف
            </Button>
            {/* <Button fullWidth variant="contained" onClick={formik.submitForm} disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : "ثبت"}
            </Button> */}
          </Box>
        )}
      </Box>
    </>
  );
};

export default PersonalInformation;
