// const pivotArray = (arr: [], start: number = 0, end = arr.length - 1) => {
//   const swap = (array: number | any[], i, j: number) => {
//     var temp = array[i];
//     array[i] = array[j];
//     array[j] = temp;
//   };
//   const pivot = arr[start];
//   let swapIndex = start;
//   for (var i = start + 1; i < arr.length; i++) {
//     if (pivot > arr[i]) {
//       swapIndex++;
//       swap(swapIndex, arr, i);
//     }
//   }
//   swap(arr, start, swapIndex);
//   return swapIndex;
// };

// type combinedForces = string | number;
// type newCombinedforces = number | boolean;

// type UniversalForces = combinedForces & newCombinedforces;

// const forces: UniversalForces = 80;

// interface OlaideDetails {
//   [props: string]: number;
// }

// const detail: OlaideDetails = {
//   name: 70,
//   age: 590,
//   sex: "male",
//   hair: "black",
//   shortness: false,
// };
