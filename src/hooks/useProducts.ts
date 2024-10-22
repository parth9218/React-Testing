import { faker } from "@faker-js/faker/locale/en";
import { useState } from "react";
import useSWR from "swr";
import { Product } from "../models/product.model";

const LIMIT = 6;
interface Props {
  limit: number;
}

let cache: Product[] = [];
const productsFetcher = async ({
  url,
  limit = LIMIT
}: { url: string, limit: number }) => {
  url = url.split("?")[1];
  await pause(800);
  const nextPage = new Array(limit).fill(0).map(() => {
    return {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      material: faker.commerce.productMaterial(),
      description: faker.commerce.productDescription(),
      color: faker.color.rgb({ prefix: "#", casing: "lower" })
    };
  });
  cache = [...cache, ...nextPage];
  return cache;
};

const useProducts = ({ limit }: Props) => {
  limit = LIMIT;
  const [page, setPage] = useState(0);
  const { isLoading, data } = useSWR(
    { url: `/products/?page=${page}`, limit },
    productsFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      keepPreviousData: true
    }
  );

  return {
    fetchNextPage: () => setPage((p) => p + 1),
    products: data || [],
    isLoading
  };
};

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default useProducts;
