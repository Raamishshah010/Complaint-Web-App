export default interface ComplaintSchema {
  _id: string;
  title: string;
  resource: string;
  isImage: boolean;
  description: string;
  likes: Array<string>;
  reviews: Array<any>;
  likescounter: number;
  userId: any;
  categoryId: any;
}
