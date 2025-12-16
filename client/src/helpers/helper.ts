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
