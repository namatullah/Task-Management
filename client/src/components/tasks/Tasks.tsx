"use client";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import { useState } from "react";
import TableHeader from "./child-components/TableHeader";
import { TasksType } from "../types/tasks";
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

const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };

const Tasks = ({
  tasks,
  isArchived,
}: {
  tasks: TasksType[] | void | any;
  isArchived: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const openForm = () => {
    setOpen(true);
  };
  const closeForm = () => {
    setOpen(false);
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

                      {!isArchived && (
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
                          {!isArchived && <StatusSub task={task} />}
                        </TableCell>

                        <TableCell
                          sx={{ verticalAlign: "top", fontSize: "0.76rem" }}
                        >
                          {task.priority}
                          {!isArchived && <PrioritySub task={task} />}
                        </TableCell>

                        <TableCell
                          sx={{ verticalAlign: "top", fontSize: "0.76rem" }}
                        >
                          {task.progress + " %"}
                          {!isArchived && <ProgressSub task={task} />}
                        </TableCell>

                        <TableCell
                          sx={{ verticalAlign: "top", fontSize: "0.76rem" }}
                        >
                          <ArchiveSub task={task} />
                        </TableCell>

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
                          {!isArchived && (
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
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default Tasks;
