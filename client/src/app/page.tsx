import Tasks from "@/components/tasks/Tasks";
import { getTasks } from "@/lib/tasks";

const page = async () => {
  const tasks = await getTasks();

  return <Tasks tasks={tasks} isArchived = {false} />;
};

export default page;
