import { Context } from 'hono';
import { StatusCode } from 'hono/utils/http-status';
import { StatusCodes } from 'http-status-codes';

export type TResponseMeta = {
    page: number;
    limit: number;
    total: number;
};

type TSuccessResponse<T> = {
    statusCode: StatusCodes;
    success?: true;
    message?: string | null;
    meta?: TResponseMeta | null;
    data?: T | null;
};

const sendResponse = <T>(c: Context, data: TSuccessResponse<T>) => {
    const responseData: TSuccessResponse<T> = {
        success: true,
        statusCode: data?.statusCode,
        message: data?.message || 'Operation success',
        meta: data.meta || null || undefined,
        data: data?.data || null || undefined,
    };
    return c.json(responseData, <StatusCode>responseData.statusCode);
};

export default sendResponse;
