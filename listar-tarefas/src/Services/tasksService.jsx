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

export async function updateTaskStatus(taskId, updatedStatus) {
  try {
    const res = await fetch(`${baseUrl}/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({status: updatedStatus}),
    });

    if(!res.ok) {
      throw new Error('Erro ao atualizar tarefa');
    }
    
    return res.json();
  } catch (e) {
    throw new Error(`Erro ao atualizar tarefa: ${e.message}`);
  }
}
