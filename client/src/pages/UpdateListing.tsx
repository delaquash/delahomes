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
  return (
    <div>UpdateListing</div>
  )
}

export default UpdateListing