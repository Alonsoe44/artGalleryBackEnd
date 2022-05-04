interface FileInterface {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => any;
}

export default FileInterface;
