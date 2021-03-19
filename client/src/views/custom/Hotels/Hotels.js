import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Hotels.scss';
import HotelEditForm from './HotelEditForm';
import { getHotels } from '../../../actions/hotelActions';
import HotelCard from './HotelCard';

const Hotels = () => {
  const hotels = useSelector(state => state.hotels.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHotels());
  }, []);

  return (
    <>
      <HotelEditForm />
      {hotels.map(hotel => (
        <HotelCard {...hotel} key={hotel._id} />
      ))}
    </>
  );
};

export default Hotels;
