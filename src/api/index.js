import axios from 'axios';
const BASE = `http://localhost:5000/`

export const clearToken = () => {
  localStorage.removeItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const loggedAdmin = () => {
  localStorage.setItem("admin", "isAdmin");
};

export const clearAdmin = () => {
  localStorage.removeItem("admin");
};

export async function getProducts() {
  try {
    const { data } = await axios.get(`${BASE}api/products`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  try { 
    const token = getToken()
    console.log("users", token);
    const { data } = await axios.get(`${BASE}api/Admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data, "Hello");
    
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateProductQuantity(product_id, quantity, token) {
  try {
    const { data } = await axios.patch(
      `${BASE}api/cart/${product_id}`,
      { quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error updating quantity");
  }
}

export async function createProduct(name, description, price, image_url, type) {
  try {
    const { data } = await axios.post(`${BASE}api/products`, {
      name,
      description,
      price,
      image_url,
      type,
    });
    alert("Product successfully added");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(product_id, fields, token) {
  try {
    const updatedProduct = await axios.patch(
      `${BASE}api/products/${product_id}`,
      fields,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Product has been updated!");
    return updatedProduct;
  } catch (error) {
    console.error(error);
  }
}

// REGISTER A USER

export async function registerUser(username, password) {
  try {
    const {data} = await axios
      .post(`${BASE}api/users/register`, {
        username,
        password,
      })
      
    return data;
  } catch (error) {
    throw error;
  }
}

// LOGIN USER

export async function loginUser(username, password) {
  try {
    const {data} = await axios
      .post(`${BASE}api/users/login`, {
        username,
        password,
      })
      console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
}

// LOG OUT

export async function logOut() {
  const token = getToken();
  return token ? localStorage.removeItem("token") : "";
}

// cart functions

export async function getCurrentSessionCartItems() {
  try {
    const { data } = await axios.get(`${BASE}api/cart`);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function addItemToCart(sessionId, albumId, price, quantity, token) {
  if (getToken() !== token) {
    return {
      message: 'You do not have authority to add to this cart!'
    }
  }
  try {
    const { data } = await axios.patch(`${BASE}api/cart/${ sessionId }`, {
      sessionId,
      albumId,
      price,
      quantity,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateItemQuantity(cartItemID, quantity) {
  try {
    const {data} = await axios.post(`${BASE}api/cart/${ cartItemID }`, {quantity});

    return data;
  } catch(err){
    console.log(err);
  }
}

export async function deleteCartItem(cartItemID) {
  try {
    const {data} = await axios.delete(`${BASE}api/cart/${ cartItemID }`)
    return data;
  } catch(err){
    console.log(err);
  }
}
