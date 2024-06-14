interface MongoResult {
  _doc: any;
}

namespace Express {
  interface Request {
    userId: string;
    auth0Id: string;
  }
}


export interface UserSchemaProps extends MongoResult {
  username?: string;
  name?: string;
  addressLine: string;
  city?: string;
  country?: string;
  email?: string;
  password: string;
  avatar?: string;
}
