import FileInterface from "./FileInterface";

interface PaintingInputInterface {
  _id: string;
  imageFile?: FileInterface;
  title: string;
  description: string;
  author: string;
  imageUrl?: string;
}

export default PaintingInputInterface;
