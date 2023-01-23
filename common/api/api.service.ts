import axios, { AxiosError } from "axios";

import { Product } from "../../components/types/product.type";

export type GetProductsParams = {
  page: string;
  per_page: string;
  id?: string;
};

export type GetProductsResponse = {
  data: Product[];
  total: number;
};

export const getProducts = async (
  params: GetProductsParams
): Promise<GetProductsResponse> => {
  try {
    const resp = await axios.get<{
      data: Product | Array<Product>;
      total: number;
    }>("https://reqres.in/api/products", {
      params: {
        ...params,
        page: params.page || 1,
        per_page: params.per_page || 5,
      },
    });

    return {
      data: Array.isArray(resp.data.data) ? resp.data.data : [resp.data.data],
      total: resp.data.total ? resp.data.total : 1,
    };
  } catch (err) {
    if ((err as AxiosError).response?.status === 404) {
      return {
        data: [],
        total: 0,
      };
    } else {
      throw new Error("Unspecified error occured!");
    }
  }
};
