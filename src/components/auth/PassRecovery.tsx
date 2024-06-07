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
    <Box className="h-screen w-screen flex  ">
      <Box className=" flex w-full md:w-1/2 lg:w-2/5 justify-center items-center h-full">
        <FormikProvider value={formik}>
          <Form
            onSubmit={formik.handleSubmit}
            className="h-full w-full p-10 justify-center items-center gap-10 flex flex-col"
          >
            {/* <img src={logo}></img> */}
            <Box>
              <Typography variant="h5" align="center" fontWeight={"bold"}>
                تغییر رمز عبور{" "}
              </Typography>{" "}
              <Typography variant="body1" align="center">
                رمز عبور جدید را وارد کنید{" "}
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
      {isLargeScreen && (
        <Box
          sx={{
            height: "100%",
            width: "60%",
            backgroundImage: `url(${changePasswod})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            bgcolor: theme.palette.primary.main,
          }}
        />
      )}
    </Box>
    // <Box className="h-screen w-screen flex md:flex-row flex-col">

    //   <Box className="w-full flex justify-center md:items-center items-start h-full">
    //     <FormikProvider value={formik}>
    //       <Form className="h-full  justify-center md:w-1/2 w-10/12 flex flex-col">
    //         <Typography variant="h5">Password Recovery</Typography>
    //         <Typography variant="caption">
    //           Please enter your new password
    //         </Typography>
    //         <Box className="flex flex-col gap-8 my-10 w-full">
    //           <IconTextField
    //             fullWidth
    //             id="password"
    //             name="password"
    //             label="password"
    //             type="password"
    //             icon={CiMail}
    //             sx={{ color: theme.palette.primary.main }}
    //           />
    //           <IconTextField
    //             fullWidth
    //             id="confirm"
    //             name="confirm"
    //             label="confirm"
    //             type="password"
    //             icon={CiMail}
    //             sx={{ color: theme.palette.primary.main }}
    //           />
    //         </Box>
    //         <Button
    //           type="submit"
    //           variant="contained"
    //           color="inherit"
    //           // onClick={handleSet}
    //           disabled={!formik.isValid}
    //           sx={{
    //             marginTop: 2,
    //             color: "white",
    //             bgcolor: theme.palette.primary.main,
    //             "&:hover": {
    //               backgroundColor: theme.palette.primary.dark,
    //             },
    //           }}
    //         >
    //           Set new Password
    //         </Button>
    //       </Form>
    //     </FormikProvider>
    //   </Box>
    // </Box>
  );
};

export default PassRecovery;
