"use client";
import {
  Alert,
  Button,
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
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import TableHeader from "./child-components/TableHeader";
import { PaginatedResponse, TasksType } from "../types/tasks";
import { AddTaskOutlined } from "@mui/icons-material";
import Add from "./actions/Add";
import StatusSub from "./child-components/StatusSub";
import PrioritySub from "./child-components/PrioritySub";
import ProgressSub from "./child-components/ProgressSub";
import ArchiveSub from "./child-components/ArchiveSub";
import UserTooltip from "./child-components/UserTooltip";
import EditSub from "./child-components/EditSub";
import DeleteSub from "./child-components/DeleteSub";
import Link from "next/link";
import { splitWithCommas } from "@/helpers/helper";
import { getTasks } from "@/lib/tasks";
import { useAuth } from "@/hooks/AuthContext";

const Tasks = ({ isArchived }: boolean | any) => {
  const { user, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  const openForm = () => {
    setOpen(true);
  };
  const closeForm = () => {
    setOpen(false);
  };

  const [pagination, setPagination] = useState({
    page: 0, // Material-UI uses 0-based index
    rowsPerPage: 5,
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
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(pagination.page, pagination.rowsPerPage);
  }, [pagination.page, pagination.rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setPagination({
      page: 0, // Reset to first page when changing rows per page
      rowsPerPage: newRowsPerPage,
    });
  };

  return (
    <>
      {open && <Add open={open} close={closeForm} />}
      <Card sx={{ paddingX: "11px" }} elevation={0}>
        <CardContent>
          <TableContainer component={Paper} elevation={6}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={13}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {isArchived ? "Archived Tasks List" : "Tasks List"}
                        <Link
                          href={isArchived ? "/" : "/archived"}
                          style={{
                            fontSize: "x-small",
                            textDecoration: "none",
                            marginLeft: "7px",
                          }}
                        >
                          {isArchived ? "Un Archived" : "Archived"}
                        </Link>
                      </Typography>

                      {isAuthenticated && !isArchived && (
                        <Button
                          variant="outlined"
                          onClick={openForm}
                          startIcon={<AddTaskOutlined />}
                        >
                          <span style={{ paddingTop: "inherit" }}>
                            Add Task
                          </span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                <TableHeader />
              </TableHead>
              <TableBody>
                {tasks?.length > 0 ? (
                  tasks.map((task: any) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={task.id}
                      >
                        <TableCell
                          sx={{ verticalAlign: "top", fontSize: "0.76rem" }}
                        >
                          {task.id}
                        </TableCell>
                        <TableCell
                          width="10%"
                          sx={{ verticalAlign: "top", fontSize: "0.76rem" }}
                        >
                          {task.title}
                        </TableCell>
                        <TableCell
                          width="15%"
                          sx={{ verticalAlign: "top", fontSize: "0.76rem" }}
                        >
                          {task.description}
                        </TableCell>
                        <TableCell
                          sx={{ verticalAlign: "top", fontSize: "0.76rem" }}
                        >
                          {splitWithCommas(
                            new Date(task.startDate).toLocaleString(),
                            0
                          )}
                          <br />
                          {splitWithCommas(
                            new Date(task.startDate).toLocaleString(),
                            1
                          )}
                        </TableCell>
                        <TableCell
                          sx={{ verticalAlign: "top", fontSize: "0.76rem" }}
                        >
                          {splitWithCommas(
                            new Date(task.endDate).toLocaleString(),
                            0
                          )}
                          <br />
                          {splitWithCommas(
                            new Date(task.endDate).toLocaleString(),
                            1
                          )}
                        </TableCell>
                        <TableCell
                          sx={{ verticalAlign: "top", fontSize: "0.76rem" }}
                        >
                          {task.status}
                          {!isArchived &&
                            isAuthenticated &&
                            (user?.role === "admin" ||
                              user?.id === task.user.id) && (
                              <StatusSub task={task} />
                            )}
                        </TableCell>

                        <TableCell
                          sx={{ verticalAlign: "top", fontSize: "0.76rem" }}
                        >
                          {task.priority}
                          {!isArchived &&
                            isAuthenticated &&
                            (user?.role === "admin" ||
                              user?.id === task.user.id) && (
                              <PrioritySub task={task} />
                            )}
                        </TableCell>

                        <TableCell
                          sx={{ verticalAlign: "top", fontSize: "0.76rem" }}
                        >
                          {task.progress + " %"}
                          {!isArchived &&
                            isAuthenticated &&
                            (user?.role === "admin" ||
                              user?.id === task.user.id) && (
                              <ProgressSub task={task} />
                            )}
                        </TableCell>
                        {user?.role === "admin" && (
                          <TableCell
                            sx={{ verticalAlign: "top", fontSize: "0.76rem" }}
                          >
                            {isAuthenticated && <ArchiveSub task={task} />}
                          </TableCell>
                        )}
                        <TableCell
                          sx={{ verticalAlign: "top", fontSize: "0.76rem" }}
                        >
                          <Tooltip title={<UserTooltip user={task?.user} />}>
                            <span>
                              {task?.user?.firstName +
                                " " +
                                task?.user?.lastName}
                            </span>
                          </Tooltip>
                        </TableCell>
                        <TableCell
                          sx={{ verticalAlign: "top", fontSize: "0.76rem" }}
                        >
                          {splitWithCommas(
                            new Date(task.createdAt).toLocaleString(),
                            0
                          )}
                          <br />
                          {splitWithCommas(
                            new Date(task.createdAt).toLocaleString(),
                            1
                          )}
                        </TableCell>
                        <TableCell
                          sx={{ verticalAlign: "top", fontSize: "0.76rem" }}
                        >
                          {splitWithCommas(
                            new Date(task.updatedAt).toLocaleString(),
                            0
                          )}
                          <br />
                          {splitWithCommas(
                            new Date(task.updatedAt).toLocaleString(),
                            1
                          )}
                        </TableCell>
                        <TableCell
                          sx={{ verticalAlign: "top", fontSize: "0.76rem" }}
                        >
                          {!isArchived &&
                            isAuthenticated &&
                            (user?.id === task.user.id ||
                              user?.role === "admin") && (
                              <>
                                <EditSub task={task} />
                                <DeleteSub taskId={task.id} />
                              </>
                            )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell align="left" colSpan={4}>
                      <Alert severity="info">No personal details</Alert>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={total} // Use total from backend
              rowsPerPage={pagination.rowsPerPage}
              page={pagination.page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              disabled={loading}
            />
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default Tasks;
