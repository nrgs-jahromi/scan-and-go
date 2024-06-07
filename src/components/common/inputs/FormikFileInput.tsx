import {
  Box,
  BoxProps,
  Button,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { ErrorMessage, useField } from "formik";
import { ExportCurve } from "iconsax-react";
import { FC } from "react";

type Props = {
  name: string;
  label?: string;
  labelVar?: Variant;
  disabled?: boolean;
  containerProps?: BoxProps;
} & TextFieldProps;

const FormikFileInput: FC<Props> = ({
  name,
  label,
  disabled,
  labelVar,
  containerProps,
  ...inputProps
}) => {
  const [fields] = useField(name);

  return (
    <Box marginBottom={2}>
      <Typography variant={labelVar?labelVar : "custom"} marginBottom={1}>
        {label}
      </Typography>
      <Box {...containerProps}>
        <label htmlFor="upload-photo">
          <TextField
            id="upload-photo"
            disabled={disabled}
            {...inputProps}
            {...fields}
            type="file"
            value={fields.value === undefined ? "" : fields.value}
            sx={{ display: "none" }}
          />
          <Button
            variant="text"
            component="span"
            sx={{ gap: 2, alignItems: "center" }}
            startIcon={<ExportCurve />}
          >
            انتخاب فایل
          </Button>
        </label>

        <Typography variant="caption">حداکثر حجم مجاز: </Typography>
        <Typography variant="caption">فرمت‌های مجاز: </Typography>

        <ErrorMessage
          name={name}
          render={(msg) => (
            <Typography variant="body2" color="error.main">
              {msg}
            </Typography>
          )}
        />
      </Box>
    </Box>
  );
};

export default FormikFileInput;
