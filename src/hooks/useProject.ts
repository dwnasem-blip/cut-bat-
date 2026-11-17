import { useProjectStore } from '@/store/projectStore';

export const useProject = () => {
  return {
    projects: useProjectStore((state) => state.projects),
    currentProject: useProjectStore((state) => state.currentProject),
    videos: useProjectStore((state) => state.videos),
    loading: useProjectStore((state) => state.loading),
    error: useProjectStore((state) => state.error),

    setProjects: useProjectStore((state) => state.setProjects),
    setCurrentProject: useProjectStore((state) => state.setCurrentProject),
    addProject: useProjectStore((state) => state.addProject),
    deleteProject: useProjectStore((state) => state.deleteProject),
    updateProject: useProjectStore((state) => state.updateProject),

    addVideo: useProjectStore((state) => state.addVideo),
    removeVideo: useProjectStore((state) => state.removeVideo),
    setVideos: useProjectStore((state) => state.setVideos),

    setLoading: useProjectStore((state) => state.setLoading),
    setError: useProjectStore((state) => state.setError),
  };
};
