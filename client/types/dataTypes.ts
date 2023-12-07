export interface MyChangeEvent {
  target: {
    id: string;
    value: string;
  };
}

export interface StateProps {
  currentUser: {
    _id?: string;
    email: string;
    password: string;
    avatar: string;
  } | null;
  error: string | null | undefined;
  loading: boolean;
}

export interface ListDataProps {
  name: string;
  description: string;
  address: string;
  regularPrice: number;
  discountPrice: number;
  bathrooms: number;
  bedrooms: number;
  furnished: boolean;
  parking: boolean;
  type: string;
  offer: boolean;
  imageUrls: string[];
  useRef?: string;
}
