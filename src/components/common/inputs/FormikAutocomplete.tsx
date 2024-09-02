import {
  Box,
  BoxProps,
  Typography,
  Autocomplete,
  TextField,
  Chip,
  TextFieldProps,
} from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { FC } from "react";
import theme from "../../../theme";

type Props = {
  name: string;
  label?: string;
  labelVar?: Variant;
  disabled?: boolean;
  containerProps?: BoxProps;
  options: Array<string>; // Array of strings to ensure label and value are the same
} & TextFieldProps;

const FormikAutocomplete: FC<Props> = ({
  name,
  label,
  labelVar,
  disabled,
  containerProps,
  options,
  ...inputProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event: React.SyntheticEvent, value: Array<string>) => {
    console.log("Selected Values: ", value); // Log the selected values
    setFieldValue(name, value);
  };

  // console.log("tesy" , field.value);
  
  return (
    <Box {...containerProps} marginBottom={2}>
      <Typography variant={labelVar ? labelVar : "custom"} marginBottom={1}>
        {label}
      </Typography>
      <Autocomplete
        multiple
        freeSolo
        options={options}
        getOptionLabel={(option) => option} // Ensure label and value are the same
        defaultValue={field.value || []}
        onChange={handleChange}
        renderTags={(value: string[], getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              sx={{ backgroundColor: theme.palette.background.paper, border:"none" , direction:"ltr" }} // Customize the chip color
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            {...inputProps}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error ? meta.error : ""}
            disabled={disabled}
            sx={{
              bgcolor: disabled ? "palette.action.disabled" : "",
              p: 0,
            }}
          />
        )}
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

export default FormikAutocomplete;
