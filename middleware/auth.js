import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }

  jwt.verify(token.split(" ")[1], process.env.MYPRIVATEKEY, (err, decoded) => {
    if (err) {
      res.status(403).send("Invalid token");
    } else {
      req.user = decoded.user;
      next();
    }
  });
}
