"use client"
import React, { useEffect, useState } from 'react';
import { useTheme } from "next-themes";
import { Box, Button, Modal } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid"
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from "react-icons/fi"
import { useGetCoursesQuery,useDeleteCoursesMutation } from '@/redux/features/course/coursesApi';
import Loader from '../../Loader/Loader';
import { format } from "timeago.js"
import { styles } from '@/app/styles/style';
import toast from 'react-hot-toast';
import Link from 'next/link';

type Props = {
  isTeam: boolean
}

const AllCourses = ({isTeam}: Props) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const { isLoading, data, refetch } = useGetCoursesQuery({}, {refetchOnMountOrArgChange: true})
  const [deleteCourse, {isSuccess, error  }] = useDeleteCoursesMutation({});

  useEffect(()=> {
    if(isSuccess){
      setOpen(false)
      refetch()
      toast.success("User role updated successfully...")
  }

  if(error) {
    if("data" in error){
      const errorMessage = error as any
      toast.error(errorMessage.data.message)
    }
  }
  }, [isSuccess, error]);


  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id)
  }

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
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <FiEdit2
                className='dark:text-white text-black'
                size={20}
              />
            </Link>
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
          <Button
               onClick={()=> {
                setOpen(!open)
                setCourseId(params.row.id)
            }}
          >
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
        
        {open && ( 
            <Modal
                open={open}
                onClose={()=>setOpen(!open)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-[50%] left-[50%] -translate-x-1/2">
                    <h1 className={`${styles.title}`}>
                        Are you sure you want to delete this course?
                    </h1>
                    <div className="flex w-full items-center justify-between mb-6 mt-6">
                        <div className={`${styles.button} !w-[120px] mr-5   dark:bg-[#57c7a3] dark:border dark:border-[#ffffff6c] !h-[30px]`}
                        onClick={()=> setOpen(!open)}
                        >
                            Cancel
                        </div>
                        <div
                            className={`${styles.button} !w-[120px] mr-5   dark:bg-[#c75757] dark:border dark:border-[#ffffff6c] !h-[30px]`}
                            onClick={handleDelete}
                        >

                        </div>
                    </div>
                </Box>
            </Modal>
        )}
      </Box>
      )}
    </div>
  )
}

export default AllCourses