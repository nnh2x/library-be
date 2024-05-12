export type Books = Book[];

export interface Book {
  id: string;
  created_by: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date;
  name_of_book: string;
  published_year: string;
  borrow_count: number;
  created_at_book: Date;
  updated_at_book: Date;
  author?: string;
  category?: string;
}

export interface Author {
  id: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface Category {
  id: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  name_category: string;
}
