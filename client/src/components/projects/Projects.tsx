"use client";
import {
  Alert,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";

import { useEffect, useState } from "react";
import { PaginatedResponse, TasksType } from "../types/tasks";
import { TaskPagination, splitWithCommas } from "@/helpers/helper";
import { getTasks } from "@/lib/tasks";
import { useAuth } from "@/hooks/AuthContext";
import TableTitle from "./childs/TableTitle";

const Projects = ({ isArchived }: boolean | any) => {
  const [rerender, setRerender] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const [apiError, setApiError] = useState<string | null | undefined>(null);

  const [pagination, setPagination] = useState({
    page: TaskPagination.page, // Material-UI uses 0-based index
    rowsPerPage: TaskPagination.rowsPerPage,
  });
  const [tasks, setTasks] = useState<TasksType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadTasks = async (page: number, rowsPerPage: number) => {
    setLoading(true);
    try {
      const response: PaginatedResponse<TasksType> = await getTasks({
        page: page + 1, // Convert to 1-based for backend
        limit: rowsPerPage,
      });
      setTasks(response.data);
      setTotal(response.total);
    } catch (error: any) {
      setApiError(error?.props);
    } finally {
      setLoading(false);
      setRerender(false);
    }
  };
  useEffect(() => {
    if (rerender) {
      setPagination({
        page: TaskPagination.page,
        rowsPerPage: TaskPagination.rowsPerPage,
      });
    }
    loadTasks(pagination.page, pagination.rowsPerPage);
  }, [pagination.page, pagination.rowsPerPage, rerender]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setPagination({
      page: TaskPagination.page, // Reset to first page when changing rows per page
      rowsPerPage: newRowsPerPage,
    });
  };
  return (
    <Card sx={{ paddingX: "11px" }} elevation={0}>
      <CardContent>
        <TableContainer component={Paper} elevation={6}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableTitle
                isArchived={isArchived}
                rerender={rerender}
                setRerender={setRerender}
              />
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: "0.76rem",
                    fontWeight: "bold",
                    color: "#b0b0d7",
                  }}
                >
                  head 1
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "0.76rem",
                    fontWeight: "bold",
                    color: "#b0b0d7",
                  }}
                >
                  head 2
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "0.76rem",
                    fontWeight: "bold",
                    color: "#b0b0d7",
                  }}
                >
                  head 3
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
                  data 1
                </TableCell>
                <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
                  data 2
                </TableCell>
                <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
                  data 3
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default Projects;
