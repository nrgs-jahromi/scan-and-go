import React, { useState } from "react";
import {
  Box,
  Paper,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  IconButton,
} from "@mui/material";
import { Formik, Form, FormikProvider } from "formik";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FormikInput from "../../common/inputs/FormikInput";
import FormikTextArea from "../../common/inputs/FormikTextArea";
import FormikAutocomplete from "../../common/inputs/FormikAutocomplete";
import FormikDatePicker from "../../common/inputs/FormikDatePicker";
import theme from "../../../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import { Trash } from "iconsax-react";
import { useCategories } from "../../../api/product/getCategories";
import { useAddProduct } from "../../../api/product/addProduct";


const AddProduct = () => {
  const [images, setImages] = useState<string[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { data: categories = [], isLoading, isError } = useCategories();
  const { mutate: addProduct, isLoading: isAdding, isError: addProductError } = useAddProduct();

  const categoryOptions = categories.map(category => category.name);

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const initialValues = {
    name: "",
    category: [],
    description: "",
    barcode: "",
    count: 0,
    min_inventory: 0,
    discount: 0,
    price: 0,
  };

  const handleSubmit = (values: typeof initialValues) => {
    const productData = {
      ...values,
      images,
    };
    addProduct(productData);
  };

  const sliderSettings = {
    customPaging: (i: number) => (
      <a>
        <img
          src={images[i]}
          alt={`thumbnail-${i}`}
          style={{ width: "50px", height: "50px" }}
        />
      </a>
    ),
    dots: images.length > 1,
    dotsClass: "slick-dots slick-thumb",
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box className="space-y-4">
      <Box component={Paper} width={"100%"} height={"100%"} p={4}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(formik) => (
            <FormikProvider value={formik}>
              <Form>
                <Box className="w-full md:grid md:grid-cols-2 gap-6">
                  <Box>
                    <FormikInput
                      fullWidth
                      name="name"
                      label="نام محصول"
                      type="text"
                    />
                    <FormikAutocomplete
                      name="category"
                      label="دسته بندی"
                      options={categoryOptions}
                      fullWidth
                      // loading={isLoading}
                      // error={isError ? "خطا در بارگذاری دسته‌بندی‌ها" : undefined}
                    />
                    <FormikTextArea
                      minRows={4}
                      name="description"
                      label="توضیحات"
                      fullWidth
                      maxRows={4}
                    />
                  </Box>
                  <Box>
                    <Box className="flex justify-between items-end col-span-1 -mt-2 mb-1">
                      <Typography variant="custom">تصاویر محصول</Typography>
                      <label htmlFor="upload-image">
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="upload-image"
                          type="file"
                          onChange={handleAddImage}
                        />
                        <Button
                          variant="contained"
                          component="span"
                          size="small"
                        >
                          افزودن تصویر
                        </Button>
                      </label>
                    </Box>

                    {images.length > 0 && (
                      <Slider {...sliderSettings}>
                        {images.map((image, index) => (
                          <Box
                            key={index}
                            position="relative"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                          >
                            <img
                              src={image}
                              alt={`product-${index}`}
                              style={{
                                width: "100%",
                                maxHeight: "300px",
                                objectFit: "cover",
                                border: `2px solid ${theme.palette.background.paper}`,
                                borderRadius: "8px",
                                padding: 4,
                                filter:
                                  hoveredIndex === index
                                    ? "brightness(70%)"
                                    : "none",
                                transition: "filter 0.3s ease-in-out",
                              }}
                            />
                            {hoveredIndex === index && (
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleRemoveImage(index)}
                                style={{
                                  position: "absolute",
                                  top: 8,
                                  right: 8,
                                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                                }}
                              >
                                <Trash color="red" size={20} />
                              </IconButton>
                            )}
                          </Box>
                        ))}
                      </Slider>
                    )}
                  </Box>
                  <Box>
                    <FormikInput
                      name="barcode"
                      label="بارکد"
                      fullWidth
                      type="number"
                    />
                    <FormikInput
                      name="price"
                      label="قیمت"
                      formatted={true}
                      fullWidth
                    />
                    <FormikInput
                      name="count"
                      label="موجودی"
                      type="number"
                      fullWidth
                    />
                    <FormikInput
                      name="min_inventory"
                      label="حداقل موجودی"
                      type="number"
                      fullWidth
                    />
                  </Box>
                  <Box className="space-y-8">
                    <FormikInput
                      name="discount"
                      label="تخفیف (درصد)"
                      type="number"
                      fullWidth
                    />
                    <Box className="grid grid-cols-2 items-center">
                      <FormControlLabel
                        name="discountForQuantity"
                        control={<Checkbox defaultChecked />}
                        label="تخفیف برای تعداد"
                      />
                      <FormikInput
                        name="quantityForDiscount"
                        type="number"
                        fullWidth
                      />
                    </Box>
                    <Box className="grid grid-cols-2 items-center">
                      <FormControlLabel
                        name="discountEnd"
                        control={<Checkbox defaultChecked />}
                        label="تاریخ پایان تخفیف"
                      />
                      <FormikDatePicker name="discountEndDate" type="number" />
                    </Box>
                  </Box>
                </Box>
                <Button type="submit" fullWidth variant="contained">
                  {isAdding ? "در حال افزودن..." : "ثبت"}
                </Button>
                {addProductError && (
                  <Typography color="error">خطا در افزودن محصول</Typography>
                )}
              </Form>
            </FormikProvider>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AddProduct;
