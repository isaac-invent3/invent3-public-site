import * as Yup from 'yup';

const locationSchema = Yup.object().shape({
  countryId: Yup.number().required('Country is Required'),
  stateId: Yup.number().required('State is Required'),
  lgaId: Yup.number().required('LGA is Required'),
  facilityId: Yup.string().required('Facility is Required'),
  buildingId: Yup.string().nullable(),
  floorId: Yup.string().nullable(),
  departmentId: Yup.string().nullable(),
  roomId: Yup.string().nullable(),
  aisleId: Yup.string().nullable(),
  shelfId: Yup.string().nullable(),
});

const facilitySchema = Yup.object().shape({
  lgaId: Yup.number().required('LGA is Required'),
  facilityName: Yup.string().required('Name is Required'),
  facilityRef: Yup.string().nullable(),
  address: Yup.string().nullable(),
  longitude: Yup.number().nullable(),
  latitude: Yup.number().nullable(),
});

const buildingSchema = Yup.object().shape({
  facilityId: Yup.number().required('Facility is Required'),
  buildingName: Yup.string().required('Name is Required'),
  buildingRef: Yup.string().nullable(),
  address: Yup.string().nullable(),
  longitude: Yup.number().nullable(),
  latitude: Yup.number().nullable(),
});

const floorSchema = Yup.object().shape({
  buildingId: Yup.number().required('Building is Required'),
  floorName: Yup.string().required('Name is Required'),
  floorRef: Yup.string().nullable(),
});

const departmentSchema = Yup.object().shape({
  floorId: Yup.number().required('Floor is Required'),
  departmentName: Yup.string().required('Name is Required'),
  departmentRef: Yup.string().nullable(),
});

const roomSchema = Yup.object().shape({
  departmentId: Yup.number().required('Department is Required'),
  roomName: Yup.string().required('Name is Required'),
  roomRef: Yup.string().nullable(),
});

const aisleSchema = Yup.object().shape({
  roomId: Yup.number().required('Room is Required'),
  aisleName: Yup.string().required('Name is Required'),
  aisleRef: Yup.string().nullable(),
});

const shelfSchema = Yup.object().shape({
  aisleId: Yup.number().required('Aisle is Required'),
  shelfName: Yup.string().required('Name is Required'),
  shelfRef: Yup.string().nullable(),
});

export {
  locationSchema,
  facilitySchema,
  buildingSchema,
  floorSchema,
  departmentSchema,
  roomSchema,
  aisleSchema,
  shelfSchema,
};
