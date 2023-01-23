import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
  getData,
  GetDataParams,
  GetDataResponse,
} from "../../common/api/api.service";
import Card from "../../common/components/card/Card";
import SearchBar from "../../common/components/search-bar/SearchBar";
import Snackbar from "../../common/components/snackbar/Snackbar";
import ProductDialog from "../product-dialog/ProductDialog";
import ProductListTable from "../products-list/ProductsListTable";
import { Product } from "../types/product.type";

import styles from "./Main.module.scss";

type FiltersValue = {
  id: string | undefined;
};

const MainComponent = ({ data }: { data: GetDataResponse }) => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [productsList, setProductsList] = useState<Product[]>(data.data);
  const [openProductDialog, setOpenProductDialog] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [totalRows, setTotalRows] = useState<number>(data.total);
  const { control } = useForm<FiltersValue>({
    defaultValues: { id: router.query.id as string },
  });
  const filters = useWatch<FiltersValue>({ control });
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!isFirstRun.current) {
      getProducts();
    }
  }, [router.query]);

  useEffect(() => {
    if (!isFirstRun.current) {
      onChangeSearchValue();
      console.log("filters changed", filters);
    }
  }, [filters]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
  });

  const getProducts = async () => {
    try {
      const resp = await getData(router.query as GetDataParams);

      setProductsList(resp.data);
      setTotalRows(resp.total);
    } catch (err) {
      setError(err as string);
      setOpenSnackbar(true);
    }
  };

  const openProductDialogHandler = (product: Product) => {
    setOpenProductDialog(true);
    setSelectedProduct(product);
  };

  const closeProductDialogHandler = () => {
    setOpenProductDialog(false);
  };

  const closeSnackbarHandler = () => {
    setOpenSnackbar(false);
  };

  const onChangeSearchValue = () => {
    router.push({
      query: { ...router.query, id: filters.id },
    });
  };

  const onChangePage = (page: number) => {
    router.push({
      query: { ...router.query, page: page + 1 },
    });
  };

  const onChangePerPage = (perPage: number) => {
    router.push({
      query: { ...router.query, per_page: perPage, page: 1 },
    });
  };

  return (
    <>
      <div className={styles.root}>
        <h1>Products List</h1>
        <Card>
          <form>
            <SearchBar
              type='number'
              loading={false}
              name='id'
              label='Search product by Id'
              control={control}
            />
          </form>
          {productsList.length > 0 ? (
            <ProductListTable
              productsList={productsList}
              page={+(router.query.page as string) || 1}
              perPage={+(router.query.per_page as string) || 5}
              totalRows={totalRows}
              onOpen={openProductDialogHandler}
              setPage={onChangePage}
              setPerPage={onChangePerPage}
            />
          ) : (
            <p className={styles.errorText}>No results found</p>
          )}
        </Card>
      </div>
      <ProductDialog
        productDetails={selectedProduct}
        open={openProductDialog}
        title={"Details of product"}
        onClose={closeProductDialogHandler}
      />
      <Snackbar
        open={openSnackbar}
        handleClose={closeSnackbarHandler}
        text={error}
        color='error'
      />
    </>
  );
};

export default MainComponent;
