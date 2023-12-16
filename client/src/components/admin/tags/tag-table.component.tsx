"use client"
import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { getTagsList } from '@/src/api/tags/tags';

const columns: GridColDef[] = [
  { field: 'tagName', headerName: 'Name', width: 220 },
  { field: 'tagDescription', headerName: 'Description', width: 220 },
  { field: 'tagSlug', headerName: 'Slug', width: 220 },
];

const rows = [
  { id: 1, name: 'Snow', description: 'Jon', slug: 35 },
  { id: 2, name: 'Lannister', description: 'Cersei', slug: 42 },
  { id: 3, name: 'Lannister', description: 'Jaime', slug: 45 },
  { id: 4, name: 'Stark', description: 'Arya', slug: 16 },
  { id: 5, name: 'Targaryen', description: 'Daenerys', slug: 53 },
  { id: 6, name: 'Melisandre', description: "Batman", slug: 150 },
  { id: 7, name: 'Clifford', description: 'Ferrara', slug: 44 },
  { id: 8, name: 'Frances', description: 'Rossini', slug: 36 },
  { id: 9, name: 'Roxie', description: 'Harvey', slug: 65 },
  { id: 1, name: 'Snow', description: 'Jon', slug: 35 },
  { id: 2, name: 'Lannister', description: 'Cersei', slug: 42 },
  { id: 3, name: 'Lannister', description: 'Jaime', slug: 45 },
  { id: 4, name: 'Stark', description: 'Arya', slug: 16 },
  { id: 5, name: 'Targaryen', description: 'Daenerys', slug: 53 },
  { id: 6, name: 'Melisandre', description: "Batman", slug: 150 },
  { id: 7, name: 'Clifford', description: 'Ferrara', slug: 44 },
  { id: 8, name: 'Frances', description: 'Rossini', slug: 36 },
  { id: 9, name: 'Roxie', description: 'Harvey', slug: 65 },
  { id: 1, name: 'Snow', description: 'Jon', slug: 35 },
  { id: 2, name: 'Lannister', description: 'Cersei', slug: 42 },
  { id: 3, name: 'Lannister', description: 'Jaime', slug: 45 },
  { id: 4, name: 'Stark', description: 'Arya', slug: 16 },
  { id: 5, name: 'Targaryen', description: 'Daenerys', slug: 53 },
  { id: 6, name: 'Melisandre', description: "Batman", slug: 150 },
  { id: 7, name: 'Clifford', description: 'Ferrara', slug: 44 },
  { id: 8, name: 'Frances', description: 'Rossini', slug: 36 },
  { id: 9, name: 'Roxie', description: 'Harvey', slug: 65 },
  { id: 1, name: 'Snow', description: 'Jon', slug: 35 },
  { id: 2, name: 'Lannister', description: 'Cersei', slug: 42 },
  { id: 3, name: 'Lannister', description: 'Jaime', slug: 45 },
  { id: 4, name: 'Stark', description: 'Arya', slug: 16 },
  { id: 5, name: 'Targaryen', description: 'Daenerys', slug: 53 },
  { id: 6, name: 'Melisandre', description: "Batman", slug: 150 },
  { id: 7, name: 'Clifford', description: 'Ferrara', slug: 44 },
  { id: 8, name: 'Frances', description: 'Rossini', slug: 36 },
  { id: 9, name: 'Roxie', description: 'Harvey', slug: 65 },
];

function D_TagTable() {
  const [rows, setRows] = React.useState([]);
  const { isLoading, isError, data, error } = useQuery('tags', getTagsList)

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
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10,15,20]}
        checkboxSelection
      />
    </div>
  );
}
export default D_TagTable