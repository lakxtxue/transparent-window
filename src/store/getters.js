const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.user.device,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  surName: state => state.user.surName,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permissionData: state => state.app.permissionData,
  dark: state => state.app.dark
};
export default getters;
