"use client"
import React from 'react';
import { useTheme } from "next-themes";
import { Box, Button } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid"
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from "react-icons/fi"
import { useGetCoursesQuery } from '@/redux/features/course/coursesApi';
import Loader from '../../Loader/Loader';
import { format } from "timeago.js"

type Props = {}

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const { isLoading, data, error } = useGetCoursesQuery({})
  console.log(data)
  const columns = [
    {field: "id", headerName: "ID", flex:0.5},
    {field: "title", headerName: "Course Title", flex:1},
    {field: "ratings", headerName: "Ratings", flex:0.5},
    {field: "purchased", headerName: "Purchases", flex:0.5},
    
    {field: "created_at", headerName: "Created At", flex:0.5},
    {
      field: "  ", 
      headerName: "Edit", 
      flex: 0.2, 
      renderCell: (params: any)=> {
        return (
          <>
            <Button>
              <FiEdit2
                className='dark:text-white text-black'
                size={20}
              />
            </Button>
          </>
        );
      },
    },
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
  }}
  ];

  const rows: any = []

  {data && data.course.forEach((item:any)=> {
    rows.push({
      id: item._id,
      title: item.name ,
      ratings: item.ratings,
      purchased: item.purchased,
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
              color: theme === "dark" ? "#fff" : "#000"
            }, 
            "& .MuiDataGrid-sortIcon" : {
              color: theme === "dark" ? "#fff" : "#000"
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
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              borderBottom: "none",
              color: theme === "dark" ? "#fff" : "#000"
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0"
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme === "dark"? "#fff" : "#000",
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

export default AllCourses