import express from 'express';

export class ResponseHelper {
  responseSuccess(
    res: express.Response,
    data: any,
    code = 200,
    message: string = 'Success',
    extra: any = null,
    pagination?: any,
  ) {
    const response: any = {
      meta: {
        status: true,
        message,
        extra,
      },
      data,
      pagination,
    };
    return res.status(code).send(response);
  }
  responseErrors(error: {
    res: express.Response;
    code?: number;
    message: string | null;
    data?: any;
  }) {
    const { res, message, data, code } = error;
    return res.status(code ?? 400).send({
      meta: {
        status: false,
        message,
      },
      data,
    });
  }
}
