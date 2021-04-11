import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CFade, CLink, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import './Rooms.scss';
import RoomEditForm from './RoomEditForm';
import { deleteRoom, getRooms, setActiveRoom } from '../../../actions/roomActions';

const Rooms = () => {
  const rooms = useSelector(state => state.rooms.list);
  const dispatch = useDispatch();

  const roomTypeMock = {
    name: 'Не задано',
    description: 'Не задано',
    numberOfRooms: '??',
    numberOfBeds: '??',
    cost: '????',
  };

  useEffect(() => {
    dispatch(getRooms());
  }, []);
  console.log(rooms);
  return (
    <div>
      <RoomEditForm />
      <CRow>
        {rooms.map(({ _id, number, floor, hotelName, hotelId, roomType }) => (
          <CCol md="6" xs="12" key={_id}>
            <CFade in className="h-100">
              <CCard className="h-100">
                <CCardHeader>
                  <h5 className="d-inline">Номер {number}</h5>{' '}
                  <p className="d-inline"> ({roomType ? roomType.name : roomTypeMock.name})</p>
                  <div className="card-header-actions">
                    <CLink
                      className="card-header-action text-info"
                      onClick={() =>
                        dispatch(setActiveRoom({ _id, number, floor, hotelName, hotelId, roomType: roomType?._id }))}
                    >
                      <CIcon name="cil-pencil" />
                    </CLink>
                    <CLink className="card-header-action text-danger" onClick={() => dispatch(deleteRoom(_id))}>
                      <CIcon name="cil-x-circle" />
                    </CLink>
                  </div>
                </CCardHeader>
                <CCardBody>
                  {roomType ? (
                    <>
                      <div>
                        <span className="font-weight-bold">Гостиница: </span>
                        {hotelName}
                      </div>
                      <div>
                        <span className="font-weight-bold">Описание: </span>
                        {roomType ? roomType.description : roomTypeMock.description}
                      </div>
                    </>
                  ) : (
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <h2 className="text-danger">Необходимо указать тип номера</h2>
                    </div>
                  )}
                </CCardBody>
                <CCardFooter>
                  <div className="d-flex justify-content-between">
                    <div>
                      Этаж: <span className="font-weight-bold">{floor}</span>
                    </div>
                    <div>
                      Комнат:
                      <span className="font-weight-bold">
                        {roomType ? roomType.numberOfRooms : roomTypeMock.numberOfRooms}
                      </span>
                    </div>
                    <div>
                      Кроватей:
                      <span className="font-weight-bold">
                        {roomType ? roomType.numberOfBeds : roomTypeMock.numberOfBeds}
                      </span>
                    </div>
                    <div>
                      Стоимость:
                      <span className="font-weight-bold text-success">
                        {roomType ? roomType.cost : roomTypeMock.cost} руб.
                      </span>
                    </div>
                  </div>
                </CCardFooter>
              </CCard>
            </CFade>
          </CCol>
        ))}
      </CRow>
    </div>
  );
};

export default Rooms;
