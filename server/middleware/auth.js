const { getuser } = require("../service/auth");

async function restrictonlylogin(req, res, next) {
  const id = req.cookies.uid;  
  
  if (!id) {
    return res.status(401).json({ message: "Unauthorized: No user session" });
  }

  const user = await getuser(id);  
  
  if (!user) {
    return res.status(401).json({ message: "Unauthorized: Invalid user" });
  }

  req.user = user; 
  next();
}

module.exports = {
  restrictonlylogin
};
