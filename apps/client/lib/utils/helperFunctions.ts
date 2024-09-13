interface IOption {
  [key: string]: any;
}

export function generateOptions(
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
