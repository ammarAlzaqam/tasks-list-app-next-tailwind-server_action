import Task, { TaskDocumentType } from "@/model/task";
import { updateTask } from "@/utils/actions";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EditTaskPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const { id: taskId } = await params;
  const task = await Task.findById(taskId) as TaskDocumentType;
  if (!task) notFound();
  return (
    <section>
      <Link href={`/task/${task._id}`} className="underline block mb-10">
        {"<< "} Back to task details
      </Link>
      <div className="p-5 w-2/3 mx-auto border-2 border-gray-300 rounded-lg ">
        <h1 className="capitalize font-bold text-2xl text-gray-400">
          Edit Task
        </h1>
        <form action={updateTask} className="flex flex-col gap-6">
          <input type='hidden' name="id" value={task?._id?.toString()} />
          <input
            type="text"
            placeholder="Task Title"
            name="title"
            defaultValue={task?.title}
            className="p-2 rounded-lg bg-white text-xl text-gray-950"
          />
          <select
            name="status"
            defaultValue={task?.status}
            className="p-2 rounded-lg bg-white text-xl text-gray-950"
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
          <textarea
            rows={5}
            name="description"
            placeholder="Task Description"
            className="p-2 rounded-lg bg-white text-xl text-gray-950 resize-none"
            defaultValue={task?.description}
          ></textarea>
          <button type="submit" className="capitalize py-2 text-xl text-black rounded-lg bg-cyan-300 hover:bg-cyan-400 font-semibold">
            Edit Task
          </button>
        </form>
      </div>
    </section>
  );
}
