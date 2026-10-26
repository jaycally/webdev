/* 1. Select the form */
const form = document.getElementById("regform");

/* 2. Select all form fields */
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const genderInput = document.getElementById("gender");
const dobInput = document.getElementById("dob");
const countryInput = document.getElementById("country");
const phoneInput = document.getElementById("phone");
const bioInput = document.getElementById("bio");

/* 3. Select each field's error message */
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");
const genderError = document.getElementById("genderError");
const dobError = document.getElementById("dobError");
const countryError = document.getElementById("countryError");
const phoneError = document.getElementById("phoneError");
const bioError = document.getElementById("bioError");

/* 4. Select the remaining elements */
const successMsg = document.getElementById("successMsg");
const memberList = document.getElementById("memberList");
const count = document.getElementById("count");
const themeButton = document.getElementById("theme");

/* 5. Log the elements to confirm they exist */
console.log({
    form,
    nameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput,
    genderInput,
    dobInput,
    countryInput,
    phoneInput,
    bioInput,
    nameError,
    emailError,
    passwordError,
    confirmError,
    genderError,
    dobError,
    countryError,
    phoneError,
    bioError,
    successMsg,
    memberList,
    count,
    themeButton
});

/* Handle form submission and validate fields */
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Clear previous error messages
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmError.textContent = "";
    genderError.textContent = "";
    dobError.textContent = "";
    countryError.textContent = "";
    phoneError.textContent = "";
    bioError.textContent = "";

    let isValid = true;

    // Validate Full Name
    if (nameInput.value.trim() === "") {
        nameError.textContent = "Full name is required.";
        isValid = false;
    }

    // Validate Email
    if (emailInput.value.trim() === "") {
        emailError.textContent = "Email is required.";
        isValid = false;
    } else if (!emailInput.validity.valid) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    // Validate Password
    if (passwordInput.value === "") {
        passwordError.textContent = "Password is required.";
        isValid = false;
    } else if (passwordInput.value.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters.";
        isValid = false;
    }

    // Validate Confirm Password
    if (confirmPasswordInput.value === "") {
        confirmError.textContent = "Please confirm your password.";
        isValid = false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        confirmError.textContent = "Passwords do not match.";
        isValid = false;
    }

    // Validate Gender
    if (genderInput.value === "") {
        genderError.textContent = "Please select your gender.";
        isValid = false;
    }

    // Validate Date of Birth
    if (dobInput.value === "") {
        dobError.textContent = "Date of birth is required.";
        isValid = false;
    }

    // Validate Country
    if (countryInput.value.trim() === "") {
        countryError.textContent = "Country is required.";
        isValid = false;
    }

    // Validate Phone Number
    if (phoneInput.value.trim() === "") {
        phoneError.textContent = "Phone number is required.";
        isValid = false;
    }

    // Validate Bio
    if (bioInput.value.trim() === "") {
        bioError.textContent = "Please tell us something about yourself.";
        isValid = false;
    }

    // Stop if validation failed
    if (!isValid) {
        console.log("Please correct the errors.");
        return;
    }

    // Remove the empty-list message
    const emptyNote = document.getElementById("emptyNote");
    if (emptyNote) {
        emptyNote.remove();
    }

    // Create a new member list item
    const memberItem = document.createElement("li");
    memberItem.className = "member-item";

    const memberDetails = document.createElement("div");
    memberDetails.textContent =
        nameInput.value.trim() + " — " + emailInput.value.trim();

    // Create a remove button
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", function() {
        memberItem.remove();
        updateMemberCount();

        // Show the empty-list message if no members remain
        if (memberList.querySelectorAll(".member-item").length === 0) {
            const note = document.createElement("li");
            note.id = "emptyNote";
            note.className = "empty";
            note.textContent = "No members yet. Register someone to begin.";
            memberList.appendChild(note);
        }
    });

    // Add the details and button to the member item
    memberItem.appendChild(memberDetails);
    memberItem.appendChild(removeButton);
    memberList.appendChild(memberItem);

    // Update the counter
    updateMemberCount();

    // Show success message
    successMsg.textContent =
        "Registration successful! Welcome, " + nameInput.value.trim() + ".";
    successMsg.classList.remove("hidden");

    // Reset the form
    form.reset();

    console.log("Member registered successfully!");
});

/* Update the registered member counter */
function updateMemberCount() {
    const totalMembers = memberList.querySelectorAll(".member-item").length;
    count.textContent = totalMembers;
}

/* Clear field errors as the user edits the fields */
const fieldErrorPairs = [
    [nameInput, nameError],
    [emailInput, emailError],
    [passwordInput, passwordError],
    [confirmPasswordInput, confirmError],
    [genderInput, genderError],
    [dobInput, dobError],
    [countryInput, countryError],
    [phoneInput, phoneError],
    [bioInput, bioError]
];

fieldErrorPairs.forEach(function(pair) {
    const field = pair[0];
    const error = pair[1];

    field.addEventListener("input", function() {
        error.textContent = "";
    });

    field.addEventListener("change", function() {
        error.textContent = "";
    });
});

/* Toggle Dark Mode */
themeButton.addEventListener("click", function() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeButton.textContent = "Light Mode";
    } else {
        themeButton.textContent = "Dark Mode";
    }
});