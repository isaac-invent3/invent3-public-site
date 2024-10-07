import { AssetFormDocument } from '../interfaces/asset.interfaces';
import { FILE_ICONS } from './constants';
import nigeriaStatesByLandSize from './NigeriaCordinates/landSize';

interface IOption {
  [key: string]: any;
}

function generateOptions(
  options: IOption[] | undefined,
  labelKey: string | string[],
  valueKey: string
) {
  const selectOptions = [];

  if (options?.length) {
    for (let i = 0; i < options.length; i++) {
      if (options[i]) {
        // Handle labelKey being a string or array of strings
        const label = Array.isArray(labelKey)
          ? labelKey.map((key) => options[i]?.[key] ?? '').join(' ') // Concatenate labels with spaces
          : (options[i]?.[labelKey] ?? '');

        selectOptions.push({
          label: label,
          value: options[i]?.[valueKey] ?? '',
        });
      }
    }
  }

  return selectOptions;
}

function getDocumentInfo(document: AssetFormDocument) {
  let mimeType: string;
  let base64Data: string;
  let extensionName: keyof typeof FILE_ICONS;

  // Check if the base64 string has a prefix like 'data:application/pdf;base64,'
  const base64WithPrefixPattern = /^data:(.+);base64,(.+)$/;
  const matches = document.base64Document.match(base64WithPrefixPattern);

  extensionName =
    (document.documentName?.split('.')?.[1] as 'pdf') ?? 'invalid';
  if (matches) {
    // Case 1: The base64Document includes the MIME type prefix
    mimeType = matches[1] as string;
    base64Data = matches[2] as string;
  } else if (document.base64Prefix) {
    // Case 2: No MIME type in the base64Document, use base64Prefix
    mimeType = document.base64Prefix;
    base64Data = document.base64Document;
  } else {
    throw new Error('No valid MIME type found.');
  }

  // Calculate the document size in bytes
  const sizeInBytes =
    (base64Data.length * 3) / 4 -
    (base64Data.endsWith('==') ? 2 : base64Data.endsWith('=') ? 1 : 0);

  // Convert size from bytes to MB
  const sizeInMB = sizeInBytes / (1024 * 1024);

  return {
    mimeType,
    extensionName,
    sizeInBytes,
    sizeInMB,
  };
}
const getScaleByStateSize = (stateName: string) => {
  const size = nigeriaStatesByLandSize?.[stateName as 'Abia'];

  if (!size) {
    return 8000;
  }

  if (size < 10000) {
    return 23000;
  } else if (size >= 10000 && size < 20000) {
    return 16000;
  } else if (size >= 20000 && size < 25000) {
    return 13000;
  } else if (size >= 25000 && size < 35000) {
    return 11500;
  } else if (size >= 35000 && size < 50000) {
    return 11000;
  } else if (size >= 50000) {
    return 8000;
  }
};

function formatNumberShort(value: number) {
  if (value >= 1e12) {
    return (value / 1e12).toFixed(1) + 'T'; // Trillions
  } else if (value >= 1e9) {
    return (value / 1e9).toFixed(1) + 'B'; // Billions
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(1) + 'M'; // Millions
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(1) + 'K'; // Thousands
  } else {
    return value.toString(); // Less than 1,000
  }
}

export {
  generateOptions,
  getDocumentInfo,
  getScaleByStateSize,
  formatNumberShort,
};
