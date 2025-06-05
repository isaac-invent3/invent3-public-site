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

const locationMasterSchema = () =>
  Yup.object().shape({
    buildingModel: Yup.array()
      .of(
        Yup.object().shape({
          buildingName: Yup.string().required('Building Name is Required'),
          buildingRef: Yup.string().nullable(),
          floorModel: Yup.array().of(
            Yup.object().shape({
              floorName: Yup.string().required('Floor Name is Required'),
              floorRef: Yup.string().nullable(),
              departmentModel: Yup.array().of(
                Yup.object().shape({
                  departmentName: Yup.string().required(
                    'Department Name is Required'
                  ),
                  departmentRef: Yup.string().nullable(),
                  roomModel: Yup.array().of(
                    Yup.object().shape({
                      roomName: Yup.string().required('Room Name is Required'),
                      roomRef: Yup.string().nullable(),
                      roomModel: Yup.array().of(
                        Yup.object().shape({
                          aisleName: Yup.string().required(
                            'Aisle Name is Required'
                          ),
                          aisleRef: Yup.string().nullable(),
                          shelfModel: Yup.array().of(
                            Yup.object().shape({
                              shelfName: Yup.string().required(
                                'Shelf Name is Required'
                              ),
                              shelfRef: Yup.string().nullable(),
                            })
                          ),
                        })
                      ),
                    })
                  ),
                })
              ),
            })
          ),
        })
      )
      .nullable(),
    countryId: Yup.number().required('Country is Required'),
    stateId: Yup.number().required('State is Required'),
    lgaId: Yup.number().required('LGA is Required'),
    facilityName: Yup.string().required('Facility Name is Required'),
    address: Yup.string().nullable(),
    picture: Yup.object()
      .shape({
        imageId: Yup.number().nullable(),
        imageName: Yup.string().nullable(),
        base64PhotoImage: Yup.string().nullable(),
        base64Prefix: Yup.string().nullable(),
      })
      .nullable(),
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
  locationMasterSchema,
};
