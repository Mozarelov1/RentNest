declare module 'cloudipsp-node-js-sdk' {
  export interface IpspOptions {
    merchantId:  number;
    secretKey:   string;
    apiUrl:      string;
  }

  export default class Ipsp {
    constructor(opts: IpspOptions);
    createCheckout(data: any): Promise<any>;
  }
}
