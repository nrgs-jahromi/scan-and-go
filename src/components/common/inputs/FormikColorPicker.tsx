import { Box, BoxProps, TextField, Typography } from "@mui/material";
import { ErrorMessage, useField } from "formik";
import { FC } from "react";

type Props = {
  name: string;
  label?: string;
  containerProps?: BoxProps;
};

const FormikColorPicker: FC<Props> = ({ name, label, containerProps }) => {
  const [field, meta, helpers] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : "";

  const handleChange = (color: string) => {
    helpers.setValue(color);
  };

  return (
    <Box {...containerProps} marginBottom={2}>
      <Typography variant="custom" marginBottom={1}>
        {label}
      </Typography>
      <ColorPickeR
        value={field.value || ""}
        onChange={handleChange}
        // Add any props specific to your color picker library here
      />
      {errorText && (
        <Typography variant="body2" color="error.main">
          {errorText}
        </Typography>
      )}
    </Box>
  );
};

export default FormikColorPicker;
