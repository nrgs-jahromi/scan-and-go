import * as React from "react";
import Box from "@mui/material/Box";
import { GridFooterContainer } from "@mui/x-data-grid";
import { MenuItem, Pagination, Select, SelectChangeEvent, Typography } from "@mui/material";

interface CustomFooterProps {
  count: number;
  rowsPerPage: number;
  pageSize: number;
  setPageSize: (event: SelectChangeEvent<number>) => void;
  page: number;
  // setPage: (page: number) => void;
  rowsPerPageOptions: number[];
  handlePageChange: (event: unknown, newPage: number) => void;
  pageCount: number;
}

const CustomFooter: React.FC<CustomFooterProps> = ({
  pageSize,
  setPageSize,
  page,
  handlePageChange,
  rowsPerPageOptions,
  pageCount,
}) => {
  return (
    <Box className="flex w-full justify-between flex-wrap p-4">
      <Box className="flex items-center gap-2">
        <Typography variant="body2">تعداد نتایج در صفحه :</Typography>
        <Select
          sx={{ minWidth: "70px" }}
          value={pageSize}
          onChange={setPageSize}
          autoWidth
        >
          {rowsPerPageOptions.map((option) => (
            <MenuItem value={option}>{option}</MenuItem>
          ))}
        </Select>
      </Box>
      <Pagination
        color="primary"
        size="small"
        count={pageCount}
        page={page+1}
        sx={{ direction: "rtl" }}
        onChange={handlePageChange}
        
      />
    </Box>
  );
};

export default CustomFooter;
