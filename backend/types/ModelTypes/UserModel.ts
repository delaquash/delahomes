interface MongoResult {
  _doc: any;
}

namespace Express {
  interface Request {
    userId: string;
    auth0Id: string;
  }
}


export interface IUser extends MongoResult {
  isNew: boolean;
  username?: string;
  name?: string;
  address: string;
  city?: string;
  country?: string;
  email?: string;
  password: string;
  avatar?: string;
}
