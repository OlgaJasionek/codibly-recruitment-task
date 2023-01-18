import { ReactNode } from "react";

import styles from "./Card.module.scss";

const Card = ({ children }: { children: ReactNode }) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
