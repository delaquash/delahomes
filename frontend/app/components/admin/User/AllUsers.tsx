
"use client"
import React, { useEffect, useState } from 'react';
import { useTheme } from "next-themes";
import { Box, Button, Modal } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid"
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import Loader from '../../Loader/Loader';
import { format } from "timeago.js"
import { useGetAllUserQuery,useUpdateUserRoleMutation,useDeleteUserMutation  } from '@/redux/features/user/userApi';
import toast from 'react-hot-toast';
import { styles } from '@/app/styles/style';


const AllUsers = () => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false)
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false)
  const [updateUserRole, { isSuccess,  error: UpdateUserRoleFail}] = useUpdateUserRoleMutation();
  const [deleteUser, {isSuccess:deleteUserSuccess, error: deleteUserError }] = useDeleteUserMutation()
  const { isLoading, data, refetch } = useGetAllUserQuery({}, {refetchOnMountOrArgChange: true});

  useEffect(()=> {
    if(UpdateUserRoleFail){
        if("data" in UpdateUserRoleFail) {
            const errorMessage = UpdateUserRoleFail as any
            toast.error(errorMessage.data.error)
        }
    }
    if(isSuccess){
        refetch()
        toast.success("User role updated successfully...")
        setActive(false)
    }

    if(deleteUserSuccess){
        toast.success("User deleted successfully...")
        setOpen(false)
    }
    if(deleteUserError){
        if("data" in deleteUserError) {
            const errorMessage = deleteUserError as any
            toast.error(errorMessage.data.error)
        }
    }
    
  }, [isSuccess, UpdateUserRoleFail, deleteUserSuccess, deleteUserError ])

  const handleDelete =() => {
    console.log("Deleting Courses")
  }

  const columns = [
    {field: "id", headerName: "ID", flex: 0.3},
    {field: "name", headerName: "Name", flex: .5},
    {field: "email", headerName: "Email", flex: .5},
    {field: "role", headerName: "Role", flex: 0.5},
    {field: "course", headerName: "Purchased Course", flex: 0.5},
    {field: "created_at", headerName: "Joined At", flex: 0.5},
    
  {
    field: " ", 
    headerName: "Delete", 
    flex: 0.3, 
    renderCell: (params: any)=> {
      return (
        <>
          <Button
            onClick={()=> {
                setOpen(!open)
                setUserId(params.row.id)
            }}
          >
            <AiOutlineDelete 
              className='dark:text-white text-black'
              size={20}
            />
          </Button>
        </>
      )
  }},
  {
    field: "    ", 
    headerName: "Email", 
    flex: 0.2, 
    renderCell: (params: any)=> {
      return (
        <>
          <a
            href={`mailto:${params.row.email}`}
          >
            <AiOutlineMail 
              className='dark:text-white text-black'
              size={20}
            />
          </a>
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
              color: theme === "dark" ? "#000" : "#000"
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
              color: theme === "dark" ? "#3e4396" : "#000"
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0"
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme === "dark" ? "#3e4396" : "#000",
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

export default AllUsers
