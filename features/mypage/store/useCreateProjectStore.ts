import { createProjectProps } from '../services/project/createProject';
import { create } from 'zustand';
import { ProjectType } from '@/types/entity';
import { immer } from 'zustand/middleware/immer';
import { combine } from 'zustand/middleware';

const initialState = {
  title: '',
  description: '',
  project_type: '' as ProjectType,
  start_date: '',
  end_date: '',
  service_purpose: '',
  deploy_url: '',
  github_url: '',

  // 관계형 데이터는 빈 배열로 초기화
  tech_stacks: [] as { id: string; description: string }[],
  retrospectives: [] as { id: string; description: string }[],
  performance: [] as { id: string; description: string }[],
  functions: [] as { id: string; description: string }[],
  roles: [] as { id: string; description: string }[],
  troubleshootings: [] as { id: string; description: string }[],
};

export const useCreateProjectStore = create(
  immer(
    combine({ formData: initialState }, (set) => ({
      setField: <K extends keyof createProjectProps>(
        field: K,
        value: createProjectProps[K],
      ) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [field]: value,
          },
        })),

      reset: () =>
        set((state) => {
          state.formData = initialState;
        }),
    })),
  ),
);
