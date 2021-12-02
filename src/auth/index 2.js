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

function clearCurrentUser() {
  localStorage.removeItem("token");
}

module.exports = {
  storeSessionId,
  getSessionId, 
  clearSessionId, 
  storeToken, 
  getToken, 
  clearCurrentUser
}