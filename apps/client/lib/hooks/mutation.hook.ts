/* eslint-disable no-unused-vars */

import { useToast } from '@chakra-ui/react';

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
  ) => {
    try {
      const resp: any = await mutationFn(variables);
      if (!resp.error) {
        if (successMessage) {
          toast({
            title: successMessage,
            status: 'success',
            position: 'top-right',
          });
        }
        if (successFn) {
          successFn();
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (showError) {
          toast({
            title: resp?.error?.data?.message || 'An error occured',
            status: 'error',
            position: 'top-right',
          });
        }
      }
      return resp;
    } catch (error: any) {
      toast({
        title: error.response?.error?.data?.message || 'An error occured',
        status: 'error',
        position: 'top-right',
      });
      return {};
    }
  };

  return { handleSubmit };
};

export default useCustomMutation;
