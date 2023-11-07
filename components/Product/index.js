import useSWR from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";
import { StyledButton } from "../Button/Button.styled";
import ProductForm from "../ProductForm";
import { useState } from "react";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, mutate } = useSWR(`/api/products/${id}`);

  const [isEditMode, setIsEditMode] = useState(true);

  async function handleEditProduct(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      mutate();
    } else {
      console.log(response.status);
    }
  }
  // async function handleDeleteProduct(id) {
  //   const response = await fetch(`api/products/${id}`, {
  //     method: "DELETE",
  //   });
  //   if (response.ok) {
  //     router.push("/");
  //   } else {
  //     console.log(response.status);
  //   }
  // }
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }
  console.log("data: ", data);
  console.log("isEditMode?: ", isEditMode);
  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      <StyledButton type="button" onClick={() => setIsEditMode(!isEditMode)}>
        Edit Fish
      </StyledButton>
      {isEditMode && (
        <ProductForm onSubmit={handleEditProduct}>Edit Fish</ProductForm>
      )}
      {/* <StyledButton type="button" onClick={() => handleDeleteProduct(id)}>
        Delete Fish
      </StyledButton> */}
      {data.reviews.map((review) => {
        return (
          <div key={review._id}>
            <h3>Review:</h3>
            <p>Title: {review.title}</p>
            <p>Text: {review.text}</p>
            <p>Rating: {review.rating}</p>
          </div>
        );
      })}

      <StyledLink href="/">Back to all</StyledLink>
    </ProductCard>
  );
}
