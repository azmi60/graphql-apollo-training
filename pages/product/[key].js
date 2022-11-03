import { gql, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCartToken } from "../../src/useCartToken";

export const GET_PRODUCT_DETAIL = gql`
  query GetDetailProduct($filter: ProductAttributeFilterInput) {
    products(filter: $filter) {
      items {
        name
        sku
        description {
          html
        }
        price_range {
          minimum_price {
            final_price {
              currency
              value
            }
          }
        }
        image {
          url
        }
      }
    }
  }
`;

export default function ProductPage() {
  const router = useRouter();
  const key = router.query.key;

  const { loading, error, data } = useQuery(GET_PRODUCT_DETAIL, {
    variables: {
      filter: {
        url_key: { eq: key },
      },
    },
  });

  if (loading) return <h2>Loading...</h2>;
  if (error) return `Error! ${error.message}`;

  const {
    name,
    sku,
    description: { html: desc },
    price_range: {
      minimum_price: {
        final_price: { currency, value: price },
      },
    },
    image: { url: imgSrc },
  } = data.products.items[0];

  return (
    <>
      <article style={{ display: "flex", gap: "6rem" }}>
        <Image src={imgSrc} width={400} height={400} alt={name} />
        <div>
          <h2>{name}</h2>
          <h3>
            {currency} {price}
          </h3>
          <div dangerouslySetInnerHTML={{ __html: desc }} />
          <br />
          <AddToCartButton sku={sku} />
        </div>
      </article>
    </>
  );
}

const ADD_PRODUCT_TO_CART = gql`
  mutation AddProductToCart(
    $cartId: String!
    $sku: String!
    $quantity: Float!
  ) {
    addSimpleProductsToCart(
      input: {
        cart_id: $cartId
        cart_items: { data: { sku: $sku, quantity: $quantity } }
      }
    ) {
      cart {
        id
      }
    }
  }
`;

function AddToCartButton({ sku }) {
  const [addToCart, { loading }] = useMutation(ADD_PRODUCT_TO_CART);
  const getCartToken = useCartToken();

  const handleClick = async () => {
    const cartId = await getCartToken();
    addToCart({
      variables: { cartId, sku, quantity: 1 },
    });
  };

  return (
    <button disabled={loading} onClick={handleClick}>
      Add to cart
    </button>
  );
}
