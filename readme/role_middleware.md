To implement **role-based access control (RBAC)** in your Node.js + Express app where:

* ✅ A user can have **multiple roles**
* ✅ Roles like `"admin"` can **create/update** products
* ❌ Roles like `"customer"` **cannot**

You need to:

---

### ✅ Step 1: Update User Model to Include Roles

```js
// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  roles: [{ type: String, enum: ["admin", "customer", "editor"] }] // e.g., ['admin', 'customer']
});

module.exports = mongoose.model("User", userSchema);
```

---

### ✅ Step 2: Middleware to Check Roles

```js
// middleware/authorizeRole.js

module.exports = function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !user.roles || !Array.isArray(user.roles)) {
      return res.status(403).json({ status: "error", message: "Access denied: no roles assigned." });
    }

    const hasRole = user.roles.some(role => allowedRoles.includes(role));
    if (!hasRole) {
      return res.status(403).json({ status: "error", message: "Access denied: insufficient permissions." });
    }

    next();
  };
};
```

---

### ✅ Step 3: Inject Authenticated `req.user` (Sample)

Assuming you're already verifying JWT and attaching the user:

```js
// middleware/authenticate.js

const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id); // ensure to include roles in token or fetch from DB
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
```

---

### ✅ Step 4: Apply Middleware to Routes

```js
// routes/productRoutes.js

const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorizeRole");

// CREATE product - only admin
router.post("/", authenticate, authorizeRoles("admin"), async (req, res) => {
  // ... same as before
});

// UPDATE product - only admin
router.put("/:id", authenticate, authorizeRoles("admin"), async (req, res) => {
  // ... same as before
});

// READ all and one - public
router.get("/", async (req, res) => {
  // ...
});
router.get("/:id", async (req, res) => {
  // ...
});

// DELETE - only admin
router.delete("/:id", authenticate, authorizeRoles("admin"), async (req, res) => {
  // ...
});
```

---

### ✅ Step 5: Optional – Set Default Role on Signup

```js
// routes/authRoutes.js

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    roles: ["customer"] // default role
  });

  await newUser.save();
  // ...
});
```

---

Let me know if you want role-based UI hints, JWT token enrichment with roles, or a seeder script for role assignment.
