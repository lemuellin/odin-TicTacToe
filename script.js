

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
        const winCondition = {
            w1:[0,1,2],
            w2:[3,4,5],
            w3:[6,7,8],
            w4:[0,3,6],
            w5:[1,4,7],
            w6:[2,5,8],
            w7:[0,4,8],
            w8:[2,4,6]
        };

        function isSubSet(array1, array2){
            return array2.every(function (element){
                return array1.includes(element); 
            }); 
        };


        if (isSubSet(locX, winCondition.w1)||isSubSet(locX, winCondition.w2)||isSubSet(locX, winCondition.w3)||isSubSet(locX, winCondition.w4)||isSubSet(locX, winCondition.w5)||isSubSet(locX, winCondition.w6)||isSubSet(locX, winCondition.w7)||isSubSet(locX, winCondition.w8)){
            displayResult(1);
        }else if(isSubSet(locO, winCondition.w1)||isSubSet(locO, winCondition.w2)||isSubSet(locO, winCondition.w3)||isSubSet(locO, winCondition.w4)||isSubSet(locO, winCondition.w5)||isSubSet(locO, winCondition.w6)||isSubSet(locO, winCondition.w7)||isSubSet(locO, winCondition.w8)){
            displayResult(2);
        }else if(turn == 9){
            displayResult(3);
        }
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

        let player1 = document.querySelector(".player1").value;
        let player2 = document.querySelector(".player2").value;

        document.querySelector(".playerShow1").innerHTML = player1;
        document.querySelector(".playerShow2").innerHTML = player2;
        
        
    };

    const displayResult=(num)=>{
        let player1 = document.querySelector(".player1").value;
        let player2 = document.querySelector(".player2").value;
        
        switch (num){
            case 1:
                document.querySelector(".result").innerHTML =`${player1} WINS`;
                openResult();
                console.log("player1 wins");
                break;
            case 2:
                document.querySelector(".result").innerHTML =`${player2} WINS`;
                openResult();
                console.log("player2 wins");
                break;
            case 3:
                document.querySelector(".result").innerHTML ="It's a draw";
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



    function init(){
        document.querySelector(".playerPopup").style.display = "block";
    };

    return{play, restart, init, start};
})();

const playerFactory = () => {
    

};

const displayController = (()=>{
    Gameboard.init();

    const g0 = document.querySelector(".g0");
    g0.addEventListener('click', ()=>Gameboard.play(0));
    const g1 = document.querySelector(".g1");
    g1.addEventListener('click', ()=>Gameboard.play(1));
    const g2 = document.querySelector(".g2");
    g2.addEventListener('click', ()=>Gameboard.play(2));
    const g3 = document.querySelector(".g3");
    g3.addEventListener('click', ()=>Gameboard.play(3));
    const g4 = document.querySelector(".g4");
    g4.addEventListener('click', ()=>Gameboard.play(4));
    const g5 = document.querySelector(".g5");
    g5.addEventListener('click', ()=>Gameboard.play(5));
    const g6 = document.querySelector(".g6");
    g6.addEventListener('click', ()=>Gameboard.play(6));
    const g7 = document.querySelector(".g7");
    g7.addEventListener('click', ()=>Gameboard.play(7));
    const g8 = document.querySelector(".g8");
    g8.addEventListener('click', ()=>Gameboard.play(8));

    const restart = document.querySelectorAll(".restart");
    for(let i=0; i<restart.length; i++){
        restart[i].addEventListener('click', ()=>Gameboard.restart());
    }

    const start = document.querySelector(".start");
    start.addEventListener('click', ()=> Gameboard.start());




})();