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
      stock: 0,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toMatchSnapshot();

    expect(res2.statusCode).toEqual(201);
    expect(res2.body).toHaveProperty("_id");
    expect(res2.body).toMatchSnapshot();
  });

  it("Seharusnya menunjukkan semua baju yang ada (Baik stok kosong atau tidak)", async () => {
    const res = await request(app).get("/api/clothes");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).toMatchSnapshot();
  });

  it("Seharusnya menunjukkan semua baju yang tersedia", async () => {
    const res = await request(app).get("/api/clothes/available");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).toMatchSnapshot();
  });

  it("Seharusnya mengembalikan baju yang sesuai warna dan ukuran", async () => {
    await request(app).post("/api/clothes").send({
      name: "Kaos Naruto",
      color: "Merah",
      size: "M",
      price: 200000,
      stock: 10,
    });

    const res = await request(app)
      .get("/api/clothes/search")
      .query({ color: "Merah", size: "M" });

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0); // Expect at least one matching item
    expect(res.body).toMatchSnapshot();
  });

  it("Seharusnya melakukan update atribut baju yang dipilih", async () => {
    const createCloth = await request(app).post("/api/clothes").send({
      name: "Kemeja",
      color: "Ungu",
      size: "M",
      price: 50000,
      stock: 11,
    });
    const updateCloth = {
      color: "Hitam",
      size: "L",
      price: 250000,
      stock: 5,
    };
    const res = await request(app)
      .put(`/api/clothes/${createCloth.body._id}`)
      .send(updateCloth);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchSnapshot();
  });

  it("Seharusnya melakukan penambahan stock dari baju yang dipilih", async () => {
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

  it("Seharusnya melakukan pengurangan stock dari baju yang dipilih", async () => {
    const cloth = await request(app).post("/api/clothes").send({
      name: "Kaos",
      color: "Hitam",
      size: "L",
      price: 250000,
      stock: 5,
    });
    const res = await request(app)
      .patch(`/api/clothes/${cloth.body._id}/stock`)
      .send({ amount: 3, increase: false });
    expect(res.statusCode).toEqual(200);
    expect(res.body.stock).toEqual(2);
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
