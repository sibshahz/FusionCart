"use client"
import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridColDef, GridEventListener, GridRowModes, GridValueGetterParams } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteTag, getTagsList } from '@/src/api/tags/tags';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { setTags,deleteTagState, enableEditTagMode, setCurrentEditingTag } from '@/src/redux/features/tags/tagSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import { setSnackbar } from '@/src/redux/features/snackbar/snackbar';



function D_TagTable() {


  // const [rowModesModel, setRowModesModel] = React.useState({});
  const dispatch=useDispatch();
  const { isLoading, isError, data, error } = useQuery('tags', getTagsList);
  const queryClient = useQueryClient();
  const tags=useSelector((state:RootState) => state.tags.tags);
  const { mutate:deleteMutate, isLoading:deleteLoading } = useMutation(deleteTag, {
    onSuccess: data => {
    dispatch(deleteTagState(data));
    dispatch(setSnackbar({message:"Tag deleted", severity:"warning",snackbarOpen:true}))
    // dispatch(setUser(data));    
    // router.push('/dashboard')   
  },
    onError: (error) => {
          console.log("there was an error: ",error)
  },
    onSettled: () => {
      
        queryClient.invalidateQueries('tags')
  }
  });

  const handleDeleteClick=(id:string)=>{
    deleteMutate(id);
    console.log("DELETE ITEM IS: ",id)
  }
  
  const handleEditClick=(id:string)=>{
    dispatch(enableEditTagMode(true));
    dispatch(setCurrentEditingTag(id))
  }

  const columns: GridColDef[] = [
    { field: 'tagName', headerName: 'Name', width: 180, editable:true },
    { field: 'tagDescription', headerName: 'Description', width: 260, editable:true },
    { field: 'tagSlug', headerName: 'Slug', width: 100 ,editable:true },
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
  

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: Cannot load tags</span>
  }

  if(data){
    dispatch(setTags(data))
  }



  return (
    <div style={{ maxHeight: 600, width: '100%' }}>
      <DataGrid
        filterMode='client'
        getRowId={(row) => row._id}  
        // rows={data}
        rows={tags}
        // editMode="row"
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10,15,20]}
      />
    </div>
  );
}
export default D_TagTable