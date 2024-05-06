import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.MYPRIVATEKEY);

    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
}

export function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (typeof token !== 'undefined') {
    jwt.verify(token.split(' ')[1], process.env.MYPRIVATEKEY, (err, decoded) => {
      if (err) {
        res.status(403).send('Invalid token');
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    res.status(401).send('Unauthorized');
  }
}