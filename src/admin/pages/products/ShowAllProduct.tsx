import { useEffect, useState } from "react";
import { IGetAllProduct } from "../../interfaces";
import { deleteProduct, getAllProduct } from "../../services/Auth-Service";
// import { useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import Swal from "sweetalert2";

const ShowAllProduct = () => {
  // const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getProduct, setGetProduct] = useState([])
  const [editProduct, setEditProduct] = useState<IGetAllProduct | null>(null)

  console.log("get ->", getProduct);
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleGetAllProduct = () => {
    getAllProduct()
    .then((res) => {
      const fatchData = res?.data.findAllProduct            
      setGetProduct(fatchData)
    })
    .catch((error) => {
      console.log(error);
    })
  }
  
  const updateProductList = () => {
    handleGetAllProduct();
  }

  const handleDeleteProduct = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Your product has been deleted.',
              'success'
            );
            updateProductList(); // Refresh the list after deletion
          })
          .catch((error) => {
            Swal.fire(
              'Error',
              'An error occurred while deleting the product.',
              'error'
            );
            console.log(error);
          });
      }
    });
  }

  const handleEditProduct = (data:IGetAllProduct) => {
    openModal();
    setEditProduct(data);
  }

  useEffect(() => {
    handleGetAllProduct()
    updateProductList()
  }, [])
  
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the product in your account including their name, description, category, stock and price.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <AddProduct isOpen={isModalOpen} onClose={closeModal} updateProductList={updateProductList} editProduct={editProduct} setProduct={setEditProduct}/>
          <button
            onClick={openModal}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Product Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Images
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Prices
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Stock
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getProduct?.map((person:IGetAllProduct,index:number) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {person.prod_name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.description}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <img width="100" src={`http://localhost:4001/${person.images}`} alt="products" /></td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.price}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.category}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.stock}</td>
                    <td className="whitespace-nowrap py-4 pl-3 text-sm font-medium sm:pr-0">
                        <button className="text-indigo-600 hover:text-indigo-900 flex" onClick={() => handleEditProduct(person)}>
                          Edit
                        </button>
                        <button className="text-red-500 hover:text-red-600" onClick={() => handleDeleteProduct(person._id)}>
                          Delete
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowAllProduct