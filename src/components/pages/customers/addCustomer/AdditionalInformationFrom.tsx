import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import theme from "../../../../theme";
import { Add, ArrowDown2, CloseCircle } from "iconsax-react";
import { useState } from "react";
import FormikInput from "../../../common/inputs/FormikInput";
import FormikTextArea from "../../../common/inputs/FormikTextArea";

const AdditionalInformationForm = () => {
  const [heirs, setHeirs] = useState([{ id: Date.now() }]);

  const addHeir = () => {
    if (heirs.length < 3) {
      setHeirs([...heirs, { id: Date.now() }]);
    }
  };

  const removeHeir = (id: number) => {
    setHeirs(heirs.filter((heir) => heir.id !== id));
  };

  return (
    <Box width={"100%"} display={"flex"} flexDirection={"column"} rowGap={2}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDown2 color={theme.palette.text.primary} />}
        >
          مشخصات وارث
        </AccordionSummary>
        <AccordionDetails>
          {heirs.map((heir, index) => (
            <Box
              key={heir.id}
              maxHeight={"100%"}
              overflow={"auto"}
              rowGap={1}
              className=" md:grid md:grid-cols-2 grid-cols-1  gap-8  w-full  mb-4"
            >
              <Box className="flex w-100 py-3 justify-between col-span-2">
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  color={theme.palette.grey[300]}
                >
                  وارث {index + 1}
                </Typography>

                {heirs.length > 1 && (
                  <CloseCircle onClick={() => removeHeir(heir.id)} />
                )}
              </Box>
              <FormikInput
                type="text"
                name={`heir${index+1}_first_name`}
                label="نام"
              />
              <FormikInput
                type="text"
                name={`heir${index+1}_last_name`}
                label="نام خانوادگی"
              />
              <FormikInput
                type="text"
                name={`heir${index+1}_relation`}
                label="نسبت"
              />
              <FormikInput
                type="number"
                name={`heir${index+1}_national_code`}
                label="کد ملی"
              />
              <FormikInput
                type="number"
                name={`heir${index+1}_phone_number`}
                label="تلفن همراه"
              />
              <FormikInput
                type="number"
                name={`heir${index+1}_share_percentage`}
                label="میزان سهم"
              />
              <Box className="col-span-2">
                <FormikTextArea
                  name={`heir${index+1}_address`}
                  label="آدرس"
                  fullWidth
                />
              </Box>
            </Box>
          ))}

          <Button
            disabled={heirs.length >= 3}
            startIcon={<Add />}
            variant="outlined"
            sx={{ gap: 1 }}
            onClick={addHeir}
          >
            افزودن وارث
          </Button>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDown2 color={theme.palette.text.primary} />}
        >
          مشخصات قیم
        </AccordionSummary>
        <AccordionDetails>
          <Box
            maxHeight={"100%"}
            overflow={"auto"}
            rowGap={1}
            className="md:grid md:grid-cols-2 grid-cols-1 gap-8 w-full"
          >
            <FormikInput type="text" name="guardian1_first_name" label="نام" />
            <FormikInput type="text" name="guardian1_last_name" label="نام خانوادگی" />
            <FormikInput type="text" name="guardian1_relation" label="نسبت" />
            <FormikInput type="number" name="guardian1_national_code" label="کد ملی" />
            <FormikInput type="number" name="guardian1_phone_number" label="تلفن همراه" />
            <FormikInput type="number" name="guardian1_zip_code" label="کد پستی" />
            <Box className="col-span-2">
              <FormikTextArea name="guardian1_address" label="آدرس" fullWidth />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDown2 color={theme.palette.text.primary} />}
        >
          مشخصات معرف
        </AccordionSummary>
        <AccordionDetails>
          <Box
            maxHeight={"100%"}
            overflow={"auto"}
            rowGap={1}
            className="md:grid md:grid-cols-2 grid-cols-1 gap-8 w-full"
          >
            <FormikInput type="text" name="referer1_first_name" label="نام" />
            <FormikInput type="text" name="referer1_last_name" label="نام خانوادگی" />
            <FormikInput type="number" name="referer1_national_code" label="کد ملی" />
            <FormikInput type="number" name="referer1_phone_number" label="تلفن همراه" />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AdditionalInformationForm;
