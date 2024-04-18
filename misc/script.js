const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

// async function addUser(username, password, email) {
//     try {
//         const client = await pool.connect();
//         const query = 'INSERT INTO users (username, password, email) VALUES ($1, $2, $3)';
//         const values = [username, password, email];
//         await client.query(query, values);
//         console.log('User added successfully');
//         client.release();
//     } catch (error) {
//         console.error('Error adding user:', error);
//     }
// }

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get the values of the input fields
    var username = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;
    // var agreedToTerms = document.getElementById("termsInput").checked;
    
    // Do something with the values, such as validation or sending them to a server
    console.log("Username:", username);
    console.log("Password:", password);
    // console.log("Agreed to terms:", agreedToTerms);
});

