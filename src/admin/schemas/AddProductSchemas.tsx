import * as Yup from 'yup';


export const AddProductSchemas = Yup.object({
    prod_name: Yup.string().required('Please enter product name'),
    description : Yup.string().required('Please select description'),
    price : Yup.number().required('Please select a product price'),
    category: Yup.string().required('Please select a category'),
    stock: Yup.number().required('Please select a stock')
})