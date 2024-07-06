type userSession = {
  id?: number | null;
  email?: string | null;
};

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
}

type Store = {
  id: number;
  name: string;
  userId: number;
}