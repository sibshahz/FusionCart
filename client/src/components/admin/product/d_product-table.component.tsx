"use client"
import { deleteProduct, getProductsList } from '@/src/api/products/products';
import { deleteProductState, enableAddProductMode, enableEditProductMode, setCurrentEditingProduct, setProducts, toggleProductAddDialog, toggleProductEditDialog } from '@/src/redux/features/products/productSlice';
import { GridColDef, GridActionsCellItem, DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { RootState } from '@/src/redux/store';
import { setSnackbar } from '@/src/redux/features/snackbar/snackbar';
import CustomizedSnackbars from '../snackbar/snackbar.component';
import FullScreenDialog from '../dialog/dialog-product-edit.component';
import D_ProductForm from './d_product-form.component';
import { setFilteredImages } from '@/src/redux/features/images/imageSlice';
import ProductAddDialog from '../dialog/dialog-product-add.component';
import ProductEditDialog from '../dialog/dialog-product-edit.component';
import { Button } from '@mui/material';

type Props = {}

const D_ProductTable = (props: Props) => {

  const queryClient = useQueryClient();
  const dispatch=useDispatch();
  const { isLoading, isError, data, error } = useQuery('products', getProductsList);
  
  if(data){
    dispatch(setProducts(data))
  }
  
  const products = useSelector((state:RootState) => state.products.products)

  const { mutate:deleteMutate, isLoading:deleteLoading } = useMutation(deleteProduct, {
    onSuccess: data => {
    dispatch(deleteProductState(data));
    dispatch(setSnackbar({message:"Product deleted", severity:"warning",snackbarOpen:true}))
  },
    onError: (error) => {
          console.log("there was an error: ",error)
  },
    onSettled: () => {
      
        queryClient.invalidateQueries('products')
  }
  });
  const handleDeleteClick=(id:string)=>{
    deleteMutate(id);
  }
  const handleEditClick=(id:string)=>{
    dispatch(toggleProductEditDialog());
    dispatch(setCurrentEditingProduct(id))
    // dispatch(setSelectedImages())
    dispatch(setFilteredImages())
  }
  const handleAddClick=()=>{
    dispatch(toggleProductAddDialog())
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 160, editable:true },
    { field: 'description', headerName: 'Description', width: 240, editable:true },
    { field: 'stock', headerName: 'Stock', width: 80 ,editable:true },
    { field: 'price', headerName: 'Price', width: 80 ,editable:true },
    { field: 'productCategories', headerName: 'Categories', width: 100 ,editable:true },
    { field: 'tags', headerName: 'Tags', width: 100 ,editable:true },
    { field: 'productDate', headerName: 'Date', width: 100 ,editable:true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        // const isInEditMode = data?.mode === GridRowModes.Edit;
  
        // if (isInEditMode) {
        //   return [
        //     <GridActionsCellItem
        //       icon={<SaveIcon />}
        //       label="Save"
        //       sx={{
        //         color: 'primary.main',
        //       }}
        //       // onClick={handleSaveClick(id)}
        //     />,
        //     <GridActionsCellItem
        //       icon={<CancelIcon />}
        //       label="Cancel"
        //       className="textPrimary"
        //       // onClick={handleCancelClick(id)}
        //       color="inherit"
        //     />,
        //   ];
        // }
  
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div>
    <Button onClick={() => handleAddClick()} variant="outlined">Add Product</Button>      
    <DataGrid
        sx={{ 
          marginTop:2
         }}
        filterMode='client'
        getRowId={(row) => row._id}  
        // rows={data}
        rows={products}
        // editMode="row"
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10,15,20]}
        // checkboxSelection
      />
      <ProductAddDialog />
      <ProductEditDialog />
      <CustomizedSnackbars />
    </div>
  )
}

export default D_ProductTable