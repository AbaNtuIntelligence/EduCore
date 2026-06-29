declare module 'jsonwebtoken' {
  export function sign(payload: string | object | Buffer, secret: string, options?: any): string;
  export function verify(token: string, secret: string, options?: any): any;
  export function decode(token: string, options?: any): any;
  export const JsonWebTokenError: any;
  export const NotBeforeError: any;
  export const TokenExpiredError: any;
}
