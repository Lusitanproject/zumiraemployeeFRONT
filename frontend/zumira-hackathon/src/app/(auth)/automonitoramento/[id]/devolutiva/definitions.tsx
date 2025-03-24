export type GetFeedback = {
  status: "SUCCESS" | "ERROR";
  data?: {
    items: {
      id: string;
      text: string;
      assessment: {
        id: string;
        title: string;
        psychologicalDimensions: {
          id: string;
          name: string;
          acronym: string;
        }[];
      };
      selfMonitoringBlock: {
        id: string;
        title: string;
        psychologicalDimensions: {
          id: string;
          name: string;
          acronym: string;
        }[];
      };
    }[];
  };
  message?: string;
};
