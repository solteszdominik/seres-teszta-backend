export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  price: number;
  package_size: string;
  is_featured: boolean;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}
