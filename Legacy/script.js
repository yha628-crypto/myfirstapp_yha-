// HTML의 onclick 속성에서 직접 호출할 수 있도록 함수를 선언합니다.

function goToLogin() {
    window.location.href = 'login.html';
}

function goToSignup() {
    window.location.href = 'signup.html';
}

// 회원가입 폼 제출을 처리하는 함수입니다.
function handleSignup(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    if (password !== passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
        return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const isDuplicate = storedUsers.some(function (user) {
        return user.email === email;
    });

    if (isDuplicate) {
        alert("이미 가입된 이메일입니다. 다른 이메일을 사용하거나 로그인해주세요.");
        return;
    }

    const newUser = {
        name: name,
        email: email,
        password: password
    };

    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
    document.querySelector('.auth-form').reset();
    goToLogin();
}

// 로그인 폼 제출을 처리하는 함수입니다.
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 로컬 스토리지에서 유저 목록 가져오기
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // 이메일과 비밀번호가 모두 일치하는 유저가 있는지 확인
    const validUser = storedUsers.find(function (user) {
        return user.email === email && user.password === password;
    });

    if (validUser) {
        // 로그인 성공 시 화면 내용 변경
        const h2 = document.querySelector('h2');
        if (h2) h2.innerHTML = "로그인 성공! 🎉";

        const subtitle = document.querySelector('.subtitle');
        if (subtitle) subtitle.innerHTML = `${validUser.name}님 환영합니다!`;

        // 폭죽 터트리기 (canvas-confetti)
        if (typeof confetti !== 'undefined') {
            var duration = 3 * 1000;
            var animationEnd = Date.now() + duration;
            var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            var interval = setInterval(function () {
                var timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                var particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#00f2fe', '#4facfe', '#fa709a', '#fee140']
                }));
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#00f2fe', '#4facfe', '#fa709a', '#fee140']
                }));
            }, 250);
        } else {
            alert(validUser.name + "님 로그인되었습니다!");
        }

        // 폭죽이 터지는 시간 후 메인 페이지로 이동
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3500);

    } else {
        alert("이메일이나 비밀번호가 일치하지 않습니다.");
    }
}
