import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import TablePagination from "../../common/components/table-pagination/TablePagination";
import { Product } from "../types/product.type";

import styles from "./ProductsListTable.module.scss";

type Props = {
  products: Product[];
  page: number;
  perPage: number;
  totalRows: number;
  onOpenProductDialog: (product: Product) => void;
  onChangePage: (value: number) => void;
  onChangePerPage: (value: number) => void;
};

const ProductListTable = ({
  products,
  page,
  perPage,
  totalRows,
  onOpenProductDialog,
  onChangePage,
  onChangePerPage,
}: Props) => {
  return (
    <Table className={styles.table}>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>NAME</TableCell>
          <TableCell>YEAR</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map(product => (
          <TableRow
            className={styles.row}
            key={product.id}
            onClick={() => onOpenProductDialog(product)}
            style={{ backgroundColor: product.color }}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.year}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TablePagination
        page={page - 1}
        perPage={perPage}
        totalRows={totalRows}
        onPageChange={onChangePage}
        onPerPageChange={onChangePerPage}
      />
    </Table>
  );
};

export default ProductListTable;
