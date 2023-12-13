/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { StateProps } from '../../types/dataTypes';


export type RootState = {
  user: StateProps;
  // Add other slices if you have more reducers
};

const UpdateListing = () => {
    const navigate = useNavigate();
    const params = useParams()
    const { currentUser } = useSelector((state: RootState) => state.user);
     const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <div>UpdateListing</div>
  )
}

export default UpdateListing