import { FC, MouseEvent, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SelectChangeEvent } from "@mui/material";
import CustomFooter from "./CustomFooter";
import EnhancedTableHead from "./EnhancedTableHead";
import { stableSort } from "../../../utils/sort";
import EnhancedTableRow from "./EnhancedTableRow";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<DV extends RowDataT>(
  order: Order,
  orderBy: keyof DV
): (a: DV, b: DV) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const EnhancedTable = <DV extends RowDataT>({
  columns,
  rows,
  showCheckbox,
  actions,
  InnerComponent,
  order,
  orderBy,
  selected,
  page,
  rowsPerPage,
  totalSize,
  isLoading,
  setOrder,
  setOrderBy,
  setSelected,
  setPage,
  setRowsPerPage,
  onRowDoubleClick, // Add this line
}: EnhancedTableProps<DV> & { onRowDoubleClick?: (row: DV) => void }) => {
  const handleRequestSort = (event: MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    const newSize = event.target.value as number;
    setRowsPerPage(newSize);
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const sortedRows = stableSort<DV>(rows, getComparator(order, orderBy));

  const handleRowClick = (event: MouseEvent<unknown>, row: DV) => {
    const selectedIndex = selected.indexOf(row.id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row.id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    if (onRowDoubleClick) onRowDoubleClick(row); // Add this line
  };

  const columnsNum = columns.length + Number(!!showCheckbox) + Number(!!InnerComponent);

  return (
    <Box
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={"medium"}>
          <EnhancedTableHead<DV>
            columns={columns}
            columnsNum={columnsNum}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            showCheckbox={showCheckbox}
          />
          {isLoading && (
            <TableBody>
              {sortedRows.map((row) => (
                <EnhancedTableRow<DV>
                  key={row.id}
                  row={row}
                  columns={columns}
                  columnsNum={columnsNum}
                  actions={actions}
                  isSelected={isSelected(row.id)}
                  onDoubleClick={(event) => handleRowClick(event, row)} // Change this line
                  showCheckbox={showCheckbox}
                  InnerComponent={InnerComponent}
                />
              ))}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={columns.length + 1} />
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <Box sx={{ flexShrink: 0 }}>
        <CustomFooter
          count={totalSize}
          rowsPerPage={rowsPerPage}
          pageSize={rowsPerPage}
          rowsPerPageOptions={[10, 25, 50]}
          setPageSize={handleChangeRowsPerPage}
          page={page}
          handlePageChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default EnhancedTable;
