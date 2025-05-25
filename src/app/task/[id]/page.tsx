import StatusBadge from "@/components/StatusBadge";
import connectDB from "@/libs/connectDB";
import Task, { TaskDocumentType } from "@/model/task";
import dayjs from "dayjs";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TaskDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function TaskDetailsPage({
  params,
}: TaskDetailsPageProps) {
  const { id: taskId } = await params;
  await connectDB();
  const task = (await Task.findById(taskId)) as TaskDocumentType;

  if (!task) notFound();

  return (
    <section>
      <div className="flex justify-between items-center">
        <Link href="/" className="underline">
          {"<< "}Back to tasks table
        </Link>
        <div className="flex gap-3 items-center">
          <Link
            href={`/task/${task._id}/edit`}
            className="px-2 py-1 rounded-lg text-white text-xl bg-green-700 hover:bg-green-600 transition"
          >
            Edit
          </Link>
          <form>
            <button
              type="submit"
              className="px-2 py-1 rounded-lg text-white text-xl bg-red-700 hover:bg-red-600 transition"
            >
              Delete
            </button>
          </form>
        </div>
      </div>

      <div className="p-5 bg-gray-600 mt-16 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="capitalize text-white text-3xl font-bold">
            {task.title}
          </h2>
          <StatusBadge status={task.status} />
        </div>
        <small className="text-yellow-400">
          {dayjs(task.createdAt).format("DD / MM / YY")}
        </small>
        <p className="mt-5 text-xl">{task.description}</p>
      </div>
    </section>
  );
}
