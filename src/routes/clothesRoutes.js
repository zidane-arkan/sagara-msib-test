const express = require("express");
const clothesController = require("../controllers/clothesController");
const router = express.Router();

router.post("/clothes", clothesController.createClothes);
router.get("/clothes", clothesController.getAllClothes);
router.get("/clothes/available", clothesController.getAllAvailableClothes);
router.get("/clothes/search", clothesController.getClothesByCriteria);
router.put("/clothes/:id", clothesController.updateCloth);
router.delete("/clothes/:id", clothesController.deleteCloth);
router.patch("/clothes/:id/stock", clothesController.updateStock);
router.get("/clothes/low-stock", clothesController.getLowStockClothes);
router.get("/clothes/out-of-stock", clothesController.getOutOfStockClothes);

module.exports = router;
