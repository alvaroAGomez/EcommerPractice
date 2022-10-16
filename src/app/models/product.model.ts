export interface Product {
  id: string;
  title: string;
  price: number;
  images: string [];
  description: string;
  category?: Category;
  taxes ?: number
}

export interface Category{
  id: string;
  name: string;
}

//extiendo de la interfaz product y especifico con omit q atributos no me interesan 
export interface createProductDTO extends Omit<Product,'id'|'category'>{
  categoryId: number;
}


//Partial hace q todos los atributos sean opcionales
export interface updateProductDTO extends Partial<createProductDTO>{}