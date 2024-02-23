const express = require("express");
const router = express();

const {
  AddBus,
  GetAllBuses,
  UpdateBus,
  DeleteBus,
  GetBusById,
  GetBusesByFromAndTo,
} = require("../controllers/busController");
const {isLoggedIn, isAdmin} = require("../middlewares/authMiddleware");

router.post("/add-bus", isLoggedIn, isAdmin, AddBus);
router.get("/get-all-buses", isLoggedIn, isAdmin, GetAllBuses);
router.put("/:id", isLoggedIn, isAdmin, UpdateBus);
router.delete("/:id", isLoggedIn, isAdmin, DeleteBus);
router.get("/:id", isLoggedIn, GetBusById);
router.post("/get", isLoggedIn, GetBusesByFromAndTo);

module.exports = router;
