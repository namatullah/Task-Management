import Tasks from "@/components/tasks/Tasks";
import { getArchived } from "@/lib/tasks";

const page = async () => {
  const tasks = await getArchived();

  return <Tasks isArchived = {true}/>;
};

export default page;
