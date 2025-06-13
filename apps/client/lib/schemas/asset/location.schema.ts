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

const departmentSchema = (isMainForm?: boolean) =>
  Yup.object().shape({
    floorId: Yup.number().required('Floor is Required'),
    departmentName: Yup.string().required('Name is Required'),
    departmentRef: Yup.string().nullable(),
    ...(isMainForm
      ? { buildingId: Yup.string().required('Building is Required') }
      : {}),
  });

const roomSchema = (isMainForm?: boolean) =>
  Yup.object().shape({
    departmentId: Yup.number().required('Department is Required'),
    roomName: Yup.string().required('Name is Required'),
    roomRef: Yup.string().nullable(),
    ...(isMainForm
      ? {
          buildingId: Yup.string().required('Building is Required'),
          floorId: Yup.number().required('Floor is Required'),
        }
      : {}),
  });

const aisleSchema = (isMainForm?: boolean) =>
  Yup.object().shape({
    roomId: Yup.number().required('Room is Required'),
    aisleName: Yup.string().required('Name is Required'),
    aisleRef: Yup.string().nullable(),
    ...(isMainForm
      ? {
          buildingId: Yup.string().required('Building is Required'),
          floorId: Yup.number().required('Floor is Required'),
          departmentId: Yup.number().required('Department is Required'),
        }
      : {}),
  });

const shelfSchema = (isMainForm?: boolean) =>
  Yup.object().shape({
    aisleId: Yup.number().required('Aisle is Required'),
    shelfName: Yup.string().required('Name is Required'),
    shelfRef: Yup.string().nullable(),
    ...(isMainForm
      ? {
          buildingId: Yup.string().required('Building is Required'),
          floorId: Yup.number().required('Floor is Required'),
          departmentId: Yup.number().required('Department is Required'),
          roomId: Yup.number().required('Room is Required'),
        }
      : {}),
  });

const locationMasterSchema = () =>
  Yup.object().shape({
    createBuildingDtos: Yup.array()
      .of(
        Yup.object().shape({
          createBuildingDto: Yup.object().shape({
            buildingName: Yup.string().required('Building Name is Required'),
            buildingRef: Yup.string().nullable(),
            createdBy: Yup.string().required('Created by is Required'),
          }),
          createFloorDtos: Yup.array()
            .of(
              Yup.object().shape({
                createFloorDto: Yup.object().shape({
                  floorName: Yup.string().required('Floor Name is Required'),
                  floorRef: Yup.string().nullable(),
                  createdBy: Yup.string().required('Created by is Required'),
                }),
                createDepartmentDtos: Yup.array()
                  .of(
                    Yup.object().shape({
                      createDepartmentDto: Yup.object().shape({
                        departmentName: Yup.string().required(
                          'Department Name is Required'
                        ),
                        departmentRef: Yup.string().nullable(),
                        createdBy: Yup.string().required(
                          'Created by is Required'
                        ),
                      }),
                      createRoomDtos: Yup.array()
                        .of(
                          Yup.object().shape({
                            createRoomDto: Yup.object().shape({
                              roomName: Yup.string().required(
                                'Room Name is Required'
                              ),
                              roomRef: Yup.string().nullable(),
                              createdBy: Yup.string().required(
                                'Created by is Required'
                              ),
                            }),
                            createAisleDtos: Yup.array()
                              .of(
                                Yup.object().shape({
                                  createAisleDto: Yup.object().shape({
                                    aisleName: Yup.string().required(
                                      'Aisle Name is Required'
                                    ),
                                    aisleRef: Yup.string().nullable(),
                                    createdBy: Yup.string().required(
                                      'Created by is Required'
                                    ),
                                  }),
                                  createShelveDtos: Yup.array().of(
                                    Yup.object().shape({
                                      createShelfDto: Yup.object().shape({
                                        shelfName: Yup.string().required(
                                          'Shelf Name is Required'
                                        ),
                                        shelfRef: Yup.string().nullable(),
                                        createdBy: Yup.string().required(
                                          'Created by is Required'
                                        ),
                                      }),
                                    })
                                  ),
                                })
                              )
                              .nullable(),
                          })
                        )
                        .nullable(),
                    })
                  )
                  .nullable(),
              })
            )
            .nullable(),
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
