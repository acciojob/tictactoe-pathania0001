//your JS code here. If required.
const firstpage = document.getElementById("first-page");
const board = document.getElementsByClassName("board")[0];
board.style.display = "none";
const inputplayer1 = document.getElementById("player1");
const inputplayer2 = document.getElementById("player2");
let player1,player2;
let turn,currText="X";
let winner = null;
const message = document.getElementsByClassName("message")[0];

const grid = document.getElementsByClassName("grid")[0]

const button = document.getElementById("submit");
let res = [["","",""],["","",""],["","",""]]
 const verifyResult = (res)=>{
	 console.log(res)
   return ((res[0]===res[1] && res[0]===res[2] && res[0]!=="") ? {value:res[0],cols :[0,1,2]} :
    (res[3]===res[4] && res[4]===res[5] && res[3]!=="") ? {value:res[3],cols :[3,4,5]} :
    (res[6]===res[7] && res[7]===res[8] && res[6]!=="") ? {value:res[6],cols :[6,7,8]} :
    (res[0]===res[3] && res[3]===res[6] && res[0]!=="") ? {value:res[0],cols :[0,3,6]}:
    (res[1]===res[4] && res[4]===res[7] && res[1]!=="") ? {value:res[1],cols :[1,4,7]}:
    (res[2]===res[5] && res[5]===res[8] && res[2]!=="") ? {value:res[2],cols :[2,5,8]} :
    (res[0]===res[4] && res[4]===res[8] && res[0]!=="") ?{value:res[0],cols :[0,4,8]}:
    (res[2]===res[4] && res[4]===res[6] && res[2]!=="") ?{value:res[2],cols :[2,4,6]} :
    null)
		   
 }
inputplayer1.oninput=(e)=>{
handleInput(e,"player1")
}
inputplayer2.oninput=(e)=>{
	handleInput(e,"player2");
}
function handleInput (e,player){
	player==="player1" ? 
		player1 = e.target.value:
		player2 = e.target.value;
}

function handleClickStart (){
	firstpage.style.display= "none";
	board.style.display = "block";
	turn  = "Player1";
	message.innerText=`${turn},you're up`;
	currText = "X";
}

function handleDivCLick(div){
  if(div.innerText !=="" || winner!==null)
	  return;
	
div.innerText=`${currText}`;
	res[Number(div.id)-1] = currText;
	const final = verifyResult(res);
	if(final!=null &&final.value !== undefined){
		message.innerText=`${turn},congratulations you won!`;
		winner = "declare";
		return
	}
turn = turn === "Player1" ? "Player2":"Player1" ;
	message.innerText=`${turn},you're up`;
  div.style.pointerEvent="none"
   if(currText==="X")
	   currText="O";
	else
	   currText="X"
}
button.onclick = handleClickStart
Array.from(grid.children).forEach((div)=>{
	div.addEventListener("click",(e)=>(handleDivCLick(div)))
})



