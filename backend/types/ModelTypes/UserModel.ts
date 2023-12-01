interface MongoResult {
  _doc: any;
}

export interface UserSchemaProps extends MongoResult {
  username: string;
  email: string;
  password: string;
  avatar: string;
}
