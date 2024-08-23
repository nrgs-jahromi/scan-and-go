import { MoreHoriz } from "@mui/icons-material";
import { Box, Checkbox, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import { ArrowDown2 } from "iconsax-react";
import { Fragment, MouseEvent, useRef, useState } from "react";
import ActionMenu from "./ActionMenu";

const EnhancedTableRow = <V extends RowDataT = RowDataT>({
  row,
  columns,
  columnsNum,
  actions,
  showCheckbox,
  isSelected,
  onDoubleClick,
  InnerComponent,
}: TableRowProps<V>) => {
  const optionButtonRef = useRef(null);
  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleActionsIconClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    setClickPosition({ x: event.clientX, y: event.clientY });
    setIsActionMenuOpen(true);
  };

  const handleActionMenuClose = () => {
    setIsActionMenuOpen(false);
  };

  const handleExpandClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsExpanded((prev) => !prev);
  };

  return (
    <Fragment>
      <TableRow
        hover
        onDoubleClick={onDoubleClick ? (event) => onDoubleClick(event, row) : undefined} // تغییر از onClick به onDoubleClick
        role="checkbox"
        aria-checked={isSelected}
        tabIndex={-1}
        key={row.id}
        selected={isSelected}
        sx={{ cursor: "pointer" }}
      >
        {showCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              checked={isSelected}
              inputProps={{ "aria-labelledby": `enhanced-table-checkbox-${row.id}` }}
            />
          </TableCell>
        )}

        {columns.map((column) => (
          <Fragment key={row.id + "__" + column.id}>
            {column.id === "action"  && !column.Cell ? (
              <TableCell
                align={"right"}
                padding={column.disablePadding ? "none" : "normal"}
                sx={{ paddingRight: 5 }}
              >
                <IconButton ref={optionButtonRef} onClick={handleActionsIconClick}>
                  <MoreHoriz />
                </IconButton>
              </TableCell>
            ) : (
              <TableCell
                align={column.alignment || "right"}
                sx={{ paddingRight: !column.numeric ? 6 : undefined  , whiteSpace:"nowrap"}}
              >
                {column.Cell ? (
                  <column.Cell
                    row={row}
                    value={row[column.id]}
                    accessedData={column.accessorFn ? column.accessorFn(row) : `${row[column.id]}`}
                  />
                ) : (
                  <Typography>
                    {column.accessorFn ? column.accessorFn(row) : `${row[column.id]}`}
                  </Typography>
                )}
              </TableCell>
            )}
          </Fragment>
        ))}

        {InnerComponent && (
          <TableCell>
            <IconButton onClick={handleExpandClick}>
              <ArrowDown2
                size={17}
                className={(isExpanded ? "rotate-180" : "rotate-0") + " transition-all"}
              />
            </IconButton>
          </TableCell>
        )}

        {actions && isActionMenuOpen && (
          <ActionMenu
            isOpen={isActionMenuOpen}
            onClose={handleActionMenuClose}
            actions={actions}
            clickPosition={clickPosition}
            rowId={row.id}
          />
        )}
      </TableRow>

      {InnerComponent && isExpanded && (
        <TableRow>
          <TableCell colSpan={columnsNum}>
            <InnerComponent data={row} />
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
};

export default EnhancedTableRow;
