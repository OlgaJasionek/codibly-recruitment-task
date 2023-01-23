import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
  getProducts,
  GetProductsParams,
  GetProductsResponse,
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

const MainComponent = ({ data }: { data: GetProductsResponse }) => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>(data.data);
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
      getData();
    }
  }, [router.query]);

  useEffect(() => {
    if (!isFirstRun.current) {
      onChangeSearchValue();
    }
  }, [filters]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
  });

  const getData = async () => {
    try {
      const resp = await getProducts(router.query as GetProductsParams);

      setProducts(resp.data);
      setTotalRows(resp.total);
    } catch (err) {
      setError(err as string);
      setOpenErrorSnackbar(true);
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
    setOpenErrorSnackbar(false);
  };

  const onChangeSearchValue = () => {
    router.push({
      query: { ...router.query, id: filters.id, page: 1 },
    });
  };

  const changePageHandler = (page: number) => {
    router.push({
      query: { ...router.query, page: page + 1 },
    });
  };

  const changePerPageHandler = (perPage: number) => {
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
              name='id'
              label='Search product by Id'
              control={control}
            />
          </form>
          {products.length > 0 ? (
            <ProductListTable
              products={products}
              page={+(router.query.page as string) || 1}
              perPage={+(router.query.per_page as string) || 5}
              totalRows={totalRows}
              onOpenProductDialog={openProductDialogHandler}
              onChangePage={changePageHandler}
              onChangePerPage={changePerPageHandler}
            />
          ) : (
            <p className={styles.errorText}>No results found</p>
          )}
        </Card>
      </div>
      <ProductDialog
        productDetails={selectedProduct}
        open={openProductDialog}
        onClose={closeProductDialogHandler}
      />
      <Snackbar
        open={openErrorSnackbar}
        handleClose={closeSnackbarHandler}
        text={error}
        color='error'
      />
    </>
  );
};

export default MainComponent;
