
// Start
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {

       const usersDiv = document.createElement('div');
        usersDiv.classList.add('usersDiv');
        users.forEach(user => {
            const blokIdName = document.createElement('div');
            blokIdName.classList.add('blokIdName');
            blokIdName.innerHTML = `${user.id} .  ${user.name}`;

            const details = document.createElement('button');
            details.classList.add('knopka')
            details.textContent = 'Details';
            details.addEventListener('click', () => {
                window.location.href = `user-details.html?id=${user.id}`;
            });


            blokIdName.appendChild(details);
            usersDiv.appendChild(blokIdName);
            document.body.appendChild(usersDiv);

        });

    });


