"use client"
import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridColDef, GridEventListener, GridRowModes, GridValueGetterParams } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteTag, getTagsList } from '@/src/api/tags/tags';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';



function D_TagTable() {



  // const [rowModesModel, setRowModesModel] = React.useState({});
  const { isLoading, isError, data, error } = useQuery('tags', getTagsList)
  const queryClient = useQueryClient();
  const { mutate:deleteMutate, isLoading:deleteLoading } = useMutation(deleteTag, {
    onSuccess: data => {
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
    console.log("EDIT ITEM IS: ",id)
  }

  const columns: GridColDef[] = [
    { field: 'tagName', headerName: 'Name', width: 200, editable:true },
    { field: 'tagDescription', headerName: 'Description', width: 200, editable:true },
    { field: 'tagSlug', headerName: 'Slug', width: 200 ,editable:true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = data?.mode === GridRowModes.Edit;
  
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              // onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              // onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
  
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
    // console.table(data)
  }



  return (
    <div style={{ maxHeight: 600, width: '100%' }}>
      <DataGrid
        filterMode='client'
        getRowId={(row) => row._id}  
        rows={data}
        editMode="row"
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        processRowUpdate={(updatedRow, originalRow) => {
          console.table("ORIGINAL ROW WAS: ", originalRow)
          console.table("UPDATED ROW IS: ", updatedRow)
        }
        }
        pageSizeOptions={[5, 10,15,20]}
        checkboxSelection
      />
    </div>
  );
}
export default D_TagTable