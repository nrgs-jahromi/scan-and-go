import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";

import { Add, PlayCricle } from "iconsax-react";
import _ from "lodash";
import UserAvatar from "../pages/profile/UserAvatar";
import { useCustomers } from "../../api/customer/getCustomerList";
import PageHeader from "../pages/pageHeader/PageHeader";
import EnhancedTable from "../common/table/EnhancedTable";


type CustomerData = {
    id:number
    mobile_number:string;
    username:string;
    name:string|null;
    // last_name:string|null;
    gender:"F"|"M"|"O";
    birth_date:string|null;
    purchase_count:number;
};

const genderMapping = (gender: "F" | "M" | "O") => {
    switch (gender) {
      case "F":
        return "خانم";
      case "M":
        return "آقا";
      case "O":
      default:
        return "نامشخص";
    }
  };

const columns: TableColumnDef<CustomerData>[] = [
  {
    id: "name",
    disablePadding: false,
    label: "نام",
    type: "text",
    Cell: ({ row }) => (
      <Box className="flex items-center justify-start gap-2">
        {/* <UserAvatar url={row.avatar_url ?? undefined} size={30} /> */}
        <Typography>{row.name}</Typography>
      </Box>
    ),
  },

  {
    id: "username",
    disablePadding: false,
    label: "نام کاربری",
    type: "text",
    accessorFn: (v) => v.mobile_number || "-",
  },
  {
    id: "mobile_number",
    disablePadding: false,
    label: "شماره موبایل",
    type: "text",
    accessorFn: (v) => v.username || "-",
  },
  {
    id: "gender",
    disablePadding: false,
    label: "جنسیت",
    type: "text",
     accessorFn: (v) => genderMapping(v.gender),
  },
  {
    id: "birth_date",
    disablePadding: false,
    label: "تاریخ تولد",
    type: "date",
    accessorFn: (v) => v.birth_date || "-",
  },
  {
    id: "purchase_count",
    disablePadding: false,
    label: "دفعات خرید",
    type: "number",
   
  },
  
];

const CustomerList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [rows, setRows] = useState<CustomerData[]>([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("name");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [openBannersModal, setOpenBannersModal] = useState(false);
  const [openAdModal, setOpenAdModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

  const {
    data: customerList,
    isLoading,
    isError,
    isSuccess: getCustomersIsSuccess,
  } = useCustomers({
    params: {
      page: page + 1,
      page_size: rowsPerPage,
      q: debouncedSearchValue,
    },
  });



 

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
    if (getCustomersIsSuccess) {
      if (Array.isArray(customerList.results)) {
        const updatedRows = customerList.results.map((customer, index) => ({
          id: index,
          name: customer.first_name + " " + (customer.last_name || ""),
          mobile_number: customer.mobile_number,
          username: customer.username,
          gender: customer.gender,
          birth_date: customer.birth_date,
          purchase_count: customer.purchase_count || 0, // Set default to 0 if undefined
        }));
        setRows(updatedRows);
        console.log("test", customerList, updatedRows);
      } else {
        console.error(
          "Expected customerList.customers to be an array, but got:",
          customerList.results
        );
      }
    }
  }, [customerList, getCustomersIsSuccess]);



  return (
    <Box className="w-full flex flex-col gap-5">
      <PageHeader
        title="لیست کاربران"
        showSearchBar={true}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
      />
      <EnhancedTable
        columns={columns}
        rows={rows}
        showCheckbox={false}
        actions={[]}
        order={order}
        orderBy={orderBy}
        selected={selected}
        page={page}
        isLoading={true}
        rowsPerPage={rowsPerPage}
        totalSize={customerList ? customerList.count : 0}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        setSelected={setSelected}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        // onRowDoubleClick={(row) => {
        //   navigate(`${row.id}/`);
        // }}
      />
      
    </Box>
  );
};

export default CustomerList;
