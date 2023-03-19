
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
            // document.body.appendChild(usersDiv);

        });
        const inrrElement = document.querySelector('.BoxHtml');
        inrrElement.appendChild(usersDiv);
    });


let urlSearch = new URLSearchParams(window.location.search);
let userId = urlSearch.get('id');
fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => response.json())
    .then(user => {
        const userBlok = document.createElement('div');
        userBlok.classList.add('userBlok')

        function createPropertyElement(key, value) {
            const propertyElement = document.createElement('p');
            propertyElement.classList.add('propertyElement');
            propertyElement.innerHTML = `${key}:`;

            if (typeof value === 'object') {
                const objectElement = document.createElement('span');
                objectElement.classList.add('objectElement');
                objectElement.innerHTML = '<br>';

                for (let objectKey in value) {
                    const objectValue = value[objectKey];
                    const objectProperty = createPropertyElement(objectKey, objectValue);
                    objectElement.appendChild(objectProperty);
                }

                propertyElement.appendChild(objectElement);
            } else {
                let valueElement = document.createElement('span');
                valueElement.classList.add('objectElement');
                valueElement.innerHTML = ` ${value}`;
                propertyElement.appendChild(valueElement);
            }

            return propertyElement;
        }

        for (let key in user) {
            const value = user[key];
            const propertyElement = createPropertyElement(key, value);
            userBlok.appendChild(propertyElement);
        }
        const inrrElement = document.querySelector('.BoxUserHtml');
        inrrElement.appendChild(userBlok);
        // document.body.appendChild(userBlok);
    });


// shows all posts of the current user

let bigButton = document.createElement('button');
bigButton.textContent = 'post of current user';
bigButton.classList.add('bigButton');
bigButton.addEventListener('click', () => {
    const urlSearch = new URLSearchParams(window.location.search);
    const userId = urlSearch.get('id');
    let postDiv = document.querySelector('.postDiv');
    if (postDiv) {
        postDiv.remove();
    }
    fetch(`https://jsonplaceholder.typicode.com/user/${userId}/posts`)
        .then(response => response.json())
        .then(posts => {
            postDiv = document.createElement('div');
            postDiv.classList.add('postDiv');
            posts.forEach(post => {
                const titleDiv = document.createElement('button');
                titleDiv.classList.add('titleDiv');
                titleDiv.textContent = post.title;
                titleDiv.addEventListener('click', () => {
                    window.location.href = `post-details.html?id=${post.id}`;

                })
                postDiv.appendChild(titleDiv);
            });

            document.body.appendChild(postDiv);
        })
        .catch(error => {
            console.error(error);
        });
});
const inrrElement = document.querySelector('.BoxUserHtml');
inrrElement.appendChild(bigButton);
// document.body.appendChild(bigButton);

