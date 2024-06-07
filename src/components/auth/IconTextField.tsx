import React from "react";
import { Box, TextField, TextFieldProps } from "@mui/material";
import { Field, FieldProps, useFormikContext } from "formik";
import { IconType } from "react-icons/lib";
import theme from "../../theme";

type IconTextFieldProps = TextFieldProps & {
  name: string;
  icon: IconType;
};

const IconTextField: React.FC<IconTextFieldProps> = ({
  name,
  icon: Icon,
  ...rest
}) => {
  const { values, handleChange, handleBlur } = useFormikContext<any>();

  // const { values, handleChange, handleBlur, touched, errors } =
  // useFormikContext<any>();

  return (
    <Box className="flex flex-row items-end gap-3 w-full">
      <Box
        className="min-w-12 min-h-12 p-0 flex justify-center items-center rounded-2xl"
        sx={{
          bgcolor: theme.palette.grey[100],
          color: theme.palette.primary.main,
          fontSize: "20px",
        }}
      >
        <Icon />
      </Box>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <TextField
            {...field}
            {...rest}
            variant="standard"
            value={values[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            // error={touched[name] && Boolean(errors[name])}
            // helperText={touched[name] && errors[name]}
          />
        )}
      </Field>
    </Box>
  );
};

export default IconTextField;
