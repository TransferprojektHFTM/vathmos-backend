export class Config {
  public static readonly Port: number = 3000;
  public static readonly GlobalRoutePrefix: string = 'api/v1';
  public static readonly DocsRoute: string = '/docs';
  public static readonly ApiUrl: string = `http://localhost:${Config.Port}/${Config.GlobalRoutePrefix}`;
}
