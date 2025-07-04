export interface Company {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyFeedback {
  text: string;
  respondants: number;
  createdAt: Date;
}
