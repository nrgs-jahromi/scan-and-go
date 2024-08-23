type RowDataT = {
  id: number;
} & Record<string, unknown>;

interface EnhancedTableProps<V extends RowDataT = RowDataT> {
  columns: TableColumnDef<V>[];
  rows: V[];
  showCheckbox: boolean;
  actions?: ActionTableT[];
  InnerComponent?: (props: { data: V }) => React.ReactNode;

  order: Order;
  orderBy: string;
  selected: readonly number[];
  page: number;
  rowsPerPage: number;
  totalSize: number | undefined;
  isLoading: boolean;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

interface TableColumnDef<V extends RowDataT = RowDataT> {
  id: (keyof V & string) | "action";
  label: string;
  type: "text" | "date" | "number";
  disablePadding?: boolean;
  numeric?: boolean;
  alignment?: "left" | "center" | "right";
  accessorFn?: (v: V) => string;
  Cell?: (props: { row: V, value: unknown, accessedData: string }) => React.ReactNode;
}

interface TableHeadProps<V extends RowDataT = RowDataT> {
  columns: TableColumnDef<V>[];
  columnsNum?: number;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  showCheckbox: boolean;
}

interface TableRowProps<V extends RowDataT = RowDataT> {
  row: V;
  columns: TableColumnDef<V>[];
  columnsNum?: number;
  actions?: ActionTableT[];
  showCheckbox?: boolean;
  isSelected?: boolean;
  onDoubleClick?: (event: MouseEvent<HTMLTableRowElement>, row: V) => void;
  InnerComponent?: (props: { data: V }) => React.ReactNode;
}

type Order = "asc" | "desc";

type ActionTableT = {
  label: string;
  onClick: (id: number) => void; // Adjusted function type to accept id
  disabled?: (id: number) => boolean;  
};
