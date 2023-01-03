/* eslint-disable no-return-assign */
const newShip = (length) => {
  let count = 0;

  const getLength = () => length;
  const hit = () => {
    count += 1;
    return true;
  };
  const hitCount = () => count;
  const alive = () => count < length;

  return {
    getLength, hit, hitCount, alive,
  };
};

export default newShip;
