module.exports = function solveSudoku(matrix) {
    let count = 0, flag = true, time = 0;
    let candidatesMap = {};
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (!matrix[i][j]) {
          setCandidates(i, j);
          count++;
        } 
      }
    }
  while (time < 25) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (!matrix[i][j]) {
          setCandidates(i, j);
          findUnique(i, j, candidatesMap);
          count++;
        } 
      }
    }
    if (count === 0) {
      flag = false;
    } else {
      count = 0;
    }
    time++;
    //console.log(matrix);
  }
  //console.log(candidatesMap); 
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
          candidatesMap[[i,j]] = [];
        } else {
            candidatesMap[[i,j]] = candidates;
        }
        

        // if (i===3 && j===4) {
        //     console.log(candidatesMap);
            
        // }
        
        
        //console.log(candidatesMap);
        
        // console.log('previous');
        // console.log(matrix);
        
        //setHiddenSingle(candidates, i, j);
      }

      function findUnique(row, col, candidatesMap) {
          let arr=[];
        for (let j = 0; j < 9; j++) {
            if (!matrix[row][j] && j!=col) {
             arr.push(candidatesMap[''+row+','+j]); 
            }  
          }
          arr = arr.join().split(',').map(Number);
          
          candidatesMap[''+row+','+col].forEach(function(elem) {
              if(!arr.includes(elem)){
                  matrix[row][col] = elem;
                  candidatesMap[[row,col]] = [];
              }
          });
          arr = [];
          for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if (!matrix[i][j]) {
                    setCandidates(i, j);  
                }  
            }
          }

          for (let i = 0; i < 9; i++) {
            if (!matrix[i][col] && i!=row) {
             arr.push(candidatesMap[''+i+','+col]); 
            }  
          }
          arr = arr.join().split(',').map(Number);
          
          candidatesMap[''+row+','+col].forEach(function(elem) {
              if(!arr.includes(elem)){
                  matrix[row][col] = elem;
                  candidatesMap[[row,col]] = [];
              }
          });

          arr = [];
            for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if (!matrix[i][j]) {
                    setCandidates(i, j);  
                }  
            }
          }

          
          
          //setCandidates(row, col);

          for (let i = Math.floor(row/3)*3; i < Math.floor(row/3)*3+3; i++) {
            for (let j = Math.floor(col/3)*3; j < Math.floor(col/3)*3+3; j++) {
                if (!matrix[i][j] && i!==row && j!==col) {
                    arr.push(candidatesMap[''+i+','+j]); 
                }    
            }
          }

          candidatesMap[''+row+','+col].forEach(function(elem) {
            if(!arr.includes(elem)){
                matrix[row][col] = elem;
                candidatesMap[[row,col]] = [];
            }
        });

        arr = [];
          
          
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
        for (let i = Math.floor(row/3)*3; i < Math.floor(row/3)*3+3; i++) {
          for (let j = Math.floor(col/3)*3; j < Math.floor(col/3)*3+3; j++) {
            if (matrix[i][j]) {
              arr.push(matrix[i][j]);
            }    
          }
        }
        return arr;
      }

      function diff (ar1, ar2) {
        let arr_diff = [];
        for ( let i=0; i<ar1.length; i++ ) {
            let is_found = false;
            for ( let j=0; j<ar2.length; j++ ) {
                if ( ar1[i] == ar2[j] ) {
                    is_found = true;
                    break;
                }
            }
            if ( !is_found ) {
                arr_diff[arr_diff.length] = ar1[i];
            }
        }
        return arr_diff;
      }
    
      return matrix;
     
};