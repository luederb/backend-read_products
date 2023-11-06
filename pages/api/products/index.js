// import { products } from "../../../lib/products";
import dbConnect from "@/db/connect";
import Product from "@/db/models/Product";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const producs = await Product.find();
    return response.status(200).json(producs);
  } else if (request.method === "POST") {
    try {
      const productData = request.body;
      await Product.create(productData);

      response.status(201).json({ status: "Product created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else return response.status(405).json({ message: "Method not allowed" });
}
