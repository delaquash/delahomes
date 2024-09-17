import React, { useState } from 'react';
import { useTheme } from "next-themes";
import { Box, Button, Modal } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid"
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import Loader from '../../Loader/Loader';
import { format } from "timeago.js";
import { useGetAllUserQuery, useUpdateUserRoleMutation } from '@/redux/features/user/userApi';
import { styles } from '@/app/styles/style';

type Props = {
    isTeam: boolean
}

const AllTeam = ({ isTeam } :Props) => {
    const { theme, setTheme } = useTheme();
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("admin");
    const { isLoading, data, error } = useGetAllUserQuery({})
    const [active, setActive] = useState(false)
    const [updateUserRole, { isSuccess, error: UpdateUserRoleFail }] =
    useUpdateUserRoleMutation();
  
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
      field: "    ", 
      headerName: "Email", 
      flex: 0.2, 
      renderCell: (params: any)=> {
        return (
          <>
            <a
              href={"mailto:${params.row.email}"}
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

    if (isTeam) {
      const newData =
        data && data.users.filter((item: any) => item.role === "admin");
      {
        newData &&
          newData.forEach((item: any) => {
            rows.push({
              id: item._id,
              name: item.name,
              role: item.role,
              email: item.email,
              course: item.courses.length,
              created_at: format(item.createdAt),
            });
          });
      }
    } else {
      {
        data &&
          data.users.forEach((item: any) => {
            rows.push({
              id: item._id,
              name: item.name,
              role: item.role,
              email: item.email,
              course: item.courses.length,
              created_at: format(item.createdAt),
            });
          });
      }
    }
  
    const handleSubmit = async () => {
      await updateUserRole({ email, role });
    };
   
    return (
      <div className="mt-[120px]">
        {isLoading ? (
          <Loader />
        ) : (
          <Box m="20px">
            {isTeam && (
            <div className="flex w-full justify-end">
              <div className={`${styles.button} !w-[200px] !rounded-[10px] dark:bg-[57c7a3] !h-[35px] dark:border dark:border-[#ffffff6c]`}
                onClick={()=>setActive(!active)}
              >
                Add New Member
              </div>
            </div>
          )}
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
          { active && (
            <Modal
              open={active}
              onClose={() => setActive(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={`${styles.title}`}> Add New Member.....</h1>
                <div className="mt-4">
                  <input
                    type="email"
                    value={email}
                    placeholder="Please enter your email."
                    className={`${styles.input}`}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <select name="" id="" className={`${styles.input}!mt-4`}>
                    <option  value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <br />
                  <div
                    className={`${styles.button} my-6 !h-[30px]`}
                    onClick={handleSubmit}
                  >
                    Submit
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

export default AllTeam