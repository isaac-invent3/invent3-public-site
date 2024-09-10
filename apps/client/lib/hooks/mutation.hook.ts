/* eslint-disable no-unused-vars */
// import { useCustomToast } from './toast.hook';

const useCustomMutation = () => {
  //   const { showToast } = useCustomToast();

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
      if (resp.data) {
        if (successMessage) {
          //   showToast({
          //     title: successMessage,
          //     status: 'success',
          //   });
        }
        if (successFn) {
          successFn();
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (showError) {
          //   showToast({
          //     title: resp?.error?.data?.message || 'An error occured',
          //     status: 'error',
          //   });
        }
      }
      return resp;
    } catch (error: any) {
      //   showToast({
      //     title: error.response?.error?.data?.message || 'An error occured',
      //     status: 'error',
      //   });
      return {};
    }
  };

  return { handleSubmit };
};

export default useCustomMutation;
