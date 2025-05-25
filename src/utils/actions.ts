"use server";
import connectDB from "@/libs/connectDB";
import Task, { Status } from "@/model/task";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateTaskDto } from "./dtos";

// Create Task
export const createTask = async (newTask: CreateTaskDto) => {
  if (typeof newTask.title !== "string" || newTask.title.length < 2)
    return console.log("Error in createTask: title is Required");
  if (typeof newTask.description !== "string" || newTask.description.length < 4)
    return console.log("Error in createTask: description is Required");

  try {
    await connectDB();
    await Task.create(newTask);
  } catch (e: any) {
    console.log("Create Task: Error => ", e);
    throw new Error(`Create Task: Error => ${e.message}`);
  }
  // revalidatePath("/");
  redirect("/");
};

// Delete Task
export const deleteTask = async (formData: FormData) => {
  const taskId = formData.get("taskId")?.toString();
  if (!taskId) return console.log("Delete task: Error => id not found");

  try {
    await connectDB();
    await Task.deleteOne({ _id: taskId });
  } catch (e: any) {
    console.log("Delete task: Error => ", e.message);
  }

  // revalidatePath("/");
  redirect("/");
};

export const updateTask = async (formData: FormData) => {
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const status = formData.get("status") as Status;
  const id = formData.get("id")?.toString();

  if (typeof title != "string" || title.length < 2) return;
  if (typeof description != "string" || description.length < 2) return;
  if (!status) return;
  if (typeof id != "string") return;

  try {
    await Task.findByIdAndUpdate(id, { title, description, status });
  } catch (e: any) {
    throw new Error(`Edit Task Error: ${e.message}`);
  }
  // revalidatePath("/");
  revalidatePath(`/task/${id}`);
  redirect(`/task/${id}`);
};
