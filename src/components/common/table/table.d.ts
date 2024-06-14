type RowDataT = {
  id: number;
} & Record<string, unknown>;

interface EnhancedTableProps<V extends RowDataT = RowDataT> {
  columns: TableColumnDef<V>[];
  rows: V[];
  showCheckbox: boolean;
  actions?: { label: string; function: (id: number) => void }[];
  InnerComponent?: (props: { data: RowDataT }) => React.ReactNode;

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

interface TableColumnDef<V = RowDataT> {
  id: keyof V & string | "action";
  label: string;
  type: "text" | "date" | "number";
  disablePadding?: boolean;
  numeric?: boolean;
  alignment?: "left" | "center" | "right";
  accessorFn?: (v: V) => string;
  Cell?: ({ row: RowDataT, value: V, accessedData: string }) => React.ReactNode;
}

type Order = "asc" | "desc";
