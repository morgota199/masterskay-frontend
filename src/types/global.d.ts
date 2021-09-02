export declare namespace API {
  export type Response<T> = {
    data: T;
    error?: API.Error;
  };

  export type Status = {
    success: true;
  };

  export type Error = {
    message: string;
    path: string;
    statusCode: number;
    timestamp: number;
  };
}
