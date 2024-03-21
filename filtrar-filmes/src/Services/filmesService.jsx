import { baseUrl } from "../Config/apiConfig";

export async function getMovies() {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateMovie(movieId, updatedData) {
  try {
    const response = await fetch(`${baseUrl}/${movieId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteMovie(movieId) {
  try {
    const response = await fetch(`${baseUrl}/${movieId}`, {
      method: "DELETE"
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
