// Layer for Clothes Business Logic

const clothesRepository = require("../repositories/clothesRepository");

class ClothesService {
  async createClothes(data) {
    return await clothesRepository.createClothes(data);
  }

  async getAllClothes() {
    return await clothesRepository.findClothes({});
  }

  async getAllAvailableClothes() {
    return await clothesRepository.findClothes({ stock: { $gt: 0 } });
  }

  async getClothesByCriteria(color, size) {
    return await clothesRepository.findClothes({ color, size });
  }

  async updateCloth(id, data) {
    return await clothesRepository.updateClothes({ id, data });
  }

  async deleteCloth(id) {
    return await clothesRepository.deleteClothes(id);
  }

  async increaseStock(id, amount) {
    return await clothesRepository.incrementStock(id, amount);
  }

  async reduceStock(id, amount) {
    const cloth = clothesRepository.findClothes({ _id: id });

    if (cloth[0].stock === 0) {
      throw new Error("Cannot reduce amount bellow 0");
    }

    return await clothesRepository.decreaseStock(id, amount);
  }

  async getLowStockClothes() {
    return await clothesRepository.findClothes({ stock: { $lt: 5 } });
  }

  async getOutOfStockClothes() {
    return await clothesRepository.findClothes({ stock: 0 });
  }
}

module.exports = new ClothesService();
