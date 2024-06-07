import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, useField } from "formik";
import { FC } from "react";
import DatePicker, { DatePickerProps } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar } from "iconsax-react";
import { Variant } from "@mui/material/styles/createTypography";

type Props = {
  name: string;
  label?: string;
  labelVar?: Variant;
} & DatePickerProps;

const FormikDatePicker: FC<Props> = ({ name, labelVar, label, ...datePickerProps }) => {
  const [fields, meta, helpers] = useField<string>(name);

  const handleDateChange = (date: any) => {
    if (date) {
      const formattedDate = date.toDate().toISOString().split('T')[0]; // Convert to YYYY-MM-DD
      helpers.setValue(formattedDate);
    } else {
      helpers.setValue('');
    }
  };

  return (
    <Box sx={{ width: "100%", marginBottom: 2 }} className="cc">
      <Typography variant={labelVar ? labelVar : "custom"} marginBottom={1}>
        {label}
      </Typography>
      <DatePicker
        value={fields.value ? new Date(fields.value) : null}
        onChange={handleDateChange}
        containerStyle={{
          width: "100%",
        }}
        {...datePickerProps}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        render={
          <TextField
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <Calendar />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        }
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

export default FormikDatePicker;
