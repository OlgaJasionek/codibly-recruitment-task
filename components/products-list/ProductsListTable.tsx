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
  productsList: Product[];
  page: number;
  perPage: number;
  totalRows: number;
  onOpen: (product: Product) => void;
  setPage: (value: number) => void;
  setPerPage: (value: number) => void;
};

const ProductListTable = ({
  productsList,
  page,
  perPage,
  totalRows,
  onOpen,
  setPage,
  setPerPage,
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
        {productsList.map(product => (
          <TableRow
            className={styles.row}
            key={product.id}
            onClick={() => onOpen(product)}
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
        onPageChange={setPage}
        onPerPageChange={setPerPage}
      />
    </Table>
  );
};

export default ProductListTable;
