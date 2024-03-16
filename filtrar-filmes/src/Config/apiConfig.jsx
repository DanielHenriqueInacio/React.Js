const baseUrl = 'http://localhost:3000/filmes';

async function fetchData() {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
  } catch(error) {
    console.error('Erro ao fazer requisição: ', error);
    throw error;
  }
}

export { fetchData };