import { Report } from '~/lib/interfaces/report.interfaces';

const dummyReport: Report = {
  isNew: false,
  createdDate: '2024-12-13T07:54:35.056Z',
  createdBy: 'george',
  lastModifiedDate: '2024-12-14T10:23:45.123Z',
  lastModifiedBy: 'alice',
  isDeleted: false,
  deletedDate: null,
  deletedBy: null,
  guid: 'deda0392-1b11-4c61-8589-c68822d02010',
  reportId: 1,
  reportName: 'Dummy Report',
  description: 'A dummy report created for testing purposes.',
  isDefaultReport: true,
  query: `
    SELECT TOP 10
      AssetID,
      AssetName,
      StatusID,
      ResaleValue
    FROM vwAssetInfoHeader
    WHERE IsDeleted = 0
    ORDER BY AssetID;
  `,
};

export { dummyReport };
