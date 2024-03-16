import { fetchData } from "../Config/apiConfig";

export async function getMovies() {
  try {
    const movies = await fetchData();
    return movies;
  } catch (error) {
    throw error;
  }
}

export async function updateMovie(movieId, updatedData) {
  try {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    };
    const updatedMovie = await fetchData(`*/${movieId}`, options);
    return updatedMovie
  } catch(error) {
    throw error;
  }
}
