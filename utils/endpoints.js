export const endpoints = {
  auth: {
    register: "/auth/register/",
    login: "/auth/login/",
    refresh: "/auth/token/refresh/",
    profile: "/auth/profile/",
    updateCareerGoal: "/dash/update-career-goal/",
    changePassword: "/auth/change-password/",
    updateProfile: "/auth/profile/update/", 
  },

  dash:{
    overview: "/dash/overview/",
    roadmapProgress: "/dash/roadmap/progress/",
    markSkill: "/dash/roadmap/progress/mark-skill/",
    roadmapFromRecommendation: "/dash/roadmap/from-recommendation/",
    roadmapHistory: "/dash/roadmap/history/",
    roadmapDetail: (id) => `/dash/roadmap/${id}/`,
    skillGap: "/dash/skill-gap/",
    latestSkillGap: "/dash/skill-gap/latest/",
  },
  
  quiz: {
    submit: "/dash/quiz/submit/",
    history: "/dash/quiz/history/latest/",
    historyAll: "/dash/quiz/history/",
  },

  ai: {
    recommendCareers: "/ai/recommend-careers/",
    latestRecommendation: "/ai/recommendations/latest/",
  },
};