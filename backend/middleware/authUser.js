import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id; // ✅ matches token signing

    next();
  } catch (error) {
    console.error("❌ Auth error:", error.message);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
