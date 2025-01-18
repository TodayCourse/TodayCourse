const id = document.getElementById('id')
const password = document.getElementById('password')
const login = document.getElementById('login-btn')
let error = 0;

login.addEventListener('click', () => {
  
    if (id.value == 'today') {
        if (password.value == '0000') {
            alert('로그인 되었습니다!')
            location.href = "./main.html";
        }
        else {
            alert('아이디 또는 비밀번호를 다시 확인해주세요!')
            error ++;
        }
    }
    else {
        alert('존재하지 않는 계정입니다.')
    }

    if (errStack >= 5) {
        alert('비밀번호 찾기를 눌러주세요.')
    }
})