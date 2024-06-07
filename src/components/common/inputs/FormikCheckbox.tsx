import { Box, BoxProps, InputLabel, Typography } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import { FC } from "react";

type Props = {
  name: string;
  label?: string;
  containerProps?: BoxProps;
  disabled?: boolean;
};

const FormikCheckbox: FC<Props> = ({ name, label, containerProps, disabled, ...fieldProps }) => {
  return (
    <Box {...containerProps}>
      <InputLabel>
        <Field type="checkbox" name={name} disabled={disabled} {...fieldProps} /> {label}
      </InputLabel>
      <ErrorMessage
        name={name}
        render={(msg) => (
          <Typography variant="body2" color="error.main">
            {msg}
          </Typography>
        )}
      />
    </Box>
  );
};

export default FormikCheckbox;
