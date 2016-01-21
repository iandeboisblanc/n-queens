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
  //instantiate a count
  var count = 0;

  //make a helper function
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
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
