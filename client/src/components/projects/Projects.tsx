"use client";
import {
  Button,
  Card,
  CardActions,
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
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

import { Fragment, useEffect, useState } from "react";
import { TaskPagination } from "@/helpers/helper";
import { useAuth } from "@/hooks/AuthContext";
import TableTitle from "./childs/TableTitle";
import { listProject } from "@/lib/project";
import { ProjectType } from "@/helpers/types/projects";
import { PaginatedResponse } from "@/helpers/types/pagination";
import { orange } from "@mui/material/colors";
import { AddOutlined, AddTaskOutlined } from "@mui/icons-material";
import Board from "./board/Board";

const Projects = ({ isArchived }: boolean | any) => {
  const [rerender, setRerender] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const [apiError, setApiError] = useState<string | null | undefined>(null);

  const [pagination, setPagination] = useState({
    page: TaskPagination.page, // Material-UI uses 0-based index
    rowsPerPage: TaskPagination.rowsPerPage,
  });
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadProjects = async (page: number, rowsPerPage: number) => {
    setLoading(true);
    try {
      const response: PaginatedResponse<ProjectType> = await listProject({
        page: page + 1, // Convert to 1-based for backend
        limit: rowsPerPage,
      });

      setProjects(response.data);
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
    loadProjects(pagination.page, pagination.rowsPerPage);
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
    <Card elevation={6} sx={{ m: 2 }}>
      <CardContent>
        <TableTitle />
        {projects.map((project) => (
          <TableContainer
            component={Paper}
            elevation={6}
            key={project.id}
            sx={{ mb: 2 }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableBody>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell
                    width="30%"
                    sx={{ verticalAlign: "top", fontSize: "0.76rem" }}
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      {project.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {project.description}
                    </Typography>
                    <h4 style={{ color: "orange" }}>
                      {project.status?.replace("_", " ").toUpperCase()}
                    </h4>
                    <EditNoteIcon color="primary" />
                    <DeleteIcon color="error" />
                  </TableCell>
                  <TableCell>
                    
                    <Board projectId = {project.id} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ))}
      </CardContent>
    </Card>
  );
};

export default Projects;
