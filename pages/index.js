import { gql, useQuery } from "@apollo/client";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Swift</a>
      </h1>
      <CategoryGrid />
    </>
  );
}

const GET_CATEGORIES = gql`
  query GetCategoryLists {
    categoryList(filters: {}) {
      name
      uid
      url_key
      image
    }
  }
`;

function CategoryGrid() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <h2>Loading...</h2>;
  if (error) return `Error! ${error.message}`;

  return (
    <div className={styles.grid}>
      {data.categoryList.map(
        ({ uid, name, image, url_key }) =>
          url_key !== null && (
            <Card
              key={uid}
              imgSrc={image}
              href={`/categories/${url_key}`}
              title={name}
            />
          )
      )}
    </div>
  );
}
