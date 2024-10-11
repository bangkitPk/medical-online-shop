export const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() dimulai dari 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`; // Format "DD/MM/YYYY"
};
