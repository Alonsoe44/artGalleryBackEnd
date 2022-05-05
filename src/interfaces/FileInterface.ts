import { ReadableStream } from "node:stream/web";

interface FileInterface {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: ReadableStream;
}

export default FileInterface;
