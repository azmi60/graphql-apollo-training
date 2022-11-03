import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

const GET_PRODUCT_BY_CATEGORY = gql`
  query GetCategoryLists($filters: CategoryFilterInput) {
    categoryList(filters: $filters) {
      name
      products {
        items {
          name
          uid
          short_description {
            html
          }
          url_key
          image {
            url
          }
          price_range {
            minimum_price {
              final_price {
                currency
                value
              }
            }
          }
        }
      }
    }
  }
`;

export default function CategoryPage() {
  const router = useRouter();
  const key = router.query.key;

  const { loading, error, data } = useQuery(GET_PRODUCT_BY_CATEGORY, {
    variables: {
      filters: { url_key: { eq: key } },
    },
  });

  if (loading) return <h2>Loading...</h2>;
  if (error) return `Error! ${error.message}`;

  const products = data.categoryList[0].products.items;
  if (products.length === 0) return <h2>Empty category</h2>;

  return <ProductGrid products={products} />;
}

function ProductGrid({ products }) {
  return (
    <div className={styles.grid}>
      {products.map((props) => {
        const {
          name,
          uid,
          short_description: { html: desc },
          url_key,
          image: { url: imgSrc },
          price_range: {
            minimum_price: {
              final_price: { currency, value: price },
            },
          },
        } = props;

        return (
          <ProductCard
            key={uid}
            {...{ name, desc, imgSrc, currency, price, url_key }}
          />
        );
      })}
    </div>
  );
}

function ProductCard({ name, desc, imgSrc, currency, price, url_key }) {
  return (
    <Link href={`/product/${url_key}`} className={styles.card}>
      {imgSrc && <Image src={imgSrc} alt={name} width={220} height={220} />}
      <h2>{name}</h2>
      <h3>
        {currency} {price}
      </h3>
      {desc}
    </Link>
  );
}
