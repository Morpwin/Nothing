interface Monster {
  level: number;
  hp: number;
  gold: {
    min: number;
    max: number;
  };
  goods: [];
}

const monster = [{}];
