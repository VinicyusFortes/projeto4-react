const BASE_URL = "http://localhost:8080/vanessa-vinicyus-proj3/rest";

export const Service = {
  //AUTH
  //funcao para realizar logout
  async logout(token) {
    try {
      const response = await fetch(`${BASE_URL}/users/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao realizar logout");
      }

      return true; // Retorna true se o logout for bem-sucedido
    } catch (err) {
      throw new Error(err.message);
    }
  },

  //Funcao para realizar o login do user
  async loginUser(username, password) {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        return await response.text();
      } else if (response.status === 403) {
        throw new Error("Conta inativa. Credenciais rejeitadas.");
      } else {
        throw new Error("Credenciais inválidas!");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  //Função para registrar um novo usuário
  async registerUser(userData) {
    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
          password: userData.password,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          photoUrl: userData.photo,
          estado: "ativo",
          admin: userData.userType === "true",
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar usuário");
      }

      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  //USER
  //Funcao para buscar todos os usuários
  async fetchUsers(token) {
    try {
      const response = await fetch(`${BASE_URL}/users/list`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Função para buscar dados do usuário
  async getUserData(username, token) {
    try {
      const response = await fetch(`${BASE_URL}/users/${username}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar dados do usuário");
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  //Funcao para exibir dados de um user qualquer
  async getUserProfile(username, token) {
    try {
    const response = await fetch(`${BASE_URL}/users/${username}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar dados do usuário");
    }

    return await response.json(); 
  } catch (error) {
    throw new Error(error.message); 
  }
  },

  //PRODUTOS
  // Função para criar um novo produto
  async createProduct(username, token, productData) {
    const url = `${BASE_URL}/users/${username}/addProducts`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    };

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Erro ao criar o produto");
      }

      alert("Produto criado com sucesso!");
      window.location.reload();
      return response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Função para buscar todos os produtos
  async fetchAllProducts() {
    try {
      const response = await fetch(`${BASE_URL}/products/all`);
      if (!response.ok) throw new Error("Erro ao buscar produtos");
      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Função para buscar um produto atraves do id
  async fetchProductById(productId) {
    try {
      const response = await fetch(`${BASE_URL}/products/${productId}`);
      if (!response.ok) throw new Error("Erro ao buscar produto");
      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Função para buscar produtos por categoria
  async fetchProductsByCategory(category) {
    try {
      const response = await fetch(`${BASE_URL}/products/category/${category}`);
      if (!response.ok)
        throw new Error("Erro ao buscar produtos por categoria");
      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Função para buscar produtos de um usuário específico
  async fetchProductsByUser(userId, token) {
    try {
      const response = await fetch(`${BASE_URL}/products/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Erro ao buscar produtos por usuário");
      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Função para comprar produto
  async buyProduct(username, productId, token) {
    try {
      const response = await fetch(
        `${BASE_URL}/users/${username}/products/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao comprar o produto");
      }
      return await response.json(); // Produto comprado
    } catch (err) {
      throw new Error(err.message);
    }
  },

  //Funcao para inativar produtos
  async inactivateProduct(sellerId, productId, token) {
    try {
      const response = await fetch(
        `${BASE_URL}/users/${sellerId}/products/${productId}/inactivate`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao inativar o produto");
      }

      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Função para atualizar dados do produto para um usuário normal
  async updateProductByUser(productId, updatedData, token) {
    try {
      const response = await fetch(
        `${BASE_URL}/users/admin/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar o produto");
      }

      const updatedProductResponse = await fetch(
        `${BASE_URL}/users/products/${productId}`
      );

      if (!updatedProductResponse.ok) {
        throw new Error("Erro ao buscar produto atualizado");
      }

      return await updatedProductResponse.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Função para atualizar produtos por um admin
  async updateProductByAdmin(productId, updatedData, token) {
    try {
      const response = await fetch(
        `${BASE_URL}/users/admin/products/updateProductOther/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar o produto");
      }

      const updatedProductResponse = await fetch(
        `${BASE_URL}/users/products/${productId}`
      );

      if (!updatedProductResponse.ok) {
        throw new Error("Erro ao buscar produto atualizado");
      }

      return await updatedProductResponse.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  //Funcao para exibir produtos modificados
  async getModifiedProducts(token) {
  try {
    const response = await fetch(`${BASE_URL}/products/modified`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao obter produtos modificados");
    }

    return await response.json(); 
  } catch (error) {
    throw new Error(error.message); 
  }
},

  //CATEGORIAS
  // Função para buscar categorias
  async fetchCategories() {
    try {
      const response = await fetch(`${BASE_URL}/category/all`);
      if (!response.ok) throw new Error("Erro ao buscar categorias");
      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Função para criar uma nova categoria
  async createCategory(categoryName, token) {
    try {
      const response = await fetch(`${BASE_URL}/category/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome: categoryName }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar categoria");
      }

      return await response.text();
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
