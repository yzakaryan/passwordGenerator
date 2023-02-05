const passValue = document.querySelector(".password-box input");
const copyBtn = document.querySelector(".password-box #copy-btn");
const passIndicator = document.querySelector(".indicator-box .indicator");
const passLength = document.querySelector(".password-length-box input");
const passLengthText = document.querySelector(".password-length-box .pass-length-value");
const options = document.querySelectorAll(".settings div label input");
const generateBtn = document.querySelector(".generate-btn");
const lowercaseCheck = document.querySelector("#lowercase");

const values = {
	uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	lowercase: "abcdefghijklmnopqrstuvwxyz",
	numbers: "0123456789",
	symbols: "!@#$%^&(*)-+/><.,:}{][="
};

lowercaseCheck.addEventListener("change", (e) => {
	e.target.setAttribute("checked", "")
});

function generatePassword () {
	let strongPassword = "";
	let randomPassword = "";

	let length = passLength.value;

	options.forEach(option => {
		if (option.checked) {
			strongPassword += values[option.id];
		}
	});

	for (let i = 0; i < length; i++) {
		randomPassword += strongPassword[Math.floor(Math.random() * strongPassword.length)]
	}

	passValue.value = randomPassword;
}

copyBtn.addEventListener("click", () => {
	navigator.clipboard.writeText(passValue.value);
});

function updateIndicator () {
	if (passLength.value <= 8) {
		passIndicator.id = "weak";
	} else if (passLength.value <= 16) {
		passIndicator.id = "medium";
	} else {
		passIndicator.id = "strong";
	}
}

passLength.addEventListener("input", () => {
	generatePassword();
	updateIndicator();
	passLengthText.textContent = passLength.value;
});

generateBtn.addEventListener("click", generatePassword);