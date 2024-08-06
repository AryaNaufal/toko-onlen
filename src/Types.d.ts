type Store = {
  id?: number;
  name: string;
  user_id: string;
  alamat: string
}

type Product = {
  id?: number;
  user_id: string;
  name: string;
  description: string;
  stock: number;
  picture?: string;
  price: number;
}