import dbConnect from "@/db/connect";
import Product from "@/db/models/Product";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  // GET request:
  if (request.method === "GET") {
    const product = await Product.findById(id).populate("reviews");
    if (!product) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(product);
  }
  // PUT request
  const updatedProduct = request.body;
  if (request.method === "PUT") {
    const product = await Product.findByIdAndUpdate(id, updatedProduct);
    if (!product) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json({ status: `Product ${id} updated!` });
    // If successful, you'll receive an OK status code.
  }
}
