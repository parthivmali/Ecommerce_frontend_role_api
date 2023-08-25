export interface IGetAllProduct {
    images: string;
    _id: string;
    prod_name: string;
    description: string;
    price: number;
    category: string;
    stock: number

}

export interface IAddProduct {
    prod_name: string;
    description: string;
    price: number;
    images: string;
    category: string;
    stock: number
}

export interface IUpdateProduct {
    prod_name: string;
    description: string;
    price: number;
    category: string;
    stock: number
}

export interface IOpenClose {
    isOpen: boolean;
    onClose: () => void;
    updateProductList: () => void;
    editProduct: IGetAllProduct | null
}