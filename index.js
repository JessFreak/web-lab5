document.addEventListener('DOMContentLoaded', () => {
	changeHeaderAndFooter();

	const base1 = 5;
	const base2 = 8;
	const height = 4;
	calculateAndDisplayArea(base1, base2, height);

	checkCookiesAndReload();

	changePositions();
});

const changeHeaderAndFooter = () => {
	const headerText = document.querySelector('.header-text h1');
	const footerText = document.querySelector('.footer-text h1');

	const tempText = headerText.innerHTML;
	headerText.innerHTML = footerText.innerHTML;
	footerText.innerHTML = tempText;
};

const calculateAndDisplayArea = (base1, base2, height) => {
	const area = (base1 + base2) * height / 2;

	const resultSpan = document.getElementById('trapArea');

	resultSpan.textContent = `з числами ${base1} ${base2} ${height}: ${area.toString()}`;

	const resultParagraph = document.getElementById('resultParagraph');
	resultParagraph.style.display = 'block';
};

const reverseAndDisplayNumber = () => {
	const numberInput = document.getElementById('numberInput').value;
	const reversedNumber = parseInt(numberInput.toString().split('').reverse().join(''));

	window.alert(`Перевернуте число: ${reversedNumber}`);
	document.cookie = `reversedNumber=${reversedNumber}; expires=${new Date(Date.now() + 3600000).toUTCString()}`;

	document.getElementById('reverseForm').style.display = 'none';
};

const getCookie = (name) => {
	const cookies = document.cookie.split(';');
	for (const cookie of cookies) {
		const [cookieName, cookieValue] = cookie.trim().split('=');
		if (cookieName === name) {
			return cookieValue;
		}
	}
	return null;
};

const checkCookiesAndReload = () => {
	const reversedNumber = getCookie('reversedNumber');
	if (reversedNumber !== null) {
		const userResponse = window.confirm(`Cookies знайдено! Перевернуте число: ${reversedNumber}\nВи хочете зберегти дані з cookie?`);
		if (userResponse) {
			window.alert('Дані збережено. Перезавантажте сторінку.');
		} else {
			document.cookie = 'reversedNumber=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
			document.getElementById('reverseForm').style.display = 'block';
			location.reload();
		}
	} else {
		document.getElementById('reverseForm').style.display = 'block';
	}
};

const changePositions = () => {
	const radioButtons = document.querySelectorAll('input[type="radio"]');
	const blocks = [document.querySelector('.nav-bar'), document.querySelector('.content'), document.querySelector('.right')];

	radioButtons.forEach(radioButton => {
		radioButton.addEventListener('click', (event) => {
			const alignment = event.target.value;

			blocks.forEach(block => {
				block.style.textAlign = alignment;
				block.style.justifyContent = alignment;
			});

			localStorage.setItem('alignment', alignment);
		});
	});

	const savedAlignment = localStorage.getItem('alignment');
	if (savedAlignment) {
		blocks.forEach(block => {
			block.style.textAlign = savedAlignment;
			block.style.justifyContent = savedAlignment;
		});

		document.querySelector(`input[value="${savedAlignment}"]`).checked = true;
	}
};
