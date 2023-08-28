import { useFormik } from 'formik';
import { AddProductSchemas } from '../../schemas/AddProductSchemas';
import { FC, useEffect } from 'react';
import { IAddProduct, IOpenClose } from '../../interfaces';
import { addNewProduct, updateProducts } from '../../services/Auth-Service';
import Swal from 'sweetalert2';


const AddProduct:FC<IOpenClose> = ({ isOpen, onClose, updateProductList, editProduct}) => {
  console.log("edited product=>",editProduct);
  
  // const [formData, setFormData] = useState({
  //   prod_name : "",
  //   description : "",
  //   price : 10000,
  //   category: '',
  //   stock: 100
  // })

  useEffect(() => {
    if(editProduct){
      formik.setValues({
        prod_name : editProduct?.prod_name,
        description : editProduct?.description,
        price : editProduct?.price,
        images : editProduct?.images,
        category : editProduct?.category,
        stock: editProduct?.stock
      })
    }
  }, [editProduct])


  
  const formik = useFormik({
        initialValues : {
          prod_name : '',
          description : '',
          price : 1000,
          images: '',
          category: '',
          stock: 10
        },
        validationSchema : AddProductSchemas,
        onSubmit : async (values) => {
            console.log(values);
            const {prod_name, description, price, category, stock} = values;
            try {
              if(editProduct){
                
                const updateProduct = {
                  prod_name,
                  description,
                  price,
                  category,
                  stock,
                }
                await updateProducts(editProduct?._id , updateProduct)
                .then((res)=>{
                  if(res){
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Product update successfully.',
                      showConfirmButton: false,
                      timer: 1000
                    })
                  }
                  updateProductList();
                  formik.resetForm();
                })
                .catch((error)=>{
                  Swal.fire("Error", "An error occurred while updating the product.", "error");
                  console.log(error.message);
                })
                onClose();
              }else{
                const products:IAddProduct = {
                  prod_name,
                  description,
                  price,
                  images: '/images/t-shirt.jpg',
                  category,
                  stock
                }
                addNewProduct(products)
                .then((res) => {
                  console.log(res);
                  if(res){
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Product added successfully.',
                      showConfirmButton: false,
                      timer: 1000
                    })
                  }
                  updateProductList();
                  formik.resetForm();
                })
                .catch((error) => {
                  console.log(error);
                })
                onClose()
              }
            } catch (error) {
              Swal.fire("Error", "An error occurred.", "error");
              console.log(error);
            }
        }
    })

    // This condition is use for handeling open close modal
    if (!isOpen) {
        return null;
    }

  return (
    <div className="fixed flex justify-center items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full" style={{background: 'radial-gradient(#9E9E9E, transparent)'}}>
        <div className="w-full max-w-xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
                <button type="button" onClick={onClose} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-bold text-gray-900">
                      {editProduct ? 'Update Product' : 'Add Product'}
                    </h3>
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="prod_name" className="block mb-2 text-sm font-medium text-gray-900">Product name</label>
                                <input type="text" name="prod_name" id="prod_name" value={formik.values.prod_name} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Apple"/>
                                {formik.errors.prod_name && formik.touched.prod_name ? (<span className='text-red-500'>{formik.errors.prod_name}</span>) : null}
                            </div>
                            
                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <input type="text" name="description" id="description" value={formik.values.description} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Healthy Fruit"/>
                                {formik.errors.description && formik.touched.description ? (<span className='text-red-500'>{formik.errors.description}</span>) : null}
                            </div>

                            <div>
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                                <input type="number" name="price" id="price" value={formik.values.price} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="150"/>
                                {formik.errors.price && formik.touched.price ? (<span className='text-red-500'>{formik.errors.price}</span>) : null}
                            </div>
                            <div>
                                <label htmlFor="images" className="block mb-2 text-sm font-medium text-gray-900">Images</label>
                                <input type="file" name="images" id="images" value={formik.values.images} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                {formik.errors.images && formik.touched.images ? (<span className='text-red-500'>{formik.errors.images}</span>) : null}
                            </div>
                            <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                <input type="text" name="category" id="category" value={formik.values.category} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Fresh Fruites"/>
                                {formik.errors.category && formik.touched.category ? (<span className='text-red-500'>{formik.errors.category}</span>) : null}
                            </div>
                            <div>
                                <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900">Stock</label>
                                <input type="number" name="stock" id="stock" value={formik.values.stock} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="60"/>
                                {formik.errors.stock && formik.touched.stock ? (<span className='text-red-500'>{formik.errors.stock}</span>) : null}
                            </div>
                        </div>
                        <button type="submit" className="w-full text-white bg-gray-600 border-2 hover:bg-white hover:text-gray-600 hover:border-2 hover:border-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        {editProduct ? 'Update Product' : 'Add Product'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default AddProduct