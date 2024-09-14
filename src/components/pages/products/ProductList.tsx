import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import EnhancedTable from "../../common/table/EnhancedTable";
import { useProducts } from "../../../api/product/getProductsList";
import UserAvatar from "../customers/profile/UserAvatar";
import PageHeader from "../pageHeader/PageHeader";
import { Add, PlayCricle } from "iconsax-react";
import _ from "lodash";
import { useDeleteProduct } from "../../../api/product/deleteProduct";
import { notif } from "../../common/notification/Notification";
import AddAdvertisementBoardModal from "./adsBoard/ADSBoardModal";
import IconBox from "../../common/IconBox";
import BannerListModal from "./adsBoard/BannersList";

type ProductData = {
  id: number;
  barcode: string;
  name: string;
  price: string;
  stock: number | null;
  brand: null | string;
  primary_image_url: string | null;
  category_names: string;
};

const columns: TableColumnDef<ProductData>[] = [
  {
    id: "name",
    disablePadding: false,
    label: "نام",
    type: "text",
    Cell: ({ row }) => (
      <Box className="flex items-center justify-start gap-2">
        <UserAvatar url={row.primary_image_url ?? undefined} size={30} />
        <Typography>{row.name}</Typography>
      </Box>
    ),
  },
  {
    id: "barcode",
    disablePadding: true,
    label: "کد محصول ",
    type: "number",
  },
  {
    id: "category_names",
    disablePadding: false,
    label: "دسته بندی",
    type: "text",
    accessorFn: (v) => v.category_names || "-",
  },
  {
    id: "stock",
    disablePadding: false,
    label: "تعداد",
    type: "number",
    accessorFn: (v) => v.stock?.toString() || "-",
  },
  {
    id: "price",
    disablePadding: false,
    label: "قیمت (ریال)",
    type: "number",
    accessorFn: (v) => v.price?.toLocaleString() || "-",
  },
  { id: "action", disablePadding: false, label: "", type: "text" },
];

const ProductList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [rows, setRows] = useState<ProductData[]>([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("name");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [openBannersModal, setOpenBannersModal] = useState(false);
  const [openAdModal, setOpenAdModal] = useState(false); // State for controlling the advertisement modal
  const [selectedBarcode, setSelectedBarcode] = useState<string | null>(null); // State for selected product barcode

  const {
    data: productList,
    isLoading,
    isError,
    isSuccess: getProductsIsSuccess,
  } = useProducts({
    params: {
      page: page + 1,
      page_size: rowsPerPage,
      q: debouncedSearchValue,
    },
  });
  const {
    mutate: deleteProduct,
    isSuccess,
    isError: isDeleteError,
  } = useDeleteProduct(); // استفاده از هوک حذف محصول

  const actions: ActionTableT[] = [
    {
      label: "حذف",
      onClick: (id: number) => {
        const selectedProduct = rows.find((row) => row.id === id);
        if (selectedProduct) {
          deleteProduct(selectedProduct.barcode); // حذف محصول با استفاده از بارکد
        }
      },
    },
    {
      label: "ویرایش",
      onClick: (id: number) => {
        navigate(`${productList?.results[id].barcode}/`);
      },
    },
    {
      label: "افزودن تبلیغ",
      onClick: (id: number) => {
        const selectedProduct = rows.find((row) => row.id === id);
        if (selectedProduct) {
          setSelectedBarcode(selectedProduct.barcode); // ذخیره بارکد محصول انتخاب شده
          setOpenAdModal(true); // باز کردن مودال تبلیغ
        }
      },
    },
  ];

  const debounceSearch = useCallback(
    _.debounce((query) => {
      setDebouncedSearchValue(query);
    }, 1000),
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    debounceSearch(event.target.value);
  };

  useEffect(() => {
    if (getProductsIsSuccess) {
      if (Array.isArray(productList.results)) {
        const updatedRows = productList.results.map((product, index) => ({
          id: index,
          barcode: product.barcode,
          name: product.name,
          price: product.price,
          stock: product.stock,
          brand: product.brand,
          primary_image_url: product.primary_image_url,
          category_names: product.category_names.join(", "),
        }));
        setRows(updatedRows);
        console.log("test", productList, updatedRows);
      } else {
        console.error(
          "Expected customerList.customers to be an array, but got:",
          productList.results
        );
      }
    }
  }, [productList, getProductsIsSuccess]);

  useEffect(() => {
    if (isSuccess) {
      notif("محصول مورد نظر با موفقیت حذف شد", { variant: "success" });
      // navigate("/products");
    } else if (isDeleteError) {
      notif("مشکلی در حذف محصول وجود دارد.", { variant: "error" });
    }
  }, [isSuccess, isDeleteError]);

  return (
    <Box className="w-full h-full flex flex-col gap-5 overflow-auto">
      <PageHeader
        title="لیست محصولات"
        showSearchBar={true}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        buttons={[
          {
            text: "افزودن محصول",
            customComponent: (
              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{ maxHeight: 48 }}
                onClick={() => {
                  navigate("/products/add");
                }}
              >
                {" "}
                افزودن محصول
              </Button>
            ),
          },
          {
            text: "افزودن محصول",

            customComponent: (
              <Box
                border={`1.5px solid ${theme.palette.primary.main}`}
                height={"fit-content"}
                borderRadius="8px"
              >
                <IconBox
                  color="none"
                  icon={<PlayCricle color={theme.palette.primary.main} />}
                  borderRadius="8px"
                  size={47}
                  onClick={() => setOpenBannersModal(true)}
                />
              </Box>
            ),
          },
        ]}
      />
      <EnhancedTable
        columns={columns}
        rows={rows}
        showCheckbox={false}
        actions={actions}
        order={order}
        orderBy={orderBy}
        selected={selected}
        page={page}
        isLoading={true}
        rowsPerPage={rowsPerPage}
        totalSize={productList ? productList.count : 0}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        setSelected={setSelected}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        onRowDoubleClick={(row) => {
          navigate(`${row.barcode}/`);
        }}
      />
      {/* Add Advertisement Board Modal */}
      {selectedBarcode && (
        <AddAdvertisementBoardModal
          open={openAdModal}
          onClose={() => setOpenAdModal(false)}
          barcode={selectedBarcode}
        />
      )}
      {openBannersModal && (
        <BannerListModal
          open={openBannersModal}
          onClose={() => setOpenBannersModal(false)}
        />
      )}
    </Box>
  );
};

export default ProductList;
