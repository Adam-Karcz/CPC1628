const hitWallSound = {
  period: 44,
  duration: 0.2,
  volume: 7 / 15,
  env: [1, 118, 11, 10],
  ent: [1, 10, 2, 2],
};

const playBallSound = {
  period: 78,
  duration: 0.2,
  volume: 7 / 15,
  env: [1, 118, 11, 10],
  ent: [1, 10, 2, 2],
};

const lostLifeSound = {
  period: 19,
  duration: 0.46,
  volume: 2 / 15,
  env: [5, 3, 1, 22],
  ent: [-2, 10, 2, 2, 5, -7, 1, 2, 11, 3, 2, -4, 8, 1],
};

const winSound = {
  period: 15,
  duration: 0.3,
  volume: 3 / 15,
  env: [1, 0, 5, 2],
  ent: [],
};

const testSoundParams = {
  period: 44,
  duration: 2,
  volume: 0.5,
  env: [0.1, 0.2, 0.5, 0.1],
  ent: [],
};

export {
  hitWallSound,
  playBallSound,
  lostLifeSound,
  winSound,
  testSoundParams,
};
