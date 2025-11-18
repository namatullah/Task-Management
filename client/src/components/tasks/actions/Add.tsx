"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
} from "@mui/material";

import { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import React, { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { postTask } from "@/lib/tasks";
import { FormType } from "../../types/tasks";
import percentage, { SliderValuetext } from "@/helpers/helper";
import { fetchUsers } from "@/lib/user";

const Add = ({ open, close }: FormType) => {
  const router = useRouter();

  const [allUsers, setAllUsers] = useState<any>([]);

  const [sdate, setSDate] = useState<Dayjs | null>(null);
  const [edate, setEDate] = useState<Dayjs | null>(null);
  useLayoutEffect(() => {
    fetchUsers()
      .then((res) => setAllUsers(res.data))
      .catch((error) => console.log(error));
  }, []);

  const [postData, setPostData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
    priority: "",
    progress: 0,
    userId: "",
  });

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

    if (!postData.title.trim()) newErrors.title = "Title is required";
    if (!postData.description.trim())
      newErrors.description = "Description is required";
    if (!sdate || !sdate.isValid())
      newErrors.startDate = "Select a valid start date";
    if (!edate || !edate.isValid())
      newErrors.endDate = "Select a valid start date";
    if (sdate && edate && edate.isBefore(sdate))
      newErrors.endDate = "End date can not be before start date";
    if (!postData.status) newErrors.status = "Select a task status";
    if (!postData.priority) newErrors.priority = "Select a task priority";
    if (!postData.userId) newErrors.user = "Select a user";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // submit
      const data = {
        title: postData.title,
        description: postData.description,
        startDate: sdate?.toDate().toISOString(),
        endDate: edate?.toDate().toISOString(),
        status: postData.status,
        priority: postData.priority,
        progress: postData.progress,
        userId: postData.userId,
        isArchived: false,
      };
      try {
        await postTask(data);
        router.push("/");
        close();
      } catch (error: any) {
        if (error.response?.data?.message) {
          console.log(error.response?.data?.message);
        } else {
          console.log("insertion Faild");
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
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            value={postData.title}
            error={!!errors.title}
            helperText={errors.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            value={postData.description}
            error={!!errors.description}
            helperText={errors.description}
            onChange={(e) =>
              setPostData({ ...postData, description: e.target.value })
            }
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
                  value={sdate}
                  onChange={(newValue: any) => setSDate(newValue)}
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
                  value={edate}
                  onChange={(newValue: any) => setEDate(newValue)}
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

          <FormControl
            margin="dense"
            variant="outlined"
            error={!!errors.status}
          >
            <FormLabel id="demo-row-radio-buttons-group-label">
              Status
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="status"
              value={postData.status}
              onChange={(e) =>
                setPostData({ ...postData, status: e.target.value })
              }
            >
              <FormControlLabel
                value="pending"
                control={<Radio />}
                label="Pending"
              />
              <FormControlLabel
                value="in_progress"
                control={<Radio />}
                label="In progress"
              />
              <FormControlLabel
                value="completed"
                control={<Radio />}
                label="Completed"
              />
              <FormControlLabel
                value="cancelled"
                control={<Radio />}
                label="Cancelled"
              />
            </RadioGroup>
            {errors.status && (
              <p
                style={{
                  color: "#d32f2f",
                  fontFamily: "Arial",
                  fontWeight: 400,
                  fontSize: "0.75rem",
                  lineHeight: "1.66",
                  letterSpacing: "0.03333em",
                  textAlign: "left",
                  margin: "3px 0 0 14px",
                }}
              >
                {errors.status}
              </p>
            )}
          </FormControl>

          <FormControl
            margin="dense"
            variant="outlined"
            error={!!errors.priority}
          >
            <FormLabel id="demo-row-radio-buttons-group-label">
              Priority
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="priority"
              value={postData.priority}
              onChange={(e) =>
                setPostData({ ...postData, priority: e.target.value })
              }
            >
              <FormControlLabel value="low" control={<Radio />} label="Low" />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel value="high" control={<Radio />} label="High" />
            </RadioGroup>
            {errors.priority && (
              <p
                style={{
                  color: "#d32f2f",
                  fontFamily: "Arial",
                  fontWeight: 400,
                  fontSize: "0.75rem",
                  lineHeight: "1.66",
                  letterSpacing: "0.03333em",
                  textAlign: "left",
                  margin: "3px 0 0 14px",
                }}
              >
                {errors.priority}
              </p>
            )}
          </FormControl>

          <Box marginY={1}>
            <Typography
              id="input-slider"
              gutterBottom
              color="rgba(0, 0, 0, 0.6)"
            >
              Progress percentage
            </Typography>
            <Slider
              aria-label="Restricted values"
              value={postData.progress}
              onChange={(e: any) =>
                setPostData({ ...postData, progress: e?.target?.value })
              }
              getAriaValueText={SliderValuetext}
              step={null}
              valueLabelDisplay="auto"
              marks={percentage}
              sx={{
                "& .MuiSlider-markLabel": {
                  fontSize: "0.5rem", // Adjust as needed
                },
                maxWidth: "95%",
                marginX: "7px",
              }}
            />
          </Box>
          <TextField
            select
            name="user"
            margin="dense"
            id="outlined-select-currency"
            label="Task Holder"
            variant="outlined"
            value={postData.userId}
            fullWidth
            error={!!errors.user}
            helperText={errors.user}
            onChange={(e) =>
              setPostData({ ...postData, userId: e.target.value })
            }
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
            add task
          </Button>
          <Button variant="contained" color="error" onClick={handleCancel}>
            cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Add;
