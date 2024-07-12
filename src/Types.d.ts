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
  user_id: number;
}

type Product = {
  id: number;
  user_id: number;
  name: string;
  description: string;
  stock: number;
  picture: string;
  price: number;
}