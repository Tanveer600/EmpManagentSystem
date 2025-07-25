import store from '../redux/store'; // Adjust path if needed

export function fetchRoleById(roleId) {
  const roles = store.getState().role.roles;
  console.log('Role list from Redux:', roles);
  console.log('Finding roleId:', roleId);
  return roles.find(role => role.id === roleId) || {};
}
