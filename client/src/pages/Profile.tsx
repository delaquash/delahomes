/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store";
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { StateProps, MyChangeEvent } from "../../types/dataTypes";
import { updateUserFailure,updateUserStart,updateUserSuccess } from "../state/reducers/userSlice";
// import { useMutation } from "react-query";
// import axios from "axios";

export type RootState = {
  user: StateProps;
  // Add other slices if you have more reducers
};

const authTokenHere = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjQ0NzU1ZjliYjAxY2IzMDUwMzQ0MSIsImlhdCI6MTcwMTg1MTg2Nn0.AHqhLVpNZ-HrYP70tIhU_xT2MFEEYr3DkuwCez70qMk; Path=/; HttpOnly";

function Profile() {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fileRef = useRef<any>(null);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const {error,loading } = useSelector((state: RootState) => state.user);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState<{ [key: string]: string }>({})
  console.log(formData);
  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file: File) => {
    /* `const storage = getStorage(app);` is initializing the Firebase Storage service using the
    `getStorage` function and the `app` instance from the Firebase SDK. This allows you to interact
    with the Firebase Storage and perform operations such as uploading and downloading files. */
    const storage = getStorage(app);
    /* The line `const fileName = new Date().getTime() + file.name;` is creating a unique file name for
    the uploaded file. */
    const fileName = new Date().getTime() + file.name;
    /* The line `const storageRef = ref(storage, fileName);` is creating a reference to the file in the
    Firebase Storage. The `ref` function takes two arguments: the storage instance (`storage`) and
    the path to the file (`fileName`). This reference can be used to perform operations on the file,
    such as uploading or downloading it. */
    const storageRef = ref(storage, fileName);
    /* The line `const uploadTask = uploadBytesResumable(storageRef, file)` is initiating the upload of
    the file to Firebase Storage. The `uploadBytesResumable` function takes two arguments: the
    storage reference (`storageRef`) and the file to be uploaded (`file`). It returns an upload task
    object (`uploadTask`) that can be used to monitor the progress of the upload and handle any
    errors that may occur. */
    const uploadTask = uploadBytesResumable(storageRef, file);
    /* The code `uploadTask.on("state_changed", (snapshot) => { ... })` is setting up an event listener
    for the `state_changed` event of the `uploadTask` object. This event is triggered during the
    upload process and provides information about the current state of the upload. */
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      (error): any => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL })
        });
      }
    );
  };

  const handleChange = (e: MyChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // const signMutation = useMutation(
  //   async (formData: { [key: string]: string }) => {
  //     const response = await axios.put(`http://localhost:5000/api/user/update/${currentUser?._id}`, {
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     });
  //     return response.data;
  //   },
  //   {
  //     onSuccess: (data) => {
  //       dispatch(updateUserSuccess(data))
  //     },
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     onError: (error: any) => {
  //       dispatch(updateUserStart());
  //       dispatch(updateUserFailure(error.message))
  //     },
  //   }
  // )

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     await signMutation.mutateAsync(formData)
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`http://localhost:5000/api/user/update/${currentUser?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokenHere}`
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex-col flex gap-4" onSubmit={handleSubmit}>
        <input
          onChange={fileChange}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          src={formData.avatar || currentUser?.avatar}
          onClick={() => fileRef.current.onClick()}
          alt="Profile_Picture"
          className="rouded-full object-cover cursor-pointer h-24 w-24 self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error in Image Upload(Image must be less than 2MB)</span>
          ) : filePercentage < 0 && filePercentage > 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercentage}%`}</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">Image Uploaded Successfully.</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          defaultValue={currentUser?.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          defaultValue={currentUser?.password}
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Update..."}
        </button>
      </form>
      <div className="flex mt-5 justify-between">
        <span className="cursor-pointer text-red-700">Delete Account</span>
        <span className="cursor-pointer text-red-700">Sign Out</span>
      </div>
      <p className="mt-5 text-red-700">{ error ? "Error.." : ""}</p>
      <p className="mt-5 text-green-700">{ updateSuccess ? "User updated successfully" : ""}</p>
    </div>
  );
}

export default Profile;


