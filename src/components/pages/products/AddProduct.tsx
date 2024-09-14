import React, { useEffect, useState } from "react";
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
import FormikInput from "../../common/inputs/FormikInput";
import FormikTextArea from "../../common/inputs/FormikTextArea";
import FormikAutocomplete from "../../common/inputs/FormikAutocomplete";
import FormikDatePicker from "../../common/inputs/FormikDatePicker";
import theme from "../../../theme";
import * as Yup from "yup";
import { Trash } from "iconsax-react";
import { useCategories } from "../../../api/product/getCategories";
import {
  AddProductPayload,
  useAddProduct,
} from "../../../api/product/addProduct";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { notif } from "../../common/notification/Notification";
import { useNavigate } from "react-router";
import PageHeader from "../pageHeader/PageHeader";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("نام محصول الزامی است"),
  barcode: Yup.string().required("بارکد الزامی است"),
  price: Yup.number()
    .required("قیمت الزامی است")
    .min(0, "قیمت نمی‌تواند منفی باشد"),
});
const AddProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { data: categories = [], isLoading, isError } = useCategories();
  const {
    mutate: addProduct,
    isLoading: isAdding,
    isError: addProductError,
    isSuccess: addProductIsSuccess,
  } = useAddProduct();

  const categoryOptions = categories.map((category) => category.name);

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const initialValues: AddProductPayload = {
    name: "",
    categories: [],
    description: "",
    barcode: "",
    price: "",
    stock: 0,
    min_stock: 0,
    brand: null,
    location: null,
    discount: {
      discount_percentage: 0,
      expiration_date: null,
      min_quantity_for_discount: 1,
    },
    images: null,
  };

  const handleSubmit = (values: typeof initialValues) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("categories", JSON.stringify(values.categories));
    formData.append("description", values.description);
    formData.append("barcode", values.barcode);
    formData.append("price", values.price);
    formData.append("stock", values.stock.toString());
    formData.append("min_stock", values.min_stock.toString());

    if (values.brand) formData.append("brand", values.brand);
    if (values.location) formData.append("location", values.location);

    if (values.discount) {
      formData.append("discount", JSON.stringify(values.discount));
    }

    if (images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    addProduct(formData);
  };

  const sliderSettings = {
    customPaging: (i: number) => (
      <a>
        <img
          src={URL.createObjectURL(images[i])}
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

  useEffect(() => {
    if (addProductIsSuccess) {
      notif("محصول با موفقیت اضافه شد.", { variant: "success" });
      navigate("/products");
    } else if (addProductError) {
      notif("مشکلی در ایجاد محصول وجود دارد.", { variant: "error" });
    }
  }, [addProductIsSuccess, addProductError]);

  return (
    <Box className="space-y-4 h-full overflow-auto">
      <PageHeader
        title="افزودن محصول"
        buttons={[
          {
            text: "بازگشت",
            variant: "text",
            onClick: () => {
              navigate(-1);
            },
          },
          
        ]}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <FormikProvider value={formik}>
            <Form className="space-y-4">
              <Box component={Paper} width={"100%"} height={"100%"} p={4}>
                <Box className="w-full md:grid md:grid-cols-2 gap-6">
                  <Box>
                    <FormikInput
                      fullWidth
                      name="name"
                      label="نام محصول"
                      type="text"
                    />
                    <FormikInput
                      fullWidth
                      name="brand"
                      label="برند "
                      type="text"
                    />
                    <FormikAutocomplete
                      name="categories"
                      label="دسته بندی"
                      options={categoryOptions}
                      fullWidth
                    />
                    <FormikInput
                      fullWidth
                      name="location"
                      label="محل قرارگیری "
                      type="text"
                    />
                  </Box>

                  <Box>
                    <FormikTextArea
                      minRows={4}
                      name="description"
                      label="توضیحات"
                      fullWidth
                      maxRows={4}
                    />
                    <FormikInput
                      name="barcode"
                      label="بارکد"
                      fullWidth
                      type="text"
                    />
                    <FormikInput
                      name="stock"
                      label="موجودی"
                      type="number"
                      fullWidth
                    />
                    <FormikInput
                      name="min_stock"
                      label="حداقل موجودی"
                      type="number"
                      fullWidth
                    />
                  </Box>
                  <Box>
                    <FormikInput
                      name="price"
                      label="قیمت (تومان)"
                      formatted={true}
                      fullWidth
                    />
                    <Box className="space-y-8">
                      <FormikInput
                        name="discount.discount_percentage"
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
                          name="discount.min_quantity_for_discount"
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
                        <FormikDatePicker
                          name="discount.expiration_date"
                          type="number"
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <Box className="flex justify-between items-end col-span-1 -mt-2 mb-1">
                      <Typography variant="custom">تصویر محصول</Typography>
                      <label htmlFor="upload-image">
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="upload-image"
                          type="file"
                          multiple
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
                              src={URL.createObjectURL(image)} // Create a URL for the image file
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
                </Box>
              </Box>{" "}
              <Button onClick={formik.submitForm} fullWidth variant="contained">
                {isAdding ? "در حال افزودن..." : " ثبت محصول"}
              </Button>
            </Form>
          </FormikProvider>
        )}
      </Formik>
    </Box>
  );
};

export default AddProduct;
