import { defineStore } from "pinia";
import { getProjectAll } from "../../api/project";
import { getCookie, setCookie } from "../../utils/cache/cookies";

export const useGeneralStore = defineStore({
  id: "project",
  state: () => ({
    projectList: getCookie("PROJECT_ALL")
      ? JSON.parse(getCookie("PROJECT_ALL"))
      : [],
    currentProjectId: getCookie("PROJECT_ID") || "",
    refreshTimer: null,
    manualRefresh: false,
  }),
  getters: {
    // 获取菜单列表
    getProjectList() {
      return this.projectList;
    },
    getCurrentProjectId() {
      return this.currentProjectId;
    },
    getManualRefresh() {
      return this.manualRefresh;
    },
  },
  actions: {
    setCurrentProject(id) {
      this.currentProjectId = id;
      setCookie("PROJECT_ID", id);
    },
    async getValidProject() {
      let res = await getProjectAll({
        status: [2],
      });
      if (!res.success) {
        return;
      }
      this.setProjectList(res.model);
    },
    /**
     * 保存项目数据
     * @param projectList
     */
    setProjectList(projectList) {
      this.projectList = projectList;
      setCookie("PROJECT_ALL", JSON.stringify(projectList));
      let currentProject = projectList[0]?.id;
      if (currentProject && !getCookie("PROJECT_ID")) {
        this.currentProjectId = currentProject;
        setCookie("PROJECT_ID", currentProject);
      }
    },
    // 手动刷新
    setManualRefresh() {
      if (this.refreshTimer) return;
      this.manualRefresh = true;
      this.refreshTimer = setTimeout(() => {
        this.manualRefresh = false;
        this.refreshTimer = null;
        clearTimeout(this.refreshTimer);
      }, 100);
    },
  },
});
