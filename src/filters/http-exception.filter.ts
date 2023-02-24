import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import dayjs from 'dayjs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // 异常信息
    const exceptionResponse: any = exception.getResponse();
    delete exceptionResponse.statusCode;
    typeof exceptionResponse === 'object' &&
      (exceptionResponse.status = exception.getStatus());

    // 异常日志
    Logger.log(
      JSON.stringify(exceptionResponse),
      `${request.method} - ${request.url} - ${dayjs().format(
        'YYYY-MM-DD HH:mm:ss:SSS',
      )}`,
    );

    // 返回信息
    const errorResponse = {
      code: -1,
      message: '请求失败',
      timestamp: Date.now(),
      url: request.originalUrl,
      data: exception.getResponse(),
    };
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
