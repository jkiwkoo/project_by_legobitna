//랜덤번호 지정
//유저가 번호를 입력한다. 그리고 go 라는 버튼을 누른다.
//만약 유저가 랜덤 번호를 맞추면, 맞췄습니다!
//랜덤 번호가 < 유저 번호 = Down!!
//랜덤 번호가 > 유저 번호 = Up!!
//Reset 버튼을 누르면 게임이 리셋 됨.
//5번의 기회를 다 쓰면 게임이 끝남. (더이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면 알려줌. 기회를 깎지 않는다.

let computerNum = 0;
let playButton = document.getElementById('play-button');
let userInput = document.getElementById('user-input');
let resultArea = document.getElementById('result-area');
let resetButton = document.getElementById('reset-button');
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById('chance-area');
let userHistory = [];

//go 라는 버튼을 누른다.
playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);
//썻던 숫자를 자동으로 지워주기.
userInput.addEventListener('focus', function () {
    userInput.value = '';
});

//랜덤번호 지정
function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log('정답', computerNum);
}

//유저가 번호를 입력한다.
function play() {
    let userValue = userInput.value;

    //유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
    if (userValue < 1 || userValue > 100) {
        resultArea.textContent = '1과 100 사이의 숫자만 입력 하세요.';
        return;
    }

    //유저가 이미 입력한 숫자를 또 입력하면 알려줌. 기회를 깎지 않는다.
    if (userHistory.includes(userValue)) {
        resultArea.textContent = '이미 입력한 숫자 입니다. 다른 숫자를 입력해주세요.';
        return;
    }

    chances--;
    chanceArea.textContent = `남은 기회 : ${chances} 번`;
    console.log('chance', chances);

    //랜덤 번호가 > 유저 번호 = Up!!
    if (userValue < computerNum) {
        resultArea.textContent = 'Up!!!';
    } //랜덤 번호가 < 유저 번호 = Down!!
    else if (userValue > computerNum) {
        resultArea.textContent = 'Down!!!';
    } //만약 유저가 랜덤 번호를 맞추면, 맞췄습니다!
    else {
        resultArea.textContent = 'Correct!!!';
        gameOver = true;
    }

    userHistory.push(userValue);
    console.log(userHistory);

    //5번의 기회를 다 쓰면 게임이 끝남. (더이상 추측 불가, 버튼이 disable)
    if (chances < 1) {
        gameOver = true;
    }
    if (gameOver == true) {
        playButton.disabled = true;
    }
}

//Reset 버튼을 누르면 게임이 리셋 됨.
//user input 창이 깨끗하게 정리되고, 새로운 번호가 생성 된다.
function reset() {
    userInput.value = '';
    pickRandomNum();

    resultArea.textContent = '결과가 나온다.';
}

pickRandomNum();
