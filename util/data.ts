interface Action<T> {
  index: number;
  item: T;
};

/**
 * Updates an item in an array without mutating
 * - what is array mutation and why should I avoid it? (https://medium.com/weekly-webtips/avoid-array-mutation-in-javascript-ac8d39010213)
 * 
 * @param {arr[*]} array 
 * @param {obj{index (arr pos to insert), item (element to insert)}} action 
 * @returns arr
 */
export const updateObjectInArray = <T>(array: T[], action: Action<T>) => {
  return array.map((item, index) => {
    if (index !== action.index) {
      // This isn't the item we care about - keep it as-is
      return item;
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...(item as T),
      ...(action.item as T),
    };
  });
};