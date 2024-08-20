// Controll the routes request
const clothesService = require("../services/clothesService");

class ClothesController {
  async createClothes(req, res) {
    try {
      const clothes = await clothesService.createClothes(req.body);
      res.status(201).json(clothes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllClothes(req, res) {
    try {
      const clothes = await clothesService.getAllClothes();
      res.status(200).json(clothes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllAvailableClothes(req, res) {
    try {
      const clothes = await clothesService.getAllAvailableClothes();
      res.status(200).json(clothes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getClothesByCriteria(req, res) {
    const { color, size } = req.query;
    try {
      const clothes = await clothesService.getClothesByCriteria(color, size);
      res.status(200).json(clothes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCloth(req, res) {
    try {
      const clothes = await clothesService.updateCloth(req.body);
      res.status(200).json(clothes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCloth(req, res) {
    const { id } = req.params;
    try {
      const clothes = await clothesService.deleteCloth(id);
      res.status(200).json(clothes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateStock(req, res) {
    const { id } = req.params; // Ensure `id` is correctly extracted as a string
    const { amount } = req.body; // Ensure `amount` is a number

    try {
      const clothes = req.body.increase
        ? await clothesService.increaseStock(id, amount)
        : await clothesService.reduceStock(id, amount);

      res.status(200).json(clothes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getLowStockClothes(req, res) {
    try {
      const clothes = await clothesService.getLowStockClothes();
      res.status(200).json(clothes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOutOfStockClothes(req, res) {
    try {
      const clothes = await clothesService.getOutOfStockClothes();
      res.status(200).json(clothes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ClothesController();
