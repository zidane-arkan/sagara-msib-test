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
  it("Seharusnya menciptakan baju baru", async () => {
    const res = await request(app).post("/api/clothes").send({
      name: "Kemeja",
      color: "Ungu",
      size: "M",
      price: 50000,
      stock: 11,
    });

    const res2 = await request(app).post("/api/clothes").send({
      name: "Jas Hujan",
      color: "Hitam",
      size: "XL",
      price: 45000,
      stock: 2,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toMatchSnapshot();

    expect(res2.statusCode).toEqual(201);
    expect(res2.body).toHaveProperty("_id");
    expect(res2.body).toMatchSnapshot();
  });

  it("Seharusnya menunjukkan semua baju yang tersedia", async () => {
    const res = await request(app).get("/api/clothes/available");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).toMatchSnapshot();
  });

  it("Seharusnya melakukan menambah stock dari baju yang dipilih", async () => {
    const cloth = await request(app).post("/api/clothes").send({
      name: "Kimono",
      color: "Hitam",
      size: "L",
      price: 250000,
      stock: 5,
    });
    const res = await request(app)
      .patch(`/api/clothes/${cloth.body._id}/stock`)
      .send({ amount: 5, increase: true });
    expect(res.statusCode).toEqual(200);
    expect(res.body.stock).toEqual(10);
    expect(res.body).toMatchSnapshot();
  });

  it("Seharusnya menghapus baju yang dipilih", async () => {
    const cloth = await request(app).post("/api/clothes").send({
      name: "Hoodie",
      color: "Abu-Abu",
      size: "M",
      price: 75600,
      stock: 3,
    });
    const res = await request(app).delete(`/api/clothes/${cloth.body._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchSnapshot();
  });
});
