import { useMutation } from '@tanstack/react-query';
import {
  fetchGenerateQuestions,
  GenerateOptions,
} from '../hooks/fetchGenerateQuestions';

const useFetchGenerateQuestions = () => {
  return useMutation({
    mutationFn: (options: GenerateOptions) => fetchGenerateQuestions(options),

    onSuccess: (data) => {
      console.log('질문 생성 성공:', data);
    },
    onError: (error) => {
      console.error('질문 생성 에러:', error.message);
    },
  });
};

export default useFetchGenerateQuestions;
