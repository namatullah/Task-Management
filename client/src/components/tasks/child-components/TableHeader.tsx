import * as React from "react";
import { TableCell, TableRow } from "@mui/material";
import { TaskTableHeader } from "@/helpers/helper";

const TableHeader = () => {
  return (
    <TableRow>
      {TaskTableHeader.map((header, index) => {
        return (
          <TableCell
            key={index}
            sx={{
              fontSize: "0.76rem",
              fontWeight: "bold",
              color: "#b0b0d7",
            }}
          >
            {header}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default TableHeader;
