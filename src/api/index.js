import axios from 'axios';
import { getToken, getSessionId } from '../auth';
const BASE = `https://groovyfinds.herokuapp.com/`
// const BASE = "http://localhost:5000/"

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
    const { data } = await axios.get(`${BASE}api/Admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
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

export async function getCurrentUser(id) {
  try {
    const {data} = await axios.get(`${BASE}api/users/${id}`)
    return data;
  } catch (err) {
    console.log(err);
  }
}

// REGISTER A USER

export async function registerUser(username, password, email) {
  try {
    const {data} = await axios
      .post(`${BASE}api/users/register`, {
        username,
        password,
        email
      })
      console.log(data, "DATA")
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

export async function createNewSession(userId) {
  try {
    const {data} = await axios.post(`${BASE}api/cart/newsession`, {
      userId, 
    })
    return data.newSession;
  } catch (err) {
    console.log(err)
  }
}

export async function getCartItemsByUser(userId) {
  try {
    const {data} = await axios.get(`${BASE}api/cart/${userId}`)
    return data;
  } catch (err) {
    console.log(err)
  }
}

export async function addItemToCart(product, token) {
  const albumId = product.id;
  const price = product.price;
  const image_url = product.image_url;
  const name = product.name;
  const sessionId = getSessionId();

  if (getToken() !== token) {
    return {
      message: 'You do not have authority to add to this cart!'
    }
  }
  try {
    const { data } = await axios.post(`${BASE}api/cart/newItem`, {
      sessionId,
      albumId,
      name, 
      price,
      image_url, 
      quantity: 1
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateItemQuantity(cartItemID, quantity) {
  try {
    const {data} = await axios.patch(`${BASE}api/cart/${ cartItemID }`, {quantity});

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
