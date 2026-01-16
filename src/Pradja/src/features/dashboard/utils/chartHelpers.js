export const formatChartData = (data) => {
  return data.map(item => ({
    ...item,
    value: Number(item.value),
  }));
};

export const getChartColors = () => [
  '#1a4d2e',
  '#c8a882',
  '#4a7c59',
  '#e8c6a0',
  '#2d6a3f',
];

export default { formatChartData, getChartColors };
