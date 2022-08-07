import axios, { Axios, AxiosError } from "axios";
import { getLoggedUser } from "../utils/get-logged-user";

type FetchMethodOptions = "POST" | "GET" | "DELETE" | "PUT" | "PATCH";

interface HttpFetchOptions<RequestType> {
  body?: RequestType;
}

export const HttpError = AxiosError;
export type HttpError = Omit<AxiosError, "response"> & {
  response: Omit<Response, "data"> & { data?: { message: string } };
};

export type HttpResponse<ResponseType> = {
  data: ResponseType;
  status: number;
};

export const fetch = async <RequestType, ResponseType>(
  endpoint: string,
  method: FetchMethodOptions,
  { body }: HttpFetchOptions<RequestType> = {}
): Promise<HttpResponse<ResponseType>> => {
  const session = getLoggedUser();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.token}`,
  };
  const URI = "http://localhost:3000/api/" + endpoint;

  const { data, status } = await axios({
    headers,
    baseURL: URI,
    method,
    data: body,
  });

  return {
    data: data as ResponseType,
    status,
  };
};
