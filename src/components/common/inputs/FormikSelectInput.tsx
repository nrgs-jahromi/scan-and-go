import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  Typography,
} from "@mui/material";
import { ErrorMessage, useField } from "formik";
import { FC } from "react";

const NULL_STR: Readonly<string> = "__NULL__";

export type SelectOption = {
  label: string;
  value: string | number | readonly string[] | null;
};

type Props = {
  name: string;
  label?: string;
  options: SelectOption[];
} & Omit<SelectProps, "value">;

const FormikSelectInput: FC<Props> = ({ name, label, options, ...selectProps }) => {
  const [fields, _meta, helper] = useField(name);

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    if (e.target.value === NULL_STR) {
      helper.setValue(null);
    } else {
      helper.setValue(e.target.value);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={`formik-select-${name}-label`}>{label}</InputLabel>
      <Select
        id={`formik-select-${name}`}
        labelId={`formik-select-${name}-label`}
        label={label}
        {...fields}
        {...selectProps}
        onChange={handleChange}
        value={fields.value === undefined ? "" : fields.value === null ? NULL_STR : fields.value}
      >
        {options.map((option, index) => (
          <MenuItem
            key={`${index}__${option.value}__${option.label}`}
            value={option.value === null ? NULL_STR : option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage
        name={name}
        render={(msg) => (
          <Typography color="error.main" variant="body2">
            {msg}
          </Typography>
        )}
      />
    </FormControl>
  );
};

export default FormikSelectInput;
