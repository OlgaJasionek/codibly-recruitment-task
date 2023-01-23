import {
  TableFooter,
  TablePagination as Pagination,
  TableRow,
} from "@mui/material";

import TablePaginationActions from "./pagination-actions/Actions";

type Props = {
  totalRows: number;
  page: number;
  perPage: number;
  onPageChange: (value: number) => void;
  onPerPageChange: (value: number) => void;
};

const TablePagination = (props: Props) => {
  const { page, perPage, totalRows, onPageChange, onPerPageChange } = props;

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onPerPageChange(parseInt(event.target.value));
  };

  return (
    <TableFooter>
      <TableRow>
        <Pagination
          rowsPerPageOptions={[5, 10, 15]}
          count={totalRows}
          rowsPerPage={perPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}></Pagination>
      </TableRow>
    </TableFooter>
  );
};

export default TablePagination;
