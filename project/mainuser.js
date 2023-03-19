<!--    Info user   Display all, without exception, information about the clicked user object-->
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

        document.body.appendChild(userBlok);
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

document.body.appendChild(bigButton);