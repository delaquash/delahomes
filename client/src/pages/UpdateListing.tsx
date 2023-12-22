import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { StateProps, UserListProps } from "../../types/dataTypes";
import axios from "axios";
// import { FaTruckMonster } from "react-icons/fa";
import { useQuery, useMutation } from "react-query";

export type RootState = {
  user: StateProps;
  // Add other slices if you have more reducers
};


const UpdateListing = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<boolean>(false);
  // const [formError, setFormError] = useState(null);
  const [formData, setFormData] = useState<UserListProps>({
    // ... your initial formData state
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const updateListing = async ({ listingId, formData }: { listingId: string | undefined, formData: FormData }) => {
    const res = await fetch(`http://localhost:5000/api/list/update/${listingId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        userRef: currentUser?._id,
      }),
    });
    return res.json();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchListing = async (listingId: string | undefined ) => {
  const { data } = await axios.put(`http://localhost:5000/api/list/get-list/${listingId}`);
  return data;
};
  const queryKey = ['listing', params.listingId];

  const { data: formDataQuery, isLoading, isError, error } = useQuery(queryKey, () => fetchListing(params.listingId));

  const mutation = useMutation((formData: FormData) => updateListing({ listingId: params.listingId, formData }))

  useEffect(() => {
    if (formDataQuery) {
      setFormData(formDataQuery);
    }
  }, [formDataQuery]);

  const storeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload ${progress}%`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((downloadError) => {
              reject(downloadError);
            });
        }
      );
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id
      });
    } else if (e.target.id === "furniture" || e.target.id === "offer" || e.target.id === "parking") {
      setFormData({
        ...formData,
        [e.target.id]: (e.target as HTMLInputElement).checked
      });
    } else {
      // Handle number, text, and textarea inputs
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      });
    }
  };

  const handleImageSubmit = async () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      // setUploading(true);
      // setImageUploadError(false);

      const promises: Promise<string>[] = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      try {
        const urls = await Promise.all(promises);

        setFormData((prevFormData) => {
          const updatedFormData: typeof formData = {
            ...prevFormData,
            imageUrls: [...prevFormData.imageUrls, ...urls],
          };
          return updatedFormData;
        });

        // setImageUploadError(false);
        // setUploading(false);
      } catch (error) {
        console.error("Error uploading images:", error);
        // setImageUploadError(true);
      }
    } else {
      console.log("Error uploading images:", error);
    }
  };

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        throw new Error('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        throw new Error('Discount price must be lower than regular price');

      setLoading(true);

      // Use the mutateAsync function from the mutation object
      const data = await mutation.mutateAsync(formData);

      setLoading(false);

      if (data.success === false) {
        // Handle errors from the server response
        throw new Error(data.message);
      }

      navigate(`/listing/${data._id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Handle errors during the process
      console.error("Error:", error.message);
    }
  }

  const handleRemoveImage = (index: number)=> {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

    return (
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
          Update a Listing
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg"
              id="name"
              maxLength={62}
              minLength={10}
              required
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              placeholder="Description"
              className="border p-3 rounded-lg outline-none"
              id="description"
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg outline-none"
              id="address"
              required
              onChange={handleChange}
              value={formData.address}
            />
            <div className="flex flex-wrap gap-6">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === 'rent'}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span>Parking spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p>Baths</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min="50"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                  {formData.type === 'rent' && (
                    <span className='text-xs'>( / month)</span>
                  )}
                </div>
              </div>
              {formData.offer && (
                <div className='flex items-center gap-2'>
                  <input
                    type='number'
                    id='discountPrice'
                    min='0'
                    max='10000000'
                    required
                    className='p-3 border border-gray-300 rounded-lg'
                      onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className='flex flex-col items-center'>
                    <p>Discounted price</p>
                    {formData.type === 'rent' && (
                      <span className='text-xs'>($ / month)</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col flex-1 gap-4'>
            <p className='font-semibold'>
              Images:
              <span className='font-normal text-gray-600 ml-2'>
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className='flex gap-4'>
              <input
                  onChange={(e) => setFiles(e.target.files)}
                className='p-3 border border-gray-300 rounded w-full'
                type='file'
                id='images'
                accept='image/*'
                multiple
              />
              <button
                type='button'
                disabled={isLoading}
                  onClick={handleImageSubmit}
                className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
              >
                {isLoading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            <p className='text-red-700 text-sm'>
              {imageUploadError && imageUploadError}
            </p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className='flex justify-between p-3 border items-center'
                >
                  <img
                    src={url}
                    alt='listing image'
                    className='w-20 h-20 object-contain rounded-lg'
                  />
                  <button
                    type='button'
                      onClick={() => handleRemoveImage(index)}
                    className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button
              disabled={loading || isLoading}
              className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
              {loading ? 'Updating...' : 'Update listing'}
            </button>
            {isError && <p className='text-red-700 text-sm'>{error instanceof Error ? error.message : 'An error occurred.'}</p>}
          </div>
        </form>
      </main>
    )
  }

export default UpdateListing;











