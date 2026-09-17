import { useAssignmentFetch } from './useAssignmentFetch';
import { useAssignmentMutations } from './useAssignmentMutations';

export function useAssignments() {
  const fetchState = useAssignmentFetch();
  const mutations = useAssignmentMutations();

  return {
    ...fetchState,
    ...mutations,
  };
}

export { useStudentAssignments } from './useStudentAssignments';
export { useAdminAssignmentsApi } from './useAdminAssignmentsApi';