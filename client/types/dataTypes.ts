/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface UserListProps {
  name?: string;
  _id?: string;
  imageUrls: string[];
  description?: string;
  address?: string;
  regularPrice: number;
  discountPrice: number;
  bathrooms?: number;
  bedrooms?: number;
  furnished?: boolean;
  parking?: boolean;
  type?: string;
  offer?: boolean;
}

export interface listProps {
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
  userRef: any;
}
