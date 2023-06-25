import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
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
    typeof exceptionResponse === 'object' && (exceptionResponse.status = exception.getStatus());

    // 异常日志
    Logger.log(
      JSON.stringify(exceptionResponse),
      `${request.method} - ${request.url} - ${JSON.stringify(request.body)} - ${dayjs().format(
        'YYYY-MM-DD HH:mm:ss:SSS',
      )}`,
    );

    // 返回信息
    let MESSAGE = `请求失败: ${
      exceptionResponse.status >= 500 ? '服务器错误(Service Error)' : '客户端错误(Client Error) - '
    }${exceptionResponse.message ?? exceptionResponse}`;
    exceptionResponse.status === 401 && (MESSAGE += ' - 没有权限访问资源');
    const errorResponse = {
      code: -1,
      message: MESSAGE,
      timestamp: Date.now(),
      url: request.originalUrl,
      data: exception.getResponse(),
    };
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
