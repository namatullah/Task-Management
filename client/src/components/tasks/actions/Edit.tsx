"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import React, { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { editTask } from "@/lib/tasks";
import { TasksType } from "@/components/types/tasks";
import { fetchUsers } from "@/lib/user";

const Edit = ({
  open,
  close,
  task,
}: {
  open: boolean;
  close: () => void;
  task: TasksType;
}) => {
  const router = useRouter();

  const [allUsers, setAllUsers] = useState<any>([]);

  const [title, setTitle] = useState<any>(task.title);
  const [description, setDescription] = useState<any>(task.description);
  const [startDate, setStartDate] = useState(dayjs(task.startDate));
  const [endDate, setEndDate] = useState(dayjs(task.endDate));
  const [user, setUser] = useState(task?.user?.id);

  useLayoutEffect(() => {
    fetchUsers()
      .then((res) => setAllUsers(res.data))
      .catch((error) => console.log(error));
  }, []);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    priority?: string;
    user?: string;
  }>({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!startDate || !startDate.isValid())
      newErrors.startDate = "Select a valid start date";
    if (!endDate || !endDate.isValid())
      newErrors.endDate = "Select a valid start date";
    if (startDate && endDate && endDate.isBefore(startDate))
      newErrors.endDate = "End date can not be before start date";
    if (!user) newErrors.user = "Select a user";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const data = {
        title,
        description,
        startDate: startDate.toDate().toISOString(),
        endDate: endDate.toDate().toISOString(),
        userId: user,
      };
      try {
        await editTask(task.id, data);
        router.push("/");
        close();
      } catch (error: any) {
        if (error.response?.data?.message) {
          console.log(error.response?.data?.message);
        } else {
          console.log("Update Faild");
        }
      }
    }
  };

  const handleCancel = () => {
    close();
  };
  return (
    <Dialog open={open} fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            error={!!errors.title}
            helperText={errors.title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            value={description}
            error={!!errors.description}
            helperText={errors.description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  "DateTimePicker",
                  "MobileDateTimePicker",
                  "DesktopDateTimePicker",
                  "StaticDateTimePicker",
                ]}
              >
                <DateTimePicker
                  name="startDate"
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue: any) => setStartDate(newValue)}
                  slotProps={{
                    textField: {
                      error: !!errors.startDate,
                      helperText: errors.startDate,
                      margin: "dense",
                      fullWidth: false,
                      variant: "outlined",
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  "DateTimePicker",
                  "MobileDateTimePicker",
                  "DesktopDateTimePicker",
                  "StaticDateTimePicker",
                ]}
              >
                <DateTimePicker
                  name="endDate"
                  label="End Date"
                  value={endDate}
                  onChange={(newValue: any) => setEndDate(newValue)}
                  slotProps={{
                    textField: {
                      error: !!errors.endDate,
                      helperText: errors.endDate,
                      margin: "dense",
                      fullWidth: true,
                      variant: "outlined",
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <TextField
            select
            name="user"
            margin="dense"
            id="outlined-select-currency"
            label="Task Holder"
            variant="outlined"
            value={user}
            fullWidth
            error={!!errors.user}
            helperText={errors.user}
            onChange={(e) => setUser(e.target.value)}
          >
            {allUsers.map((user: any) => (
              <MenuItem key={user.id} value={user.id}>
                {user.firstName + " " + user.lastName}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions style={{ padding: "0 25px 20px 20px" }}>
          <Button variant="contained" color="primary" type="submit">
            edit task
          </Button>
          <Button variant="contained" color="error" onClick={handleCancel}>
            cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Edit;
