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
      if(myBoard.hasAnyRooksConflicts()) {
        myBoard.togglePiece(row,i);
        continue;
      }
      placeRook(row +1, numPlaced +1);
      myBoard.togglePiece(row,i);
    }
    return;
  };
  placeRook(0,0);
  console.log('Number of solutions for ' + n + ' rooks:', count);
  return count;
  //230s - 274s
  //down to 12 s

};

window.countNRooksSolutions2 = function(n) {
  var board = new Board({n:n});
  var count = 0;
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
  // }
  // iteration 1
  // for(var k = 0; k < Math.pow(n,n); k++) {
  //   for(var l = 0; l < n; l++) {
  //     board.set(l,rowMap[Math.floor(k/(Math.pow(n,l))%n)]);
  // }



    if(!board.hasAnyRooksConflicts()){
      count++;
    }
  return count;
  }
  //1201s
};

window.countNRooksSolutions = function(n) {
  var pastResults = [{}];
  pastResults[0]['[]'] = [];
  var placeRook = function(board, n, row, numPlaced){
    for(var i = 0; i < n; i++){
      board.togglePiece(0,i);
      var openCells = [];
      for(var j = 0; j < n; j++) {
        if(j !== i) {
          for(var k = 1; k < n; k++){
            var cell = [j,k];
            openCells.push(cell);
          }
        }
      }
      for(var key in pastResults[n-1]){ //need case for 0 to start?
        var valuesToFill = pastResults[n-1][key];
        for(var y = 0; y < valuesToFill.length; y++) {
          if(valuesToFill[y] === 1) {
            board.togglePiece(openCells[y][1],openCells[y][0]);
          }
        }
        // if(!board.hasAnyRooksConflicts()){
        if(pastResults[n] === undefined){
          pastResults[n] = {};
        }
        var boardCopy = _.flatten(board.rows());
        pastResults[n][JSON.stringify(boardCopy)] = boardCopy;
        // }
        for(var z = 0; z < valuesToFill.length; z++) {
          if(valuesToFill[z] === 1) {
            board.togglePiece(openCells[z][1],openCells[z][0]);
          }
        }
      }
      board = new Board({n:n});
    }
    return;
  };
  for(var i = 0; i < n; i++) {
    var board = new Board({n:i+1});
    placeRook(board, i+1, 0, 0);
  }
  console.log(Object.keys(pastResults[n]).length);
  return Object.keys(pastResults[n]).length; //but won't work since it's an object and not an array
};
//1.5s

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
        if(myBoard.hasAnyQueensConflicts()){
          myBoard.togglePiece(row,i);
          continue;
        }
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
      if(myBoard.hasAnyQueensConflicts()) {
        myBoard.togglePiece(row,i);
        continue;        
      }
      placeQueen(row +1, numPlaced +1);
      myBoard.togglePiece(row,i);
    }
    return;
  };
  placeQueen(0,0);
  console.log('Number of solutions for ' + n + ' queens:', count);
  return count;
  ///250s - 300s
  //1s
};
