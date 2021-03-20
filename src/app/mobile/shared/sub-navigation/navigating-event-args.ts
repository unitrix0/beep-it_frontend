export class NavigatingEventArgs {
  private readonly _path: string;
  private readonly _params: Map<string, any>;

  get params(): Map<string, any> {
    return this._params;
  }

  get path(): string {
    return this._path;
  }

  constructor(path: string, params: Map<string, any>) {
    this._path = path;
    this._params = params;
  }
}
