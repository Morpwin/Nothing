export interface RollData {
  value: number | string;
  weight: number;
}

export default function useRoll() {
  const roll = (data: RollData[]) => {
    const random = Math.random();

    let totalWeight = data.reduce((total, item) => total + item.weight, 0);
    let result;
    let start = 0;
    let map = {};

    data.forEach((item) => {
      if (result) return;
      const end = start + item.weight / totalWeight;
      map[item.value] = {
        start,
        end,
      };

      if (random > start && random < end) {
        result = item.value;
      }

      start = end;
    });

    return result;
  };

  return { roll };
}
