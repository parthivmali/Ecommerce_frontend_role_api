export interface IGetAllProduct {
    images: string;
    _id: string;
    prod_name: string;
    description: string;
    price: string;
    category: string;
    stock: string

}

export interface IAddProduct {
    prod_name: string;
    description: string;
    price: string;
    images: string;
    category: string;
    stock: string
}

export interface IUpdateProduct {
    prod_name: string;
    description: string;
    price: string;
    category: string;
    stock: string
}

export interface IOpenClose {
    isOpen: boolean;
    onClose: () => void;
    updateProductList: () => void;
    editProduct: IGetAllProduct | null
    setProduct : React.Dispatch<React.SetStateAction<IGetAllProduct | null>>
}

export interface IGetFilterName {
    name: string;
    current: boolean;
}

export interface IPaginationProps {
    getProduct: IGetAllProduct[] | null;
}

export interface IFetchPaginationData {
    fetchPaginationData: (currentPage: number) => Promise<void>
    , pageCount:number
}