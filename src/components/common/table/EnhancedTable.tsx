import { useState, useRef, FC, MouseEvent, ChangeEvent, useMemo } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { IconButton, SelectChangeEvent, Typography } from "@mui/material";
import CustomFooter from "./CustomFooter";
import { MoreHoriz } from "@mui/icons-material";
import ActionMenu from "./ActionMenu";
import EnhancedTableHead from "./EnhancedTableHead";
import { stableSort } from "../../../utils/sort";

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
}: EnhancedTableProps<DV>) => {
  const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  const optionButtonRef = useRef(null);

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

  const handleClick = (event: MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const visibleRows = useMemo(
    () =>
      stableSort<DV>(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rows, rowsPerPage]
  );

  const optionHandler = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: number
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedRow(id);
    const x = event.clientX;
    const y = event.clientY;
    console.log("x:", x, "y: ", y);
    setClickPosition({ x, y });
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

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
            numSelected={selected?.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            showCheckbox={showCheckbox}
          />
          {isLoading && (
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    {showCheckbox && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                    )}

                    {columns.map((column, index) => (
                      <>
                        {column.id === "action" ? (
                          <TableCell
                            key={column.id}
                            align={"right"}
                            padding={column.disablePadding ? "none" : "normal"}
                            sx={{ paddingRight: 5 }}
                          >
                            <IconButton
                              ref={optionButtonRef}
                              onClick={(event) => {
                                optionHandler(event, row.id);
                              }}
                            >
                              <MoreHoriz />
                            </IconButton>
                          </TableCell>
                        ) : (
                          <TableCell
                            key={column.id}
                            align={column.alignment || "right"}
                            sx={{ paddingRight: !column.numeric ? 6 : undefined }}
                          >
                            {column.Cell ? (
                              <column.Cell
                                row={row}
                                value={row[column.id]}
                                accessedData={
                                  column.accessorFn
                                    ? column.accessorFn(row)
                                    : row[column.id]
                                }
                              />
                            ) : (
                              <Typography>
                                {column.accessorFn
                                  ? column.accessorFn(row)
                                  : `${row[column.id]}`}
                              </Typography>
                            )}
                          </TableCell>
                        )}
                      </>
                    ))}
                  </TableRow>
                );
              })}

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

      {actions && (
        <ActionMenu
          isOpen={isMenuOpen}
          onClose={handleCloseMenu}
          actions={actions}
          clickPosition={clickPosition}
          rowId={selectedRow!}
        />
      )}
    </Box>
  );
};

export default EnhancedTable;
