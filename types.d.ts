declare module 'jsonwebtoken' {
  export function sign(payload: string | object | Buffer, secret: string, options?: any): string;
  export function verify(token: string, secret: string, options?: any): any;
  export function decode(token: string, options?: any): any;
  export const JsonWebTokenError: any;
  export const NotBeforeError: any;
  export const TokenExpiredError: any;
}

declare module 'nodemailer' {
  import { Transporter, TransportOptions, SentMessageInfo } from 'nodemailer';

  export function createTransport(options: TransportOptions): Transporter<SentMessageInfo>;
  export function createTransport(transport: any, defaults?: any): Transporter<SentMessageInfo>;

  export interface Transporter<T = any> {
    sendMail(mailOptions: Mail.Options): Promise<SentMessageInfo>;
    verify(): Promise<boolean>;
    close(): void;
  }

  export namespace Mail {
    interface Options {
      from?: string | Address;
      to?: string | Address | (string | Address)[];
      cc?: string | Address | (string | Address)[];
      bcc?: string | Address | (string | Address)[];
      subject?: string;
      text?: string;
      html?: string;
      attachments?: Attachment[];
      [key: string]: any;
    }

    interface Address {
      name?: string;
      address: string;
    }

    interface Attachment {
      filename?: string;
      content?: string | Buffer | ReadableStream;
      path?: string;
      contentType?: string;
      [key: string]: any;
    }
  }

  export interface SentMessageInfo {
    messageId: string;
    response: string;
    envelope: any;
    accepted: string[];
    rejected: string[];
    pending: string[];
  }
}
