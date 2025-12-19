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
  },
  {
    label: "Not Started",
    value: "not_started",
    description: "Assigned but developement has not begun",
  },
  {
    label: "In Progress",
    value: "in_progress",
    description: "Actively being worked on",
  },
  {
    label: "On Hold",
    value: "on_hold",
    description: "Temporarily paused due to issues or decisions",
  },
  {
    label: "In Review",
    value: "review",
    description: "Awaiting review and approval",
  },
  {
    label: "Testing / QA",
    value: "testing",
    description: "Being tested or validated",
  },
  {
    label: "Ready for release",
    value: "in_ready",
    description: "Completed, tested, and approved, awaiting deployment",
  },
  {
    label: "Completed",
    value: "completed",
    description: "Finished and delivered",
  },
  {
    label: "Cancelled",
    value: "cancelled",
    description: "Permanently stopped",
  },
];
