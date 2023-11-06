import useSWR from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(`/api/products/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }
  console.log("data: ", data);
  let reviewHeadline = "No Review available";
  let reviewTitle = "";
  let reviewText = "";
  let reviewRating = 0;
  if (data.reviews[0]) {
    reviewHeadline = "Review:";
    reviewTitle = `Title: ${data.reviews[0].title}`;
    reviewText = `Text: ${data.reviews[0].text}`;
    reviewRating = `Rating: ${data.reviews[0].rating}`;
  } else {
  }

  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      <div>
        <h2>{reviewHeadline}</h2>
        <p>{reviewTitle}</p>
        <p>{reviewText}</p>
        <p>{reviewRating}</p>
      </div>
      <div>
        {/* {if (!data.review) {<p>No Review available</p>} else (<h2>Review:</h2>
      <p>Title: {data.review.title}</p>
      <p>Text: {data.review.text}</p>
      <p>Rating: {attachClipboardStubToView.review.rating}</p>)} */}
      </div>
      <StyledLink href="/">Back to all</StyledLink>
    </ProductCard>
  );
}
