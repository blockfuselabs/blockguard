export function replaceRandomMnemonics(arr) {
    if (arr.length !== 12) {
      console.error("The array must contain exactly 12 elements.");
      return false;
    }
  
    let newArray = [...arr];
    let replacedIndices = new Set();
  
    while (replacedIndices.size < 4) {
      let randomIndex = Math.floor(Math.random() * newArray.length);
  
      if (!replacedIndices.has(randomIndex)) {
        newArray[randomIndex] = "";
        replacedIndices.add(randomIndex);
      }
    }
  
    return newArray;
  }

// export function validateMnemonics(originalArray, userFilledArray) {
//     for (let i = 0; i < originalArray.length; i++) {
//       if (originalArray[i] !== "" && userFilledArray[i] !== "") {
//         continue;
//       }
  
//       if (originalArray[i] !== userFilledArray[i]) {
//         return false;
//       }
//     }
  
//     return true;
//   }

export function validateMnemonics(originalArray, userFilledArray) {
    for (let i = 0; i < originalArray.length; i++) {
      if (
        originalArray[i] != "" &&
        userFilledArray[i] != "" &&
        originalArray[i] == userFilledArray[i]
      ) {
        continue;
      }
  
      if (originalArray[i] !== userFilledArray[i]) {
        return false;
      }
    }
  
    return true;
  }

  export function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
  
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
  
    return true;
  }