export const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#ffffff",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`, // Bright blue color
  strokeWidth: 3, // Increased stroke width
  barPercentage: 0.5, // Wider bars
  useShadowColorFromDataset: false,
  propsForLabels: {
    fontSize: 13,
    fontWeight: '500',
  },
  propsForBackgroundLines: {
    strokeWidth: 1,
    strokeDasharray: null,
  }
};
