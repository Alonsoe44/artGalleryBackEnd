import FileInterface from "./FileInterface";

interface PaintingInputInterface {
  _id: String;
  imageFile?: FileInterface;
  title: String;
  description: String;
  author: String;
  imageUrl?: String;
}

export default PaintingInputInterface;
