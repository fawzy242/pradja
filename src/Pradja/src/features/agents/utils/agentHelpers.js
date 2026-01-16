export const formatAgentPhone = (phone) => {
  if (!phone) return 'N/A';
  return phone.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
};

export const getAgentInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export default { formatAgentPhone, getAgentInitials };
