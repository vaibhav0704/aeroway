declare module "formidable" {
  import { IncomingMessage } from "http";

  type File = {
    filepath: string;
    originalFilename?: string;
    mimetype?: string;
    size?: number;
  };

  type Files = Record<string, File | File[]>;

  type Fields = Record<string, string | string[]>;

  interface Options {
    multiples?: boolean;
    keepExtensions?: boolean;
    uploadDir?: string;
    maxFileSize?: number;
  }

  class IncomingForm {
    constructor(options?: Options);
    parse(
      req: IncomingMessage,
      callback: (err: any, fields: Fields, files: Files) => void
    ): void;
  }

  export default IncomingForm;
  export { IncomingForm, Fields, Files, File, Options };
}
