// Controll the routes request
const clothesService = require("../services/clothesService");

class ClothesController {
  async createClothes(req, res) {
    const clothes = await clothesService.createClothes(req.body);
    res.status(201).json(clothes);
  }

  async getAllClothes(req, res) {
    const clothes = await clothesService.getAllClothes();
    res.status(200).json(clothes);
  }

  async getAllAvailableClothes(req, res) {
    const clothes = await clothesService.getAllAvailableClothes();
    res.status(200).json(clothes);
  }

  async getClothesByCriteria(req, res) {
    const { color, size } = req.query;
    const clothes = await clothesService.getClothesByCriteria(color, size);
    res.status(200).json(clothes);
  }

  async updateCloth(req, res) {
    const clothes = await clothesService.updateCloth(req.body);
    res.status(200).json(clothes);
  }

  async deleteCloth(req, res) {
    const { id } = req.params;
    const clothes = await clothesService.deleteCloth(id);
    res.status(200).json(clothes);
  }

  async updateStock(req, res) {
    const { id } = req.params;
    const { amount } = req.body;

    const clothes = req.body.increase
      ? await clothesService.increaseStock(id, amount)
      : await clothesService.reduceStock(id, amount);

    res.status(200).json(clothes);
  }

  async getLowStockClothes(req, res) {
    const clothes = await clothesService.getLowStockClothes();
    res.status(200).json(clothes);
  }

  async getOutOfStockClothes(req, res) {
    const clothes = await clothesService.getOutOfStockClothes();
    res.status(200).json(clothes);
  }
}

module.export = new ClothesController();
