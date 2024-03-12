import React from "react";
import styles from "../../public/css/Table.module.css";

const Table = () => {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    handleMovie();
  }, []);

  async function handleMovie() {
    try {
      const response = await fetch("http://localhost:3000/filmes");
      const json = await response.json();
      setData(json);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Genero</th>
          <th>Lançamento</th>
          <th>Botões</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.nome}</td>
            <td>{item.genero}</td>
            <td>{item.lancamento}</td>
            <td>
              <button className={styles.view}><i className="fa-solid fa-eye"></i></button>
              <button className={styles.edit}><i className="fa-solid fa-pencil"></i></button>
              <button className={styles.delete}><i className="fa-solid fa-trash"></i></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
