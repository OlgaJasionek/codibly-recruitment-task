import axios, { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { GetDataResponse } from "../../common/api/api.service";

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
  const { control } = useForm<FiltersValue>();
  const filters = useWatch<FiltersValue>({ control });

  // useEffect(() => {
  //   if (Object.keys(router.query).length > 0) {
  //     getData();
  //   } else {
  //     // router.replace({
  //     //   query: { per_page: 5, page: 1, id: filters?.id },
  //     // });
  //   }
  // }, [router.query]);

  useEffect(() => {
    if (filters.id) {
      onChangeSearchValue(filters.id);
    } else {
      onChangeSearchValue("");
    }
  }, [filters.id]);

  const getData = async () => {
    try {
      const resp = await axios.get<{
        data: Product | Array<Product>;
        total: number;
      }>("https://reqres.in/api/products", {
        params: {
          page: router.query.page,
          per_page: router.query.per_page,
          id: router.query.id,
        },
      });

      setProductsList(
        Array.isArray(resp.data.data) ? resp.data.data : [resp.data.data]
      );

      setTotalRows(resp.data.total ? resp.data.total : 1);
    } catch (err) {
      if ((err as AxiosError).response?.status === 404) {
        setProductsList([]);
      } else {
        setError("Unidentified error occured");
        setOpenSnackbar(true);
      }
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

  const onChangeSearchValue = (id: string) => {
    // router.push({
    //   query: { ...router.query, id },
    // });
  };

  const onChangePage = (page: number) => {
    router.push({
      query: { ...router.query, page: page + 1 },
    });
  };

  const onChangePerPage = (perPage: number) => {
    router.push({
      query: { ...router.query, per_page: perPage },
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
