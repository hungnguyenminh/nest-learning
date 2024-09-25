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
  responseErrors(
    res: express.Response,
    code = 400,
    message: string | null,
    data: any = null,
  ) {
    return res.status(code).send({
      meta: {
        status: false,
        message,
      },
      data,
    });
  }
}
