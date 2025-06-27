declare module 'libreoffice-convert' {
  interface ConvertOptions {
    format?: string;
    filter?: string;
  }

  function convert(
    buffer: Buffer,
    format: string,
    options?: ConvertOptions,
    callback?: (err: Error | null, result: Buffer) => void
  ): void;

  export = convert;
}