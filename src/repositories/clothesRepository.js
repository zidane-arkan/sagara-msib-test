const Clothes = require("../models/clothesModel");

/**
 * Repository for managing CRUD clothes data.
 */
class ClothesRepository {
  /**
   * Creates a new cloth.
   *
   * @param {Object} data - The data for the new cloth.
   * @returns {Promise<Object>} A promise that resolves to the created cloth.
   */
  async createCloth(data) {
    return await Clothes.create(data);
  }

  /**
   * Finds clothes based on the provided query.
   *
   * @param {Object} query - The query object used to filter the clothes.
   * @returns {Promise<Array>} - A promise that resolves to an array of clothes matching the query.
   */
  async findClothes(query) {
    return await Clothes.find(query);
  }

  /**
   * Updates clothes based on the provided ID and data.
   *
   * @param {string} id - The ID of the clothes to update.
   * @param {Object} data - The updated data for the clothes.
   * @returns {Promise<Object>} A promise that resolves to the updated clothes.
   */
  async updateClothes(id, data) {
    return await Clothes.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Deletes clothes based on the provided ID.
   *
   * @param {string} id - The ID of the clothes to delete.
   * @returns {Promise<Object>} A promise that resolves to the deleted clothes.
   */
  async deleteClothes(id) {
    return await Clothes.findByIdAndDelete(id);
  }

  /**
   * Increments the stock of clothes based on the provided ID and amount.
   *
   * @param {string} id - The ID of the clothes to increment stock.
   * @param {number} amount - The amount to increment the stock by.
   * @returns {Promise<Object>} A promise that resolves to the updated clothes.
   */
  async incrementStock(id, amount) {
    return await Clothes.findByIdAndUpdate(
      id,
      { $inc: { stock: amount } },
      { new: true }
    );
  }

  /**
   * Decreases the stock of clothes based on the provided ID and amount.
   *
   * @param {string} id - The ID of the clothes to decrease stock.
   * @param {number} amount - The amount to decrease the stock by.
   * @returns {Promise<Object>} A promise that resolves to the updated clothes.
   */
  async decreaseStock(id, amount) {
    return await Clothes.findByIdAndUpdate(
      id,
      { $inc: { stock: -amount } },
      { new: true }
    );
  }
}

module.exports = new ClothesRepository();
