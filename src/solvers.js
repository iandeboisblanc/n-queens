/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var myBoard = new Board({n:n});
  var placeRook = function(row,col,numPlaced){
    if (numPlaced === n){
      return;
    }
    myBoard.togglePiece(row,col);
    if(myBoard.hasAnyRooksConflicts()){
      myBoard.togglePiece(row,col);
      col++;
      if(col >= n){  
        row++; 
        col=0;
      }
      if(row >= n){
        return;
      }
      placeRook(row,col, numPlaced);
    } else {
      placeRook(row + 1, 0, numPlaced + 1);
    }
  };
  placeRook(0,0,0);
  var solution = myBoard.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var myBoard = new Board({n:n});
  var count = 0;
  var placeRook = function(row, numPlaced){
    if (numPlaced === n){
      if(!myBoard.hasAnyRooksConflicts()){
        count++;
      }
      return;
    }
    for(var i = 0; i < n; i++){
      myBoard.togglePiece(row,i);
      placeRook(row +1, numPlaced +1);
      myBoard.togglePiece(row,i);
    }
    return;
  };
  placeRook(0,0);
  console.log('Number of solutions for ' + n + ' rooks:', count);
  return count;
  //230s
  /*
  have an array of past results, index = n, value is object containing all solutions
  for a given n, you can iterate through the top row, and assume the remaining available
  spots represent a solution-space for n-1. Grab those values from your solutions array
  and combine to create new solutions. Add new solutions to object (use stringified board
  as key for constant-time lookup)
  */
};

window.countNRooksSolutions2 = function(n) {
  var board = new Board({n:n});
  var count = 0;
  var combinationsLimit = n*n;
  var rowMap = [];
  for(var i = 0; i < n; i++) {
    var row = [];
    for(var j = 0; j < n; j++) {
      if(j === i){
        row.push(1);
      }
      else{
        row.push(0);
      }
    }
    rowMap.push(row);
  }
  for(var k = 0; k < n*n; k++) {
    for(var l = 0; l < n; l++) {
      board.set(l,rowMap[Math.floor(k/(Math.pow(n,l))%n)]);
    }
    if(!board.hasAnyRooksConflicts()){
      count++;
    }
  }
  return count;
};

window.countNRooksSolutions3 = function(n) {
  var pastResults = [];
  var placeRook = function(board, n, row, numPlaced){
    for(var i = 0; i < n; i++){
      board.togglePiece(0,i);
      //iterate through past results at n-1
        // fill open celss with past results
        if(!board.hasAnyRooksConflicts()){
          pastResults[n][board.rows().stringify()] = board.rows();
        }
      board.togglePiece(0,i);
    }
    return;
  };
  for(var i = 0; i < n; i++) {
    var board = new Board({n:i});
    placeRook(board, i, 0, 0);
  }
  return pastResults[n].length; //but won't work since it's an object and not an array
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var found = false;
  var myBoard = new Board({n:n});
  var placeQueen = function(row,numPlaced){
    if (numPlaced === n){
      if(!myBoard.hasAnyQueensConflicts()){
        found = true;
      }
      return;
    }
    for(var i = 0; i < n; i++){
      if(!found){
        myBoard.togglePiece(row,i);
        placeQueen(row +1, numPlaced +1);
        !found && myBoard.togglePiece(row,i);
      }
    }
  };

  placeQueen(0,0);
  var solution = myBoard.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var myBoard = new Board({n:n});
  var count = 0;
  var placeQueen = function(row, numPlaced){
    if (numPlaced === n){
      if(!myBoard.hasAnyQueensConflicts()){
        count++;
      }
      return;
    }
    for(var i = 0; i < n; i++){
      myBoard.togglePiece(row,i);
      placeQueen(row +1, numPlaced +1);
      myBoard.togglePiece(row,i);
    }
    return;
  };
  placeQueen(0,0);
  return count;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
  //298s
};
