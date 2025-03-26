import { useState } from "react";
import "./AddCategoryButton.css";
import { useCategoryStore } from "../../../stores/useCategoryStore";

function AddCategoryButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const createCategory = useCategoryStore((state) => state.createCategory);

  // Função para abrir o modal
  const openModal = () => setIsModalOpen(true);

  // Função para fechar o modal
  const closeModal = () => {
    setCategoryName("");
    setIsModalOpen(false);
  };

  // Função para criar a categoria
  const handleCreateCategory = async () => {
    if (categoryName.trim()) {
      const token = sessionStorage.getItem("token");

      // Chama a função da store para criar a categoria
      const success = await createCategory(categoryName, token);

      if (success) {
        alert(`Nova categoria '${categoryName}' criada`);
        closeModal();
      } else {
        alert("Erro ao criar a categoria!");
      }
    } else {
      alert("Por favor, insira o nome da categoria.");
    }
  };

  return (
    <>
      <button className="add-category-button" onClick={openModal}>
        Add Category
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Adicionar Categoria</h2>
            <input
              type="text"
              placeholder="Nome da categoria"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="modal-input"
            />
            <div className="modal-buttons">
              <button onClick={closeModal} className="cancel-button">
                Cancelar
              </button>
              <button onClick={handleCreateCategory} className="create-button">
                Criar Categoria
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddCategoryButton;
