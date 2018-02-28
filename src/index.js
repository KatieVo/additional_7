module.exports = function solveSudoku(matrix) {

  let candidatesMap = {};
  let rememberMap = {};
  let rememberMatrix = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (!matrix[i][j]) {
        candidatesMap[''+i+','+j] = [1,2,3,4,5,6,7,8,9];
      }
    }
  }  
  
  solve();

  let stillNotSolved = false;
  outer:
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (!matrix[i][j]) { 
        stillNotSolved = true;
        break outer;
      }
    }
  }

  if (stillNotSolved) {
    candidatesMap = Object.assign({}, rememberMap);
    matrix = Object.assign([], rememberMatrix);
    
    for (const key in candidatesMap) {
      if (candidatesMap[key].length >= 1) {
        matrix[key.split(',')[0]][key.split(',')[1]] = candidatesMap[key][1];
        candidatesMap[key] = [];
        solve();
        break;
      }
    }
  }
  console.log(matrix);
  return matrix;

  function solve() {
    let flag = true;
    while (flag) {
      let prevCandidates = Object.assign({}, candidatesMap);
      
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
          if (!matrix[i][j]) { 
            setCandidates(i, j);
            findRowUnique(i, j);
            findColumnUnique(i, j);
            findSectionUnique(i, j);
          }
        }
      }
      
      if (JSON.stringify(prevCandidates) === JSON.stringify(candidatesMap)) { 
        flag = false;
      } 
    }

    let notSolved = false;
    for (const key in candidatesMap) {
      if (candidatesMap[key].length >= 1) {
        rememberMap = Object.assign({}, candidatesMap);
        for (let i = 0; i < matrix.length; i++) {
          rememberMatrix[i] = [];
          for (let j = 0; j < matrix.length; j++) {
            rememberMatrix[i][j] = matrix[i][j]; 
          }
        }
        //rememberMatrix = [...matrix];
        matrix[key.split(',')[0]][key.split(',')[1]] = candidatesMap[key][0];
        candidatesMap[key] = [];
        notSolved = true;
        break;
      }
    }
    
    if (notSolved) {
      solve();
    }
  }

  function setCandidates(i, j) {
    let candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let arrRow = excludeRowCandidates(i);
    let arrColumn = excludeColumnCandidates(j);
    let arrSection = excludeSectionCandidates(i, j);
    candidates = diff(candidates, arrRow);
    candidates = diff(candidates, arrColumn);
    candidates = diff(candidates, arrSection);

    if (candidates.length === 1) {
      matrix[i][j] = candidates[0];
      candidatesMap[[i, j]] = [];
    } else {
      candidatesMap[[i, j]] = candidates;
    }
  }

  function findRowUnique(row, col) {
    let arr = [];
    for (let j = 0; j < 9; j++) {
      if (!matrix[row][j] && j != col) {
        arr.push(candidatesMap["" + row + "," + j]);
      }
    }
    arr = arr.join().split(",").map(Number);

    candidatesMap["" + row + "," + col].forEach(function(elem) {
      
      if (!arr.includes(elem)) {
        matrix[row][col] = elem;
        candidatesMap[[row, col]] = [];
      }
    });
  }

  function findColumnUnique(row, col) {
    arr = [];
   
    for (let i = 0; i < 9; i++) {
      if (!matrix[i][col] && i != row) {
        arr.push(candidatesMap["" + i + "," + col]);
      }
    }
    arr = arr.join().split(",").map(Number);

    candidatesMap["" + row + "," + col].forEach(function(elem) {
      if (!arr.includes(elem)) {
        matrix[row][col] = elem;
        candidatesMap[[row, col]] = [];
      }
    });
  }

  function findSectionUnique(row, col) {
    arr = [];

    for (
      let i = Math.floor(row / 3) * 3;
      i < Math.floor(row / 3) * 3 + 3;
      i++
    ) {
      for (
        let j = Math.floor(col / 3) * 3;
        j < Math.floor(col / 3) * 3 + 3;
        j++
      ) {
        
        if (!matrix[i][j] && !(i===row && j===col)) {
          arr.push(candidatesMap["" + i + "," + j]);
        }

      }
    }

    arr = arr.join().split(",").map(Number);

    candidatesMap["" + row + "," + col].forEach(function(elem) {
      if (!arr.includes(elem)) {
        matrix[row][col] = elem;
        candidatesMap[[row, col]] = [];
      }
    });
  }

  function excludeRowCandidates(row) {
    let arr = [];
    for (let j = 0; j < 9; j++) {
      if (matrix[row][j]) {
        arr.push(matrix[row][j]);
      }
    }
    return arr;
  }

  function excludeColumnCandidates(col) {
    let arr = [];
    for (let i = 0; i < 9; i++) {
      if (matrix[i][col]) {
        arr.push(matrix[i][col]);
      }
    }
    return arr;
  }

  function excludeSectionCandidates(row, col) {
    let arr = [];
    for (
      let i = Math.floor(row / 3) * 3;
      i < Math.floor(row / 3) * 3 + 3;
      i++
    ) {
      for (
        let j = Math.floor(col / 3) * 3;
        j < Math.floor(col / 3) * 3 + 3;
        j++
      ) {
        if (matrix[i][j]) {
          arr.push(matrix[i][j]);
        }
      }
    }
    return arr;
  }

  function diff(ar1, ar2) {
    let arr_diff = [];
    for (let i = 0; i < ar1.length; i++) {
      let is_found = false;
      for (let j = 0; j < ar2.length; j++) {
        if (ar1[i] == ar2[j]) {
          is_found = true;
          break;
        }
      }
      if (!is_found) {
        arr_diff[arr_diff.length] = ar1[i];
      }
    }
    return arr_diff;
  }
};
