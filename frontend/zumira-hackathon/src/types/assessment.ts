export interface Assessment {
  id: string;
  title: string;
  summary: string;
  selfMonitoring: {
    id: string;
    title: string;
  };
  lastCompleted: Date;
}

export interface AssessmentResult {
  assessmentResultRating: {
    risk: string;
    profile: string;
    color: string;
  };
  createdAt: Date;
  id: string;
  scores: {
    dimension: {
      id: string;
      acronym: string;
      name: string;
    };
    value: number;
  }[];
  user: {
    id: string;
    name: string;
    email: string;
    companyId: string;
  };
}
