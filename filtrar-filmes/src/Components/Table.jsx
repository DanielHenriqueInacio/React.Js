import React from "react";
import styles from "../../public/css/Table.module.css";
import Modal from "./Modal";
import {
  deleteMovie,
  getMovies,
  registerMovie,
  updateMovie,
} from "../Services/filmesService";
import ReactPaginate from "react-paginate";

const Table = () => {
  const [data, setData] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [modalType, setModalType] = React.useState(null);
  const [previewImage, setPreviewImage] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [selectedGender, setSelectedGender] = React.useState();
  const [selectedLaunching, setSelectedLaunching] = React.useState();
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [filterActive, setFilterActive] = React.useState(false);
  const [selectedTextGenre, setSelectedTextGenre] = React.useState("selecione");
  const [selectedTextLaunching, setSelectedTextLaunching] = React.useState("selecione");
  const [searchMovie, setSearchMovie] = React.useState('');

  const [formData, setFormData] = React.useState({
    nome: "",
    genero: "",
    lancamento: "",
    descricao: "",
    imagem: "",
  });

  const openModal = (item, type) => {
    setSelectedItem(item);
    setModalType(type || "Register");
    setModalOpen(true);
    setFormData(item.id ? { id: item.id } : "");
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalType(null);
    setModalOpen(false);
  };

  React.useEffect(() => {
    const genderRepeat = {};
    for (let movie of data) {
      const catchGender = movie.genero
        .split(",")
        .map((genero) => genero.trim());
      for (let gender of catchGender) {
        if (!genderRepeat[gender]) {
          genderRepeat[gender] = true;
        }
      }
    }
    setSelectedGender(Object.keys(genderRepeat));
  }, [data]);

  React.useEffect(() => {
    const launchingRepeat = {};
    for (let movie of data) {
      const catchlaunching = movie.lancamento;
      launchingRepeat[catchlaunching] = true;
    }
    setSelectedLaunching(Object.keys(launchingRepeat));
  }, [data]);

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

  async function handleRegisterMovie(event) {
    event.preventDefault();
    try {
      if (formData) {
        const newMovie = formData;
        const dataNewMovie = await registerMovie(newMovie);
        setData((prevData) => [...prevData, dataNewMovie]);
        closeModal();
      }
    } catch (error) {
      console.log("Erro ao cadastrar Filme", error);
    }
  }

  async function handleUpdateMovie(event, movieId) {
    event.preventDefault();
    try {
      const updatedMovie = formData;
      const dataUpdate = await updateMovie(updatedMovie.id, updatedMovie);
      const updatedMovies = data.map((movie) =>
        movie.id === movieId ? { ...movie, ...dataUpdate } : movie
      );
      setData(updatedMovies);
      closeModal();
    } catch (error) {
      console.log("Erro ao atualizar Filme", error);
    }
  }

  async function handleDeleteMovie(movieId) {
    try {
      await deleteMovie(movieId);
      const updatedMovie = data.filter((movie) => movie.id !== movieId);
      setData(updatedMovie);

      const totalPages = Math.ceil(updatedMovie.length / itemsPerPage);
      if (currentPage >= totalPages) {
        setCurrentPage(totalPages - 1);
      }
      closeModal();
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

  const itemsPerPage = 10;

  function handlePageChange({ selected }) {
    setCurrentPage(selected);
  }

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData =
    data && data.length > 0 ? data.slice(startIndex, endIndex) : [];

  const currentFilter =
    filteredMovies && filteredMovies.length > 0
      ? filteredMovies.slice(startIndex, endIndex)
      : [];

  const moviesToDisplay = filterActive ? currentFilter : currentData;

  function handleValueGender({ target }) {
    const selectedGenre = target.value;
    setSelectedTextGenre(selectedGenre !== "" ? selectedGenre : "selecione");
    if (!selectedGender.includes(selectedGenre)) {
      setSelectedGender((prevSelected) => [...prevSelected, selectedGenre]);
    }

    if (selectedGenre === "todos") {
      setFilterActive(false);
      setFilteredMovies([]);
    } else {
      if (selectedGenre) {
        setFilterActive(true);
        const moviesByGenre = data.filter((movie) =>
          movie.genero.toLowerCase().includes(selectedGenre.toLowerCase())
        );
        setFilteredMovies(moviesByGenre);
      } else {
        setFilterActive(false);
        setFilteredMovies([]);
      }
    }
  }

  function handleLaunched({ target }) {
    const selectedLaunched = target.value;

    setSelectedTextLaunching(
      selectedLaunched !== "" ? selectedLaunched : "selecione"
    );

    if (!selectedLaunching.includes(selectedLaunched)) {
      setSelectedLaunching((prevSelected) => [
        ...prevSelected,
        selectedLaunched,
      ]);
    }

    if (selectedLaunched === "todos") {
      setFilterActive(false);
      setFilteredMovies([]);
    } else {
      if (selectedLaunched) {
        setFilterActive(true);
        const moviesByLaunched = data.filter((movie) =>
          movie.lancamento
            .toLowerCase()
            .includes(selectedLaunched.toLowerCase())
        );
        setFilteredMovies(moviesByLaunched);
      } else {
        setFilterActive(false);
        setFilteredMovies([]);
      }
    }
  }

  function handleSearchMovie(event) {
    const valueFilterMovie = event.target.value;
    setSearchMovie(valueFilterMovie)    
  }

  function handleKeyEnter(event) {
    if (event.key === "Enter") {
      const filteredMovies = data.filter((movie) =>
        movie.nome.toLowerCase().includes(searchMovie.toLowerCase())
      );
      setFilteredMovies(filteredMovies);
      setFilterActive(true)
    }
  }

  const countPage = filterActive
    ? Math.ceil(filteredMovies.length / itemsPerPage)
    : Math.ceil(data.length / itemsPerPage);
  return (
    <>
      <div className={styles.filtersBtnRegister}>
        <input
          className={styles.btnSearch}
          type="text"
          name="procurar"
          placeholder="Buscar"
          value={searchMovie || ""}
          onChange={handleSearchMovie}
          onKeyDown={handleKeyEnter}
        />

        <select
          name="selectLauched"
          value={selectedLaunching || ""}
          onChange={handleLaunched}
        >
          <option value="">{selectedTextLaunching}</option>
          <option value="todos">Todos</option>
          {selectedLaunching &&
            selectedLaunching.map((launching) => (
              <option key={launching} value={launching}>
                {launching}
              </option>
            ))}
        </select>

        <select
          name="selectGenre"
          value={selectedGender || ""}
          onChange={handleValueGender}
        >
          <option value="">{selectedTextGenre}</option>
          <option value="todos">Todos</option>
          {selectedGender &&
            selectedGender.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
        </select>

        <button id="Register" onClick={openModal}>
          <i className="fa-solid fa-plus"></i> Cadastrar
        </button>
        {modalType === "Register" && (
          <Modal
            key={selectedItem.id}
            id={selectedItem.id}
            isOpen={modalOpen}
            onClose={closeModal}
          >
            <form
              className={styles.formRegister}
              onSubmit={handleRegisterMovie}
            >
              <h1 className={styles.titleModal}>Informaçoes do Filme</h1>
              {previewImage ? (
                <img
                  className={styles.ImgSelected}
                  src={previewImage}
                  alt="Imagem do Filme"
                  onClick={handleImageClick}
                />
              ) : (
                <span
                  className={styles.SelectImg}
                  alt="Imagem do Filme"
                  onClick={handleImageClick}
                >
                  <a>Escolher arquivo</a>
                  <p>Nenhum arquivo escolhido</p>
                </span>
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
                className={styles.inputRegister}
                type="text"
                name="nome"
                defaultValue={selectedItem.nome}
                onChange={handleChange}
                placeholder="Nome do Filme"
              />
              <input
                className={styles.inputRegister}
                type="text"
                name="genero"
                defaultValue={selectedItem.genero}
                onChange={handleChange}
                placeholder="Genero do Filme"
              />
              <input
                className={styles.inputRegister}
                type="text"
                name="lancamento"
                defaultValue={selectedItem.lancamento}
                onChange={handleChange}
                placeholder="Data de lançamento do Filme"
              />
              <div className={styles.elementDiv}>
                <textarea
                  name="descricao"
                  cols="62"
                  rows="5"
                  defaultValue={selectedItem.descricao}
                  onChange={handleChange}
                  placeholder="Descrição do Filme"
                ></textarea>
                <button>Salvar</button>
              </div>
            </form>
          </Modal>
        )}
      </div>
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
          {moviesToDisplay.length > 0 ? (
            moviesToDisplay.map((item) => (
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
                      buttonId={modalType}
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
                      buttonId={modalType}
                    >
                      <form
                        className={styles.formEdit}
                        onSubmit={handleUpdateMovie}
                      >
                        <h1 className={styles.titleModal}>
                          Informaçoes do Filme
                        </h1>
                        {previewImage ? (
                          <img
                            className={styles.modalImgSelect}
                            src={previewImage}
                            alt="Imagem do Filme"
                            onClick={handleImageClick}
                          />
                        ) : (
                          <img
                            className={styles.modalImgSelect}
                            src={selectedItem.imagem}
                            alt="Imagem do Filme"
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
                  <button
                    id="delete"
                    onClick={() => openModal(item, "delete")}
                    className={styles.delete}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  {selectedItem && modalType === "delete" && (
                    <Modal
                      key={selectedItem.id}
                      id={selectedItem.id}
                      isOpen={modalOpen}
                      onClose={closeModal}
                      buttonId={modalType}
                    >
                      <section className={styles.deleteModal}>
                        <h3>Deseja realmente apagar esse registro ?</h3>
                        <div className={styles.divButtons}>
                          <button
                            className={styles.buttonYes}
                            onClick={() => handleDeleteMovie(selectedItem.id)}
                          >
                            Sim, desejo apagar
                          </button>
                          <button
                            className={styles.buttonNo}
                            onClick={closeModal}
                          >
                            Não, cliquei sem querer
                          </button>
                        </div>
                      </section>
                    </Modal>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Filme, Genero ou Lançamento não encontrado</td>
            </tr>
          )}
        </tbody>
      </table>

      <ReactPaginate
        pageCount={countPage}
        onPageChange={handlePageChange}
        previousLabel={"Anterior"}
        nextLabel={"Próximo"}
        breakLabel={"..."}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        pageClassName={styles.pageItem}
        previousClassName={styles.previous}
        nextClassName={styles.next}
        disabledClassName={styles.disabled}
      />
    </>
  );
};

export default Table;
