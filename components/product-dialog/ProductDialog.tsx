import Dialog from "../../common/components/dialog/InformationDialog";
import { Product } from "../types/product.type";

import styles from "./ProductDialog.module.scss";

type Props = {
  productDetails: Product | undefined;
  open: boolean;
  title: string;
  onClose: () => void;
};

const ProductDialog = ({ open, title, productDetails, onClose }: Props) => {
  return (
    <>
      <Dialog open={open} title={title} onClose={onClose}>
        {productDetails ? (
          <div>
            <div className={styles.details}>
              <span className={styles.label}>Name</span>
              <strong>{productDetails.name}</strong>
            </div>
            <div className={styles.details}>
              <span className={styles.label}>Color</span>
              <div>
                <div
                  className={styles.color}
                  style={{ backgroundColor: productDetails.color }}></div>
                <strong> {productDetails.color}</strong>
              </div>
            </div>
            <div className={styles.details}>
              <span className={styles.label}>ID </span>
              <strong>{productDetails.id}</strong>
            </div>
            <div className={styles.details}>
              <span className={styles.label}>Year</span>
              <strong>{productDetails.year}</strong>
            </div>
          </div>
        ) : (
          <span>Błąd!!</span>
        )}
      </Dialog>
    </>
  );
};

export default ProductDialog;
