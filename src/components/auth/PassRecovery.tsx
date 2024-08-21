import { useFormik, FormikProvider, Form } from "formik";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import theme from "../../theme";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import changePasswod from "../../assets/changePassword.png";
import logo from "../../assets/logo.svg";
import FormikInput from "../common/inputs/FormikInput";
import { Lock1 } from "iconsax-react";

type LoginFormT = {
  password: string;
  confirm: string;
};
const PassRecovery = () => {
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  // const {
  //   mutate: changePassword,
  //   isSuccess: isChangingPasswordSuccess,
  //   isError: isChangingPasswordFail,
  // } = usePasswordChanging();

  const formik = useFormik<LoginFormT>({
    initialValues: {
      confirm: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required("Please enter a new password."),
      confirm: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match.")
        .required("Please confirm your new password."),
    }),
    onSubmit: (values) => {
      console.log("values=", values);
    },
  });

  const handleSet = () => {
    if (formik.isValid) {
      navigate("/login/");

      // Only make the API call if the form is valid
      // changePassword({
      //   body: {
      //     password: formik.values.password,
      //   },
      //   params: {
      //     token: token,
      //   },
      // });
    }
  };

  // useEffect(() => {
  //   if (isChangingPasswordSuccess) {
  //     navigate("/login/");
  //   }
  // }, []);

  return (
    <Box
      className={`h-screen w-full flex bg-slate-100 items-center justify-center ${
        isLargeScreen ? "" : "p-0"
      }`}
    >
      <Box
        className={`${
          isLargeScreen
            ? "w-[30rem] bg-white rounded-xl shadow-2xl p-10"
            : "w-full h-full bg-white p-4"
        } flex flex-col`}
      >
        <FormikProvider value={formik}>
          <Form
            onSubmit={formik.handleSubmit}
            className="h-full w-full justify-center items-center flex flex-col"
          >
            {/* <img src={logo}></img> */}
            <Box>
              <Typography variant="h5" align="center" fontWeight={"bold"}>
                تعیین رمز عبور
              </Typography>
              <Typography variant="body1" align="center">
                رمز عبور خود را وارد کنید.
              </Typography>
            </Box>
            <Box className=" w-full  ">
              <Box className="flex flex-col gap-8 my-10 w-full">
                <FormikInput
                  type="password"
                  name="password"
                  label="رمز عبور جدید"
                  placeholder="رمز عبور جدید"
                  Icon={<Lock1 />}
                />
                <FormikInput
                  type="password"
                  name="confirm"
                  label="تکرار رمز عبور جدید"
                  placeholder="تکرار رمز عبور جدید"
                  Icon={<Lock1 />}
                />
              </Box>
              <Button
                type="submit"
                onClick={handleSet}
                variant="contained"
                fullWidth
                size="medium"
              >
                تایید
              </Button>
            </Box>
          </Form>
        </FormikProvider>
      </Box>
     
    </Box>
  );
};

export default PassRecovery;
