import { create } from "zustand";
import { Service } from "../Services/Services";


export const useProductStore = create((set) => ({
  products: [],
  selectedProduct: null,

  // Função para definir os produtos
  setProducts: (newProducts) => set({ products: newProducts }),

  //Buscar todos os produtos
  fetchProducts: async () => {
    try {
      const data = await Service.fetchAllProducts();
      // const data = await response.json();
      set({ products: data });
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  },

  // Criar um novo produto
  createProduct: async (username, token, productData) => {
    try {
      const newProduct = await Service.createProduct(
        username,
        token,
        productData
      );
      set((state) => ({
        products: [...state.products, newProduct], // Adiciona o novo produto à lista
      }));
      alert("Produto criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar o produto:", error);
      alert("Erro ao criar produto.");
    }
  },

  // Buscar produtos por categoria
  fetchProductsByCategory: async (category) => {
    try {
      const data = await Service.fetchProductsByCategory(category);
      set({ products: data });
    } catch (error) {
      console.error("Erro ao buscar produtos por categoria:", error);
    }
  },

  // Buscar produtos de um usuário específico
  fetchProductsByUser: async (userId, token) => {
    try {
      const data = await Service.fetchProductsByUser(userId, token);
      set({ products: data });
    } catch (error) {
      console.error("Erro ao buscar produtos do usuário:", error);
    }
  },

  // Buscar um produto específico pelo ID
  fetchProductById: async (productId) => {
    try {
      const data = await Service.fetchProductById(productId);
      set({ selectedProduct: data });
      return data;
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      throw error;
    }
  },

  //Buscar todos os produtos de um user
  fetchUserProducts: async (usernameParam, token) => {
    try {
      const data = await Service.fetchProductsByUser(usernameParam, token);
      if (!data.ok) {
        throw new Error("Erro ao obter produtos");
      }

      const productsData = await data.json();
      set({ products: productsData });
    } catch (error) {
      console.error("Erro ao buscar produtos do usuário:", error.message);
    }
  },

  // Comprar produto
  buyProduct: async (username, productId, token) => {
    try {
      const purchasedProduct = await Service.buyProduct(
        username,
        productId,
        token
      );
      alert("Produto comprado com sucesso!");
      return purchasedProduct; // Pode ser usado para atualizar o estado ou exibir algo na UI
    } catch (error) {
      console.error("Erro ao comprar produto:", error);
      alert("Erro ao comprar produto.");
    }
  },

  // Buscar todos os produtos de um usuário
  fetchUserProducts: async (usernameParam, token) => {
    try {
      const response = await fetch(
        `http://localhost:8080/vanessa-vinicyus-proj3/rest/products/user/${usernameParam}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao obter produtos");
      }

      const productsData = await response.json();
      set({ products: productsData });
    } catch (error) {
      console.error("Erro ao buscar produtos do usuário:", error.message);
    }
  },

  //Inativar produtos
  inactivateProduct: async (sellerId, productId, token, navigate) => {
    try {
      await Service.inactivateProduct(sellerId, productId, token);
      set((state) => ({
        products: state.products.filter((p) => p.id !== productId), // Remove da lista
        selectedProduct: null, // Reseta o produto detalhado
      }));
      alert("Produto apagado com sucesso!");
      navigate("/homePage");
    } catch (error) {
      console.error("Erro ao inativar produto:", error);
      alert("Erro ao apagar produto.");
      throw error;
    }
  },

  //atualizar dados do produto para um user normal
  updateProductByUser: async (productId, updatedData, token) => {
    try {
      const updatedProduct = await Service.updateProductByUser(
        productId,
        updatedData,
        token
      );
      set((state) => ({
        products: state.products.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        ),
        selectedProduct: updatedProduct,
      }));
    } catch (error) {
      console.error("Erro na atualização do produto:", error);
      throw error;
    }
  },

  //atualizar produtos por um admin
  updateProductByAdmin: async (productId, updatedData, token) => {
    try {
      const updatedProduct = await Service.updateProductByAdmin(
        productId,
        updatedData,
        token
      );
      set((state) => ({
        products: state.products.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        ),
        selectedProduct: updatedProduct,
      }));
    } catch (error) {
      console.error("Erro na atualização do produto pelo admin:", error);
      throw error;
    }
  },

  // Exibir produtos modificados
  getModifiedProducts: async (token) => {
   try {
    const modifiedProducts = await Service.getModifiedProducts(token);

    console.log("Produtos modificados recebidos:", modifiedProducts);

    set((state) => ({
      ...state,
      modifiedProducts: modifiedProducts || [], // Garante que não seja undefined
    }));
  } catch (error) {
    console.error("Erro ao obter produtos modificados:", error);
  }
  },

  // Deletar todos os produtos de um usuário
  deleteAllProducts: async (usernameParam, token) => {
    try {
      const success = await Service.deleteAllProducts(usernameParam, token);
      if (success) {
        set({ products: [] }); // Limpa a lista de produtos
        alert("Todos os produtos foram deletados com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao deletar todos os produtos:", error);
      alert("Erro ao deletar todos os produtos.");
    }
  },
}));
