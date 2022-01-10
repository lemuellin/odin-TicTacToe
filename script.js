

const Gameboard = (()=>{
    let gameBoard = [];
    let locX = [];
    let locO = [];
    let turn = 0;

    function playX(location){
        gameBoard[location] = "X";
    };

    function playO(location){
        gameBoard[location] = "O";
    };

    const play = (location)=>{
        if (typeof gameBoard[location]=='undefined'){
            if (turn%2 == 0){
                playX(location);
                turn++;
                locX.push(location);
                locX = locX.sort();
            }else{
                playO(location);
                turn++;
                locO.push(location);
                locO = locO.sort();
            }
        }
        render();
        checkWin();
    };

    const render = ()=>{
        gameBoard.forEach((element,index)=>{
            if (element == "X"){
                const grid = `g${index}`;
                document.querySelector(`.${grid}`).innerHTML = "X";
            } else if (element == "O"){
                const grid = `g${index}`;
                document.querySelector(`.${grid}`).innerHTML = "O";
            }
        });
    };

    function checkWin(){

        const winCondition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]];

        winCondition.forEach(el => {
            const countX = [];
            const countO = [];
            el.forEach(num => {
                if(locX.includes(num)) {
                    countX.push(num);
                    if(countX.length === 3) {
                        displayResult(1);
                    }
                }
                if(locO.includes(num)) {
                    countO.push(num);
                    if(countO.length === 3) {
                        displayResult(2);
                    }
                }
            })
            if(turn == 9){
                displayResult(3);
            }
        });

        // Method 2
        // const winCondition = {
        //     w1:[0,1,2],
        //     w2:[3,4,5],
        //     w3:[6,7,8],
        //     w4:[0,3,6],
        //     w5:[1,4,7],
        //     w6:[2,5,8],
        //     w7:[0,4,8],
        //     w8:[2,4,6]
        // };

        // function isSubSet(array1, array2){
        //     return array2.every(function (element){
        //         return array1.includes(element); 
        //     }); 
        // };

        // if (isSubSet(locX, winCondition.w1)
        //     ||isSubSet(locX, winCondition.w2)
        //     ||isSubSet(locX, winCondition.w3)
        //     ||isSubSet(locX, winCondition.w4)
        //     ||isSubSet(locX, winCondition.w5)
        //     ||isSubSet(locX, winCondition.w6)
        //     ||isSubSet(locX, winCondition.w7)
        //     ||isSubSet(locX, winCondition.w8)){
        //     displayResult(1);
        // }else if(isSubSet(locO, winCondition.w1)
        //     ||isSubSet(locO, winCondition.w2)
        //     ||isSubSet(locO, winCondition.w3)
        //     ||isSubSet(locO, winCondition.w4)
        //     ||isSubSet(locO, winCondition.w5)
        //     ||isSubSet(locO, winCondition.w6)
        //     ||isSubSet(locO, winCondition.w7)
        //     ||isSubSet(locO, winCondition.w8)){
        //     displayResult(2);
        // }else if(turn == 9){
        //     displayResult(3);
        // }
    };

    const start = ()=>{
        gameBoard=[];
        locX = [];
        locO = [];
        turn = 0;
        for (index = 0; index<9; index++){
            const grid = `g${index}`;
            document.querySelector(`.${grid}`).innerHTML = "";
        }
        closeForm();

        document.querySelector(".playerShow1").innerHTML = playerFactory(1);
        document.querySelector(".playerShow2").innerHTML = playerFactory(2);
        
    };

    const displayResult=(num)=>{
        switch (num){
            case 1:
                document.querySelector(".resultMsg").innerHTML =`${playerFactory(1)} WINS`;
                openResult();
                console.log("player1 wins");
                break;
            case 2:
                document.querySelector(".resultMsg").innerHTML =`${playerFactory(2)} WINS`;
                openResult();
                console.log("player2 wins");
                break;
            case 3:
                document.querySelector(".resultMsg").innerHTML ="It's a draw";
                openResult();
                console.log("It's a draw");
                break;
        };
    };

    function openResult() {
        document.querySelector(".resultPopup").style.display = "block";
    }
      
    function closeForm() {
        document.querySelector(".resultPopup").style.display = "none";
        document.querySelector(".playerPopup").style.display = "none";
    }

    const restart = ()=>{
        gameBoard=[];
        locX = [];
        locO = [];
        turn = 0;
        for (index = 0; index<9; index++){
            const grid = `g${index}`;
            document.querySelector(`.${grid}`).innerHTML = "";
        }
        closeForm();
    };

    return{play, restart, start};
})();

const playerFactory = (num) => {
    let player1 = document.querySelector(".player1").value;
    let player2 = document.querySelector(".player2").value;

    if (player1==''){
        player1 = "Player 1";
    }

    if (player2==''){
        player2 = "Player 2";
    }

    switch (num){
        case 1:
        return player1

        case 2:
        return player2
    }

};

const displayController = (()=>{

    function init(){
        document.querySelector(".playerPopup").style.display = "block";
    };

    init();

    // 3 x 3 event listener
    for (let i=0; i<9; i++){
        let string = "g"+`${i}`;
        string = document.querySelector(`.g${i}`);
        string.addEventListener('click', ()=>Gameboard.play(i));
    }

    // restart button
    const restart = document.querySelectorAll(".restart");
    for(let i=0; i<restart.length; i++){
        restart[i].addEventListener('click', ()=>Gameboard.restart());
    }

    // start button
    const start = document.querySelector(".start");
    start.addEventListener('click', ()=> Gameboard.start());

})();