import { ApiError, fetcher } from "../config";
import { QueryFunction, UseQueryOptions, useQuery } from "@tanstack/react-query";

type BannerT = {
  product_barcode: number;
  image_url: string;
  product_name:string;
};

type QueryKey = ["banners"];

const getBanners: QueryFunction<BannerT[], QueryKey> = async () => {
  const { data: dataRes } = await fetcher.get<BannerT[]>(`/stores/list-banner/`);
  return dataRes;
};

export const useBanners = (
  options?: UseQueryOptions<BannerT[], ApiError, BannerT[], QueryKey>
) => {
  return useQuery(["banners"], getBanners, options);
};
