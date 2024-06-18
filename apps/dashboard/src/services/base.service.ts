import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { map, Observable, share, tap } from 'rxjs';
import { BuildHttpOptionsService } from './base-http-options.service';


interface IParams {
  options: any;
  path: string;
}

export abstract class BaseService {
  public apiUrl: string = '';

  constructor(
    public httpClient: HttpClient,
    public buildHttpOptionsService: BuildHttpOptionsService,
  ) {

  }

  injectCacheBypass = () => {
    var lastUpdate = Date.now();
    function pipeUpdateLastValue<T>() {
      return tap<T>((data: T) => {
        lastUpdate = Date.now();
      });
    }
    function injectTimestamp(param: any) {
      param = param ?? {};
      param.t = lastUpdate;
      return param;
    }
    const defaultMakeGET = this.makeGET.bind(this);
    this.makeGET = <T>(
      ...params: Parameters<BaseService['makeGET']>
    ): Observable<T> => {
      params[0] = injectTimestamp(params[0]);
      return defaultMakeGET(...params);
    };
    const defaultMakeDELETE = this.makeDELETE.bind(this);
    this.makeDELETE = <T>(
      ...params: Parameters<BaseService['makeDELETE']>
    ): Observable<T> => {
      params[0] = injectTimestamp(params[0]);
      return defaultMakeDELETE<T>(...params).pipe(pipeUpdateLastValue<T>());
    };
    const defaultMakePOST = this.makePOST.bind(this);
    this.makePOST = <T>(
      ...params: Parameters<BaseService['makePOST']>
    ): Observable<T> => {
      params[1] = injectTimestamp(params[1]);
      return defaultMakePOST<T>(...params).pipe(pipeUpdateLastValue<T>());
    };
    const defaultMakePUT = this.makePUT.bind(this);
    this.makePUT = <T>(
      ...params: Parameters<BaseService['makePUT']>
    ): Observable<T> => {
      params[1] = injectTimestamp(params[1]);
      return defaultMakePUT<T>(...params).pipe(pipeUpdateLastValue<T>());
    };
  };

  public makeGET<T>(
    params?: any,
    attrs?: any,
    customPath?: string
  ): Observable<T> {
    const paramsData: IParams = this.createParams(params, attrs, customPath);

    return this.httpClient.get<T>(paramsData.path, paramsData.options).pipe(
      map((res: HttpEvent<T>): T => res as unknown as T),
      share()
    );
  }

  public makePOST<T>(
    body: any,
    params?: any,
    attrs?: any,
    customPath?: string
  ): Observable<T> {
    const paramsData: IParams = this.createParams(params, attrs, customPath);
    return this.httpClient
      .post<T>(paramsData.path, body, paramsData.options)
      .pipe(
        map((res: HttpEvent<T>): T => res as unknown as T),
        share()
      );
  }

  public makePUT<T>(
    body: any,
    params?: any,
    attrs?: any,
    customPath?: string
  ): Observable<T> {
    const paramsData = this.createParams(params, attrs, customPath);

    return this.httpClient
      .put<T>(paramsData.path, body, paramsData.options)
      .pipe(
        map((res: HttpEvent<T>): T => res as unknown as T),
        share()
      );
  }

  public makeDELETE<T>(
    params?: any,
    attrs?: any,
    customPath?: string
  ): Observable<T> {
    const paramsData: IParams = this.createParams(params, attrs, customPath);

    return this.httpClient.delete<T>(paramsData.path, paramsData.options).pipe(
      map((res: HttpEvent<T>): T => res as unknown as T),
      share()
    );
  }

  protected createParams(
    params?: any,
    attrs?: any,
    customPath?: string
  ): IParams {
    let path = customPath ? this.apiUrl + customPath : this.apiUrl;

    let [baseUrl, queryString] = path.split('?');
    let qParams = new HttpParams({ fromString: queryString });

    if (params) {
      Object.getOwnPropertyNames(params).forEach((key) => {
        if (params[key] !== null && params[key] !== undefined) {
          qParams = qParams.set(key, params[key].toString());
        }
      });
    }

    const authHeaders = this.buildHttpOptionsService.buildHttpOptions(true);
    const options = { ...authHeaders, params: qParams };

    if (attrs) {
      for (const [key, value] of Object.entries(attrs)) {
        baseUrl = baseUrl.replace(key, encodeURIComponent(value as string));
      }
    }

    const paramsData: IParams = {
      options: options,
      path: path,
    };

    return paramsData;
  }
}