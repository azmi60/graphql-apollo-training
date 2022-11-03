import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Card({ href, title, imgSrc }) {
  return (
    <Link href={href} className={styles.card}>
      {imgSrc && <Image src={imgSrc} alt={title} width={220} height={220} />}
      <h2>{title}</h2>
    </Link>
  );
}
