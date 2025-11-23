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
  },
  
  quiz: {
    submit: "/dash/quiz/submit/",
    history: "/dash/quiz/history/latest/",
  },
};
