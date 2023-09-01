import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { sortOptions } from "../../../user/hooks/data";
import { IGetAllProduct, IGetFilterName } from "../../interfaces";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { deleteProduct, filterProduct, getAllProduct, productPagination } from "../../services/Auth-Service";
import AddProduct from "./AddProduct";
import Swal from "sweetalert2";
import PaginationDemo from "../../components/PaginationDemo";
import axios from "axios";


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const ShowAllProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setGetProduct] = useState([])
  const [editProduct, setEditProduct] = useState<IGetAllProduct | null>(null)  
  const [items, setItems] = useState<IGetAllProduct[]>([]);
  const [pageCount, setpageCount] = useState(0);
  // console.log("Show All Products items: =>",items);
  
  
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

  const handleFilter = (option:IGetFilterName) => {
    console.log(option);
    filterProduct(option)
    .then((res) =>{
      console.log(res);
      if(res && res.data && res.data.data && res.data.data.length > 0){
        const { data } = res.data;
        setGetProduct(data)
      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Searchable category is empty.',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const limit = 5;

  useEffect(() => {
    const getComments = async () => {
        try {
          const res = await axios.get(`http://localhost:4001/api/v1/search?page=1&limit=${limit}`);
          // console.log(res);
          const data = res?.data.data;
          setItems(data);
          console.log("data =>", data);
          getAllProduct()
          .then((res)=>{
            const total = res?.data.findAllProduct.length
            setpageCount(Math.ceil(total / limit));
            console.log("Get All Product =>",res);
            console.log("Total =>", total); 
            console.log("Math =>",Math.ceil(total / limit));
          })
          setItems(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    };
    getComments();
  }, []);

  const fetchPaginationData = async (currentPage: number) => {
    productPagination(currentPage, limit)
    .then((res) => {
        console.log("RES OF PAGINATION=>",res);
        if(res?.data.data){
            const data = res?.data.data
            console.log("Pagination data: =>",data);
            setItems(data);
        }
    })
    .catch((error) =>{
        console.log("Error =>",error);
    });
  };

  useEffect(() => {
    handleGetAllProduct()
    updateProductList()
  }, [])
  
  
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Product page related text */}
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Products</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the product in your account including their name, description, category, stock and price.
            </p>
          </div>

          {/* Add User Button */}
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none ">
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

      </div>
      {/* Table */}
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
                    {/* Category */}
                    <div className="flex items-center">
                      <Menu as="div" className="relative inline-block text-left">
                        <div className='z-10 flex'>
                          <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                            Categories
                            <ChevronDownIcon
                              className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              {sortOptions.map((option) => (
                                <Menu.Item key={option.name}>
                                  {({ active }) => (
                                    <button
                                      className={classNames(
                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm'
                                      )}
                                      onClick={() => handleFilter(option)}
                                    >
                                      {option.name}
                                    </button>
                                  )}
                                </Menu.Item>
                              ))}
                              <Menu.Item>
                                <button onClick={() => handleGetAllProduct()} className='font-medium text-red-500 hover:text-red-700 hover:bg-gray-100 block px-4 py-2 text-sm'>
                                  Clear all
                                </button>
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>

                      </Menu>
                      <button
                        type="button"
                        className="m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                      >
                        <span className="sr-only">Filters</span>
                        <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Stock
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <span className="sr-only">Edit</span>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items?.map((person:IGetAllProduct,index:number) => (
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

      <div>
        <PaginationDemo fetchPaginationData={fetchPaginationData} pageCount={pageCount} />
      </div>
    </>
  )
}

export default ShowAllProduct