const userSesstionId = new Map();

function setUser(id, user) {
  userSesstionId.set(id, user);
}

function getUser(id) {
 const user =  userSesstionId.get(id);
  return user;
}

module.exports = { setUser, getUser };
