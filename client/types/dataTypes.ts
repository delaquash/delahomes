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
