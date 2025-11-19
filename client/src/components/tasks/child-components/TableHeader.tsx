import * as React from "react";
import { TableCell, TableRow } from "@mui/material";
import { TaskTableHeader } from "@/helpers/helper";
import { useAuth } from "@/components/layout/contexts/AuthContext";

const TableHeader = () => {
  const { user, isAuthenticated } = useAuth();
  return (
    <TableRow>
      {TaskTableHeader.filter((h) =>
        isAuthenticated
          ? user?.role === "admin"
            ? h
            : h !== "Archive?"
          : h !== "Actions" && h !== "Archive?"
      ).map((header, index) => {
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
