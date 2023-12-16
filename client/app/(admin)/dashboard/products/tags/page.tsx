import React from 'react'
import D_TagForm from '@/src/components/admin/tags/tag-form.component'
import D_TagTable from '@/src/components/admin/tags/tag-table.component'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import LayoutContainer from '@/src/components/user/layout-container/layout-container.component'
import Grid from '@mui/material/Unstable_Grid2/Grid2'

type Props = {}

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'left',
//   fontSize:theme.spacing(2),
//   color: theme.palette.text.secondary,
//   borderRadius:0,
// }));

const TagsPage = (props: Props) => {
  return (
      <Grid container spacing={2} >
        <Grid xs={12} md={4} maxWidth='86vw'>
            <D_TagForm />
        </Grid>
        <Grid xs={12} md={8} maxWidth='86vw'>
            <D_TagTable />
        </Grid>
      </Grid>
  )
}

export default TagsPage