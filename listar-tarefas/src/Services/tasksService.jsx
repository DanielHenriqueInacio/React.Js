import { baseUrl } from "../Config/apiConfig";

export async function getTasks() {
  try {
    const res = await fetch(baseUrl);
    const data = await res.json();
    return data;
  } catch (e) {
    throw e;
  }
}

export async function registerTask(title, description) {
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        status: "Pendente",
        date: new Date().toLocaleDateString(),
        hour: new Date().toLocaleTimeString(),
      }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    throw e;
  }
}

export async function updateTaskStatus(taskId, updatedStatus) {
  try {
    const res = await fetch(`${baseUrl}/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: updatedStatus }),
    });

    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(`Erro ao atualizar status da tarefa: ${e.message}`);
  }
}

export async function updateTask(taskId, updatedTask) {
  try {
    const res = await fetch(`${baseUrl}/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(`Erro ao atualizar tarefa: ${e.message}`);
  }
}

export async function deleteTask(TaskId) {
  try {
    const res = await fetch(`${baseUrl}/${TaskId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (e) {
    throw e;
  }
}
