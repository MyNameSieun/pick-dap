import { CategoryTypeEnums } from '@/types/entity';

export const jobCategories: CategoryTypeEnums[] = [
  'FrontEnd',
  'BackEnd',
  'CS',
  '인성면접',
  'Infra',
  'AI',
  'Android',
  'iOS',
  'Project',
] as const;
export const ALL_CATEGORIES = ['ALL', ...jobCategories] as const;
