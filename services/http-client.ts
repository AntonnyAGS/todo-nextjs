import axios, { Axios, AxiosError } from "axios";

type FetchMethodOptions = "POST" | "GET" | "DELETE" | "PUT" | "PATCH";

interface HttpFetchOptions<RequestType> {
  body?: RequestType;
}

export const HttpError = AxiosError;
export type HttpError = AxiosError;

export type HttpResponse<ResponseType> = {
  data: ResponseType;
  status: number;
};

export const fetch = async <RequestType, ResponseType>(
  endpoint: string,
  method: FetchMethodOptions,
  { body }: HttpFetchOptions<RequestType>
): Promise<HttpResponse<ResponseType>> => {
  const headers = { "Content-Type": "application/json" };
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
