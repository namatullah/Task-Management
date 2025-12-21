const percentage: any[] = [];
for (let i = 0; i <= 100; i = i + 5) {
  percentage.push({ value: i, label: i + " %" });
}
export default percentage;

export const UserRole = ["user", "admin"];

export const TaskTableHeader = [
  "ID",
  "Title",
  "Description",
  "Start Date",
  "End Date",
  "Status",
  "Priority",
  "Progress",
  "Archive?",
  "Assigned to",
  "Created",
  "Updated",
  "Actions",
];

export const UsersTableHeader = [
  "ID",
  "Name",
  "Email",
  "Role",
  "Created At",
  "Active/Deactive",
];

export function SliderValuetext(value: number) {
  return `${value} %`;
}

export function splitWithCommas(input: string, i: number) {
  return input.split(",").map((s) => s.trim())[i];
}

export const TaskPagination = {
  page: 0,
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 20],
};

export const stepperSteps = [
  {
    label: "Planned",
    value: "planned",
    description: "Approved and ready to be worked on",
    textColor: "#6C757D",
  },
  {
    label: "Not Started",
    value: "not_started",
    description: "Assigned but development has not begun",
    textColor: "#ADB5BD",
  },
  {
    label: "In Progress",
    value: "in_progress",
    description: "Actively being worked on",
    textColor: "#0D6EFD",
  },
  {
    label: "In Review",
    value: "review",
    description: "Awaiting review and approval, and code changes if requested",
    textColor: "#6F42C1",
  },
  {
    label: "Testing / QA",
    value: "testing",
    description: "Being tested and code changes, bugs solving",
    textColor: "#20C997",
  },
  {
    label: "On Hold",
    value: "on_hold",
    description: "Temporarily paused due to issues or decisions",
    textColor: "#FFC107",
  },
  {
    label: "Ready for release",
    value: "in_ready",
    description: "Completed, tested, and approved, awaiting deployment",
    textColor: "#6610F2",
  },
  {
    label: "Completed",
    value: "completed",
    description: "Finished and delivered",
    textColor: "#198754",
  },
  {
    label: "Cancelled",
    value: "cancelled",
    description: "Permanently stopped",
    textColor: "#DC3545",
  },
];

export const onHoldRoutes = ["not_started", "in_progress", "review", "testing"];
export const cancelRoutes = [
  "not_started",
  "in_progress",
  "review",
  "testing",
  "on_hold",
];

export enum Status {
  ACTIVE = "active",
  DONE = "done",
}
