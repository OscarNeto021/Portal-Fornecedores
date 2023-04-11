// authMiddleware.js

const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "Acesso negado. Token não fornecido." });
  }

  const token = authHeader.split(" ")[1]; // Extrair a segunda parte do cabeçalho, após o "Bearer"

  try {
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token inválido." });
  }
}

module.exports = authMiddleware;
