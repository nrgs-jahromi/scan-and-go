import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import EnhancedTable from "../../common/table/EnhancedTable";
import { useProducts } from "../../../api/product/getProductsList";
import UserAvatar from "../customers/profile/UserAvatar";
import { API_BASE_URL } from "../../../api/config";
import PageHeader from "../pageHeader/PageHeader";

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
    label: "دسته",
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

  const {
    data: productList,
    isLoading,
    isError,
    isSuccess: getProductsIsSuccess,
  } = useProducts({
    params: {
      page: page + 1,
      page_size: rowsPerPage,
    },
  });

  const actions: ActionTableT[] = [
    {
      label: "حذف",
      onClick: (id: number) => {
        console.log(`Delete product with ID: ${id}`);
      },
    },
    {
      label: "ویرایش",
      onClick: (id: number) => {
        navigate(`${productList?.results[id].barcode}/`);
      },
    },
  ];

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
  return (
    <Box className="w-full flex flex-col gap-5">
      <PageHeader
        title="لیست محصولات"
        buttons={[
          {
            text: "افزودن محصول",
            variant: "contained",
            onClick: () => {
              navigate("/products/add");
            },
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
    </Box>
  );
};

export default ProductList;
