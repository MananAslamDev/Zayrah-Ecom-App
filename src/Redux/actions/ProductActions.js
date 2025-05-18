import axios from 'axios';

export const fetchAudioProducts = () => async (dispatch) => {
  dispatch({ type: 'REQUESTED' });
  try {
    const response = await axios.get('https://fakestoreapi.in/api/products/category?type=audio');
    dispatch({ type: 'SUCCESSFUL', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FAILURE', payload: error.message });
  }
};