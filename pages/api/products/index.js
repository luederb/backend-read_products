// import { products } from "../../../lib/products";
import dbConnect from "@/db/connect";
import Product from "@/db/models/Product";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const producs = await Product.find();
    return response.status(200).json(producs);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
  // return response.status(200).json(products);
}
