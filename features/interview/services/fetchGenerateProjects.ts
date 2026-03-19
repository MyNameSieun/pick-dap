export interface ProjectDetailItem {
  description: string;
  sort_order?: number;
}

export interface GenerateProjectsRequest {
  title: string;
  description: string;
  project_type: string;
  service_purpose: string;
  start_date?: string;
  end_date?: string;
  functions: ProjectDetailItem[];
  roles: ProjectDetailItem[];
  tech_stacks: ProjectDetailItem[];
  troubleshootings: ProjectDetailItem[];
  performances: ProjectDetailItem[];
  retrospectives: ProjectDetailItem[];
}

export interface GenerateProjectsResponse {
  id: string;
  question: string;
  tags: string[];
}

export const fetchGenerateProjects = async (
  options: GenerateProjectsRequest,
): Promise<GenerateProjectsResponse[]> => {
  const response = await fetch('/api/interview/project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.details ||
        'AI가 질문을 생성하는 데 실패했습니다. 다시 시도해 주세요.',
    );
  }

  const data = await response.json();

  return data.items;
};
