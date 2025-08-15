/* eslint-disable no-unused-vars */

import { useToast } from '@chakra-ui/react';
import { isArray, isObject } from 'lodash';

const useCustomMutation = () => {
  const toast = useToast();

  type MutationFunction<TVariables, TResult> = (
    variables: TVariables
  ) => Promise<TResult>;

  const handleSubmit = async <TVariables, TResult>(
    mutationFn: MutationFunction<TVariables, TResult>,
    variables: TVariables,
    successMessage?: string,
    successFn?: () => void,
    showError: boolean = true
  ): Promise<TResult> => {
    try {
      const resp: TResult = await mutationFn(variables);
      if (!(resp as any).error) {
        if (successMessage) {
          toast({
            title: successMessage,
            status: 'success',
            position: 'top-right',
            duration: 3000,
          });
        }
        if (successFn) {
          successFn();
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (showError) {
          const response = (resp as any)?.error?.data;
          const allErrors =
            response?.data && isObject(response?.data)
              ? Object.values(response?.data?.errors).flat()
              : response?.data;

          const validationError =
            allErrors && isArray(allErrors) && allErrors.length > 0
              ? allErrors[0]
              : allErrors;
          const message = response?.message;

          const displayError = validationError || message;
          toast({
            title: displayError || 'An error occured',
            status: 'error',
            position: 'top-right',
            duration: 3000,
          });
        }
      }
      return resp;
    } catch (error) {
      toast({
        title: 'An error occured',
        status: 'error',
        position: 'top-right',
        duration: 3000,
      });

      throw error;
    }
  };

  return { handleSubmit };
};

export default useCustomMutation;
