function storeSessionId(sessionId) {
  localStorage.setItem("sessionId", JSON.stringify(sessionId));
}

function getSessionId() {
  const sessionId = JSON.parse(localStorage.getItem("sessionId"));
  return sessionId;
}

function clearSessionId() {
  localStorage.removeItem("sessionId");
}

function storeToken(token) {
  localStorage.setItem("token", JSON.stringify(token));
}

function getToken() {
  const myToken = JSON.parse(localStorage.getItem("token"));
  return myToken;
}

function clearToken() {
  localStorage.removeItem("token");
}

function storeUserID(userId) {
  localStorage.setItem("UserID", JSON.stringify(userId))
}

function getUserID() {
  const userID = JSON.parse(localStorage.getItem("UserID"))
  // console.log(userID);
  return userID
}

function clearUserID() {
  localStorage.removeItem("UserID");
}

const loggedAdmin = () => {
  localStorage.setItem("admin", "isAdmin");
};

const clearAdmin = () => {
  localStorage.removeItem("admin");
};

module.exports = {
  storeSessionId,
  getSessionId, 
  clearSessionId, 
  storeToken, 
  getToken, 
  clearToken,
  storeUserID, 
  getUserID, 
  clearUserID,  
  loggedAdmin, 
  clearAdmin
}