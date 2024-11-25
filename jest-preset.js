module.exports = {
  preset: '@vue/vue3-jest',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',  // 테스트 환경 설정
  setupFilesAfterEnv: ['./jest.setup.js'],
};
