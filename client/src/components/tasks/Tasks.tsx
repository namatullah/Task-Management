"use client";
import {
  Alert,
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
import TableHeader from "./child-components/TableHeader";
import { TasksType } from "../../helpers/types/tasks";
import StatusSub from "./child-components/StatusSub";
import PrioritySub from "./child-components/PrioritySub";
import ProgressSub from "./child-components/ProgressSub";
import ArchiveSub from "./child-components/ArchiveSub";
import UserTooltip from "./child-components/UserTooltip";
import EditSub from "./child-components/EditSub";
import DeleteSub from "./child-components/DeleteSub";
import { TaskPagination, splitWithCommas } from "@/helpers/helper";
import { getTasks } from "@/lib/tasks";
import { useAuth } from "@/hooks/AuthContext";
import TableTitle from "./child-components/TableTitle";
import { PaginatedResponse } from "@/helpers/types/pagination";

const Tasks = ({
  isArchived,
  projectId,
}: {
  isArchived: boolean | any;
  projectId: number | null;
}) => {
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
    console.log("before call :", user);
    try {
      const response: PaginatedResponse<TasksType> = await getTasks({
        page: page + 1, // Convert to 1-based for backend
        limit: rowsPerPage,
        userId: user?.id,
        projectId,
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
    if (!user) return;
    if (rerender) {
      setPagination({
        page: TaskPagination.page,
        rowsPerPage: TaskPagination.rowsPerPage,
      });
    }
    loadTasks(pagination.page, pagination.rowsPerPage);
  }, [pagination.page, pagination.rowsPerPage, rerender, user]);

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
    <TableContainer component={Paper} elevation={6}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableTitle
            isArchived={isArchived}
            rerender={rerender}
            setRerender={setRerender}
            projectId={projectId}
          />
          <TableHeader />
        </TableHead>
        <TableBody>
          {tasks?.length > 0 ? (
            tasks.map((task: any) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={task.id}>
                <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
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
                <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
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
                <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
                  {splitWithCommas(new Date(task.endDate).toLocaleString(), 0)}
                  <br />
                  {splitWithCommas(new Date(task.endDate).toLocaleString(), 1)}
                </TableCell>
                <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
                  {task.status}
                  {!isArchived &&
                    isAuthenticated &&
                    (user?.role === "admin" || user?.id === task.user.id) && (
                      <StatusSub task={task} />
                    )}
                </TableCell>

                <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
                  {task.priority}
                  {!isArchived &&
                    isAuthenticated &&
                    (user?.role === "admin" || user?.id === task.user.id) && (
                      <PrioritySub task={task} />
                    )}
                </TableCell>

                <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
                  {task.progress + " %"}
                  {!isArchived &&
                    isAuthenticated &&
                    (user?.role === "admin" || user?.id === task.user.id) && (
                      <ProgressSub task={task} />
                    )}
                </TableCell>
                {user?.role === "admin" && (
                  <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
                    {isAuthenticated && <ArchiveSub task={task} />}
                  </TableCell>
                )}
                <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
                  <Tooltip title={<UserTooltip user={task?.user} />}>
                    <span>{task?.user?.name}</span>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
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
                <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
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
                <TableCell sx={{ verticalAlign: "top", fontSize: "0.76rem" }}>
                  {!isArchived &&
                    isAuthenticated &&
                    (user?.id === task.user.id || user?.role === "admin") && (
                      <>
                        <EditSub task={task} />
                        <DeleteSub taskId={task.id} />
                      </>
                    )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="left" colSpan={4}>
                {apiError ? (
                  <Alert severity="error">{apiError}</Alert>
                ) : (
                  <Alert severity="info">No task is available</Alert>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={TaskPagination.rowsPerPageOptions}
        component="div"
        count={total} // Use total from backend
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        disabled={loading}
      />
    </TableContainer>
  );
};

export default Tasks;
