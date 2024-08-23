import { useState } from "react";
import EnhancedTable from "./EnhancedTable";
import { Box, Typography } from "@mui/material";

type Person = {
  id: number;
  name: string;
  age: number;
  email: string;
};

const columns: TableColumnDef<Person>[] = [
  { id: "id", label: "ID", numeric: true, type: "number" },
  { id: "name", label: "Name", type: "text" },
  { id: "age", label: "Age", numeric: true, type: "number" },
  { id: "email", label: "Email", type: "text" },
  { id: "action", label: "Action", alignment: "center", type: "number" },
];

const rows = [
  { id: 1, name: "John Doe", age: 25, email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", age: 30, email: "jane.smith@example.com" },
  { id: 3, name: "Bob Johnson", age: 35, email: "bob.johnson@example.com" },
  { id: 4, name: "Alice Brown", age: 28, email: "alice.brown@example.com" },
  { id: 5, name: "Charlie Green", age: 32, email: "charlie.green@example.com" },
];

const actions = [
  { label: "Edit", onClick: (id: number) => console.log("Edit", id) },
  { label: "Delete", onClick: (id: number) => console.log("Delete", id) },
];

const TempTableTest = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof RowDataT>("name");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <EnhancedTable<Person>
      columns={columns}
      rows={rows}
      showCheckbox={true}
      actions={actions}
      order={order}
      orderBy={orderBy}
      selected={selected}
      page={page}
      rowsPerPage={rowsPerPage}
      totalSize={rows.length}
      isLoading={true}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      setSelected={setSelected}
      setPage={setPage}
      setRowsPerPage={setRowsPerPage}
      InnerComponent={(props: { data: Person }) => <Typography>Name: {props.data.name}</Typography>}
    />
  );
};

export default TempTableTest;
