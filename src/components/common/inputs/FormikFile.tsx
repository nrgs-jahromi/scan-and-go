import { Box, BoxProps, TextField, TextFieldProps, Typography } from "@mui/material";
import { ErrorMessage, useField } from "formik";
import React, { FC } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  disabled?: boolean;
  containerProps?: BoxProps;
}

const FormikFile: FC<Props> = ({ name, label, disabled, containerProps, ...inputProps }) => {
  const [fields, _meta, helpers] = useField<File |  null>(name);

  return (
    <Box {...containerProps}>
      <input
        disabled={disabled}
        {...inputProps}
        onChange={(e) => {
          helpers.setValue(e.target.files && e.target.files.length > 0 ? e.target.files[0] : null);
        }}
        type="file"
      />

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

export default FormikFile;
