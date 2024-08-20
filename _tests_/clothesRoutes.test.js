const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/server"); // Adjust the path if needed
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Clothes API", () => {
  it("should create a new clothing item", async () => {
    const res = await request(app).post("/api/clothes").send({
      name: "T-Shirt",
      color: "Blue",
      size: "M",
      price: 19.99,
      stock: 10,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
  });

  it("should get all available clothes", async () => {
    const res = await request(app).get("/api/clothes/available");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should update the stock of a clothing item", async () => {
    const cloth = await request(app).post("/api/clothes").send({
      name: "Jeans",
      color: "Black",
      size: "L",
      price: 49.99,
      stock: 5,
    });
    const res = await request(app)
      .patch(`/api/clothes/${cloth.body._id}/stock`)
      .send({ amount: 5, increase: true });
    expect(res.statusCode).toEqual(200);
    expect(res.body.stock).toEqual(10);
  });

  it("should delete a clothing item", async () => {
    const cloth = await request(app).post("/api/clothes").send({
      name: "Hoodie",
      color: "Gray",
      size: "XL",
      price: 39.99,
      stock: 3,
    });
    const res = await request(app).delete(`/api/clothes/${cloth.body._id}`);
    expect(res.statusCode).toEqual(200);
  });
});
