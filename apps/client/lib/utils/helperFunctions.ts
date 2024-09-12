interface IOption {
  [key: string]: any;
}

export function generateOptions(
  options: IOption[] | undefined,
  labelKey: string,
  valueKey: string
) {
  const selectOptions = [];

  if (options?.length) {
    for (let i = 0; i < options.length; i++) {
      if (options[i]) {
        selectOptions.push({
          label: options?.[i]?.[labelKey] ?? '',
          value: options?.[i]?.[valueKey] ?? '',
        });
      }
    }
  }

  return selectOptions;
}
