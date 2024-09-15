
"use client"
import React from 'react';
import { useTheme } from "next-themes";
import { Box, Button } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid"
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import Loader from '../../Loader/Loader';
import { format } from "timeago.js"
import { useGetAllUserQuery } from '@/redux/features/user/userApi';


const AllUsers = () => {
  const { theme, setTheme } = useTheme();

  const { isLoading, data, error } = useGetAllUserQuery({})
  console.log(data)

  const columns = [
    {field: "id", headerName: "ID", flex:0.5},
    {field: "name", headerName: "Name", flex:1},
    {field: "email", headerName: "Email", flex:0.5},
    {field: "role", headerName: "Role", flex:0.5},
    {field: "course", headerName: "Purchased Course", flex:0.5},
    {field: "created_at", headerName: "Created At", flex:0.5},
    
  {
    field: " ", 
    headerName: "Delete", 
    flex: 0.2, 
    renderCell: (params: any)=> {
      return (
        <>
          <Button>
            <AiOutlineDelete 
              className='dark:text-white text-black'
              size={20}
            />
          </Button>
        </>
      )
  }},
  {
    field: "  ", 
    headerName: "Email", 
    flex: 0.2, 
    renderCell: (params: any)=> {
      return (
        <>
          <Button>
            <AiOutlineMail 
              className='dark:text-white text-black'
              size={20}
            />
          </Button>
        </>
      )
  }},
  
  ];

  const rows: any = []

  {data && data.users.forEach((item:any)=> {
    rows.push({
      id: item._id,
      name: item.name ,
      role: item.role,
      email: item.email,
      course: item.courses.length,
      created_at: format(item.createdAt)
    })
  })}
  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
        <Box 
          m="40px 0 0 0"
          height="80vh"
          sx={{
            "& .MuiDataGrid-root" : {
              border: "none",
              outline: "none"
            },
            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
              color: theme === "dark" ? "#fff" : "#000",
            }, 
            "& .MuiDataGrid-sortIcon" : {
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-row": {
              color: theme === "dark" ? "#fff" : "#000",
              borderBottom: theme === "dark" ? "1px solid #ffffff30!important" : "1px solid #ccc!important"
            },
            "& .MuiTablePagination-root": {
              color: theme === "dark" ? "#fff" : "#000"
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none"
            },
            "& .name-column-cell": {
              color: theme === "dark" ? "#fff" : "#000"
            },
            "&.MuiDataGrid-columnHeaders": {
              backgroundColor: theme === "dark" ? "#3e4296a6" : "#A4A9FC",
              borderBottom: "none",
              color: theme === "dark" ? "#fff" : "#000"
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0"
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme === "dark" ? "#fff" : "#000",
              borderTop: "none",
              color: theme === "dark" ? "#3e4396" : "#A4A9FC"
            },
            "& .MuiCheckbox-root": {
              color: theme === "dark" ? `#b7ebde !important` :`#000 !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text" : {
              color: `#fff !important`
            }
          }}
        >
          <DataGrid checkboxSelection rows={rows} columns={columns} />
        </Box>
      </Box>
      )}
    </div>
  )
}

export default AllUsers
