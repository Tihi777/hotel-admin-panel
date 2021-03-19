import React from 'react';
import { useDispatch } from 'react-redux';
import { CCard, CCardBody, CCardHeader, CCol, CImg, CLink, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { deleteHotel, setActiveHotel } from '../../../actions/hotelActions';
import hotelTemplate from '../../../assets/images/hotelTemplate.png';

const HotelCard = ({ name, address, description, image, score, numberOfRooms, _id }) => {
  const dispatch = useDispatch();

  return (
    <CRow>
      <CCol xs="12">
        <CCard style={{ height: '200px', borderRadius: '20px' }}>
          <div className="hotel-card">
            <CImg
              src={image || hotelTemplate}
              style={{ height: '199px', width: '300px', borderRadius: '20px 0 0 20px' }}
            />
            <div style={{ width: '100%' }}>
              <CCardHeader style={{ borderRadius: '0 20px 0 0' }}>
                <div className="hotel-card__header">
                  <div className="hotel-card__name">{name}</div>
                  <div className="hotel-card__address">{address}</div>
                  <CLink
                    className="card-header-action text-info d-flex align-items-center"
                    onClick={() => dispatch(setActiveHotel({ name, address, description, image, _id }))}
                  >
                    <CIcon name="cil-pencil" />
                  </CLink>
                  <CLink
                    className="card-header-action text-danger d-flex align-items-center"
                    onClick={() => dispatch(deleteHotel(_id))}
                  >
                    <CIcon name="cil-x-circle" />
                  </CLink>
                  <div className="hotel-card__score">
                    Рейтинг: {score} &nbsp;
                    {new Array(Math.floor(score)).fill(undefined).map(() => (
                      <CIcon name="cil-star" className="text-warning" />
                    ))}
                    {score % 1 !== 0 && <CIcon name="cil-star-half" className="text-warning" />}
                  </div>
                </div>
              </CCardHeader>
              <CCardBody className="w-100 h-auto">
                <div className="hotel-card__body">
                  <div className="hotel-card__description">{description}</div>
                  <div className="hotel-card__rooms">Номера: {numberOfRooms}</div>
                </div>
              </CCardBody>
            </div>
          </div>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default HotelCard;
