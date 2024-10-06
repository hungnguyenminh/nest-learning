import express from 'express';

export class ResponseHelper {
  responseSuccess(success: {
    res: express.Response;
    data: any;
    code?: number;
    message: string;
    extra?: any;
    pagination?: any;
  }) {
    const { res, message, code = 200, extra, data, pagination } = success;

    const response: any = {
      meta: {
        status: true,
        message: message,
        extra: extra,
      },
      data: data,
      pagination: pagination,
    };
    return res.status(code).send(response);
  }
  responseErrors(error: {
    res: express.Response;
    code?: number;
    message: string | null;
    data?: any;
  }) {
    const { res, message, code = 400 } = error;
    return res.status(code).send({
      status: false,
      message,
      statusCode: code,
    });
  }
}
