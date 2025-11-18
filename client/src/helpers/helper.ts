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
  "Created At",
  "Updated At",
  "Actions",
];

export const UsersTableHeader = [
  "ID",
  "First Name",
  "Last Name",
  "Email",
  "Role",
  "Created At",
  "Actions",
];

export function SliderValuetext(value: number) {
  return `${value} %`;
}

export function splitWithCommas(input: string, i: number) {
  return input.split(",").map((s) => s.trim())[i];
}