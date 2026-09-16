import { useState } from 'react';
import { fetchJson } from '../services/apiClient';

export function useAdminAssignmentsApi() {
  const [isGrading, setIsGrading] = useState(false);

  const saveScore = async (submissionId, score) => {
    setIsGrading(true);
    try {
      return await fetchJson(`/admin/submissions/${submissionId}/grade`, {
        method: 'PATCH',
        body: JSON.stringify({ score }),
      });
    } finally {
      setIsGrading(false);
    }
  };

  return { saveScore, isGrading };
}

export default useAdminAssignmentsApi;
