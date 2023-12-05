export interface MyChangeEvent {
  target: {
    id: string;
    value: string;
  };
}

export interface StateProps {
  currentUser: {
    email: string;
    password: string;
    avatar: string;
  } | null;
  error: string | null | undefined;
  loading: boolean;
}
