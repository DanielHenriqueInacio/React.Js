import React from "react";
import styles from "../../public/css/Table.module.css";
import Modal from "./Modal";
import { deleteMovie, getMovies, updateMovie } from "../Services/filmesService";

const Table = () => {
  const [data, setData] = React.useState();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [modalType, setModalType] = React.useState(null);
  const [previewImage, setPreviewImage] = React.useState(null);
  const [formData, setFormData] = React.useState({
    id: null,
    nome: "",
    genero: "",
    lancamento: "",
    descricao: "",
    imagem: "",
  });

  const openModal = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
    setModalOpen(true);
    setFormData({ id: item.id });
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalType(null);
    setModalOpen(false);
  };

  React.useEffect(() => {
    async function handleMovie() {
      try {
        const fetchedMovies = await getMovies();
        setData(fetchedMovies);
      } catch (error) {
        console.log("Erro ao buscar Filmes", error);
      }
    }
    handleMovie();
  }, []);

  async function handleUpdateMovie(event, movieId) {
    event.preventDefault();
    try {
      const updatedMovie = formData;
      const dataUpdate = await updateMovie(updatedMovie.id, updatedMovie);
      const updatedMovies = data.map((movie) =>
        movie.id === movieId ? { ...movie, ...dataUpdate } : movie
      );
      setData(updatedMovies);
      setModalOpen(false)
    } catch (error) {
      console.log("Erro ao atualizar Filme", error);
    }
  }

  async function handleDeleteMovie(movieId) {
    try {
    await deleteMovie(movieId)
    const updatedMovie = data.filter((movie) => movie.id !== movieId);
    setData(updatedMovie)
  } catch (error) {
    console.log("Erro ao apagar Filme", error);
  }
  }

  function handleChange({ target }) {
    const { name, value } = target;
    const image = value.split("\\").pop();
    const nameImage = name === "imagem" ? image : value;
    const formFields = { ...formData, [name]: nameImage };

    if (name === "imagem") {
      handleImageChange(target);
    }
    setFormData(formFields);
  }

  const inputFileRef = React.useRef(null);

  const handleImageClick = () => {
    inputFileRef.current.click();
  };

  const handleImageChange = (target) => {
    const file = target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ({ target }) => {
        const imageUrl = target.result;
        setPreviewImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
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
          {data &&
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.genero}</td>
                <td>{item.lancamento}</td>
                <td>
                  <button
                    id="view"
                    className={styles.view}
                    onClick={() => openModal(item, "view")}
                  >
                    <i className="fa-solid fa-eye"></i>
                  </button>
                  {selectedItem && modalType === "view" && (
                    <Modal
                      key={selectedItem.id}
                      id={selectedItem.id}
                      isOpen={modalOpen}
                      onClose={closeModal}
                    >
                      <h1 className={styles.titleModal}>
                        Informaçoes do Filme
                      </h1>
                      <img
                        className={styles.imgModal}
                        src={selectedItem.imagem}
                        alt={selectedItem.descricao}
                      />
                      <p>{`Nome: ${selectedItem.nome}`}</p>
                      <p>{`Genero: ${selectedItem.genero}`}</p>
                      <p>{`Lançamento: ${selectedItem.lancamento}`}</p>
                      <p>{`Descrição: ${selectedItem.descricao}`}</p>
                    </Modal>
                  )}
                  <button
                    id="edit"
                    className={styles.edit}
                    onClick={() => openModal(item, "edit")}
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                  {selectedItem && modalType === "edit" && (
                    <Modal
                      key={selectedItem.id}
                      id={selectedItem.id}
                      isOpen={modalOpen}
                      onClose={closeModal}
                    >
                      <form
                        className={styles.form}
                        onSubmit={handleUpdateMovie}
                      >
                        <h1 className={styles.titleModal}>
                          Informaçoes do Filme
                        </h1>
                        {previewImage ? (
                          <img
                            className={styles.modalImgSelect}
                            src={previewImage}
                            alt={selectedItem.descricao}
                            onClick={handleImageClick}
                          />
                        ) : (
                          <img
                            className={styles.modalImgSelect}
                            src={selectedItem.imagem}
                            alt={selectedItem.descricao}
                            onClick={handleImageClick}
                          />
                        )}

                        <input
                          type="file"
                          name="imagem"
                          accept="image/*"
                          ref={inputFileRef}
                          style={{ display: "none" }}
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          name="nome"
                          defaultValue={selectedItem.nome}
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          name="genero"
                          defaultValue={selectedItem.genero}
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          name="lancamento"
                          defaultValue={selectedItem.lancamento}
                          onChange={handleChange}
                        />
                        <div className={styles.elementDiv}>
                          <textarea
                            name="descricao"
                            cols="62"
                            rows="5"
                            defaultValue={selectedItem.descricao}
                            onChange={handleChange}
                          ></textarea>
                          <button>Salvar</button>
                        </div>
                      </form>
                    </Modal>
                  )}
                  <button onClick={() => handleDeleteMovie(item.id)} className={styles.delete}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
