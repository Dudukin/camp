window.onload = function () {
    const scroll = () => {
        let div = document.querySelector(".phone");
        let footerHeight = document.querySelector("footer").offsetHeight;
        let docHeight = document.documentElement.scrollHeight;

        window.addEventListener('scroll', () => {
            let scrolled = window.pageYOffset || document.documentElement.scrollTop;

            if (scrolled > (docHeight - footerHeight - document.documentElement.clientHeight)) {
                div.classList.add("phone__active");
            } else {
                div.classList.remove("phone__active");
            }
        });
    }
    const form = () => {
        let closeBtn = document.querySelectorAll('.cross')[0];
        let formWrapper = document.querySelectorAll('.form-wrapper')[0];
        let phone = document.querySelector(".phone");

        closeBtn.addEventListener('click', () => {
            formWrapper.classList.toggle('form-active');
        })
        phone.addEventListener('click', () => {
            formWrapper.classList.toggle('form-active');
        })
        setTimeout(() => {
            let formIsDisabled = sessionStorage.getItem('form');
            if (!formIsDisabled) {
                formWrapper.classList.add('form-active');
                sessionStorage.setItem('form', true);
            }
        }, 5000)
    }
    const lightGalleryInit = () => {
        lightGallery(document.getElementById('lightgallery'), {
            thumbnail: true,
            animateThumb: false,
            showThumbByDefault: true
        });
    }
    const formValidation = () => {
        let nameInput = document.querySelector('.forms input[name="name"]');
        let emailInput = document.querySelector('.forms input[name="email"]');
        let telInput = document.querySelector('.forms input[name="tel"]');
        let textInput = document.querySelector('.forms textarea');
        let formSubmit = document.querySelector('.forms input[type="submit"]');
        let form = document.querySelectorAll('.form-wrapper')[0];

        // console.log(emailInput);
        // console.log(nameInput);
        // console.log(telInput);
        // console.log(textInput);
        // console.log(formSubmit);

        formSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            let error = false;
            if (!nameInput.value) {
                nameInput.classList.add('error')
                error = true
            } else {
                nameInput.classList.remove('error')
            }
            if (!emailInput.value) {
                emailInput.classList.add('error')
                error = true
            } else {
                emailInput.classList.remove('error')
            }
            if (!telInput.value) {
                telInput.classList.add('error')
                error = true
            } else {
                telInput.classList.remove('error')
            }

            if (!error) {
                let data = {
                    name: nameInput.value,
                    email: emailInput.value,
                    tel: telInput.value,
                    text: textInput.value
                };
                let response = fetch('php/handlers/FormHandler.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: JSON.stringify(data)
                }).then((response) => {
                    if (response.status === 200) {
                        // let success = document.querySelectorAll('.getintouch__success')[0];
                        // success.classList.add('getintouch__active');
                        alert("Ваши данные успешно отправлены!");
                        form.classList.remove('form-active');
                        nameInput.value = "";
                        emailInput.value = "";
                        telInput.value = "";
                        textInput.value = "";
                    }
                });
            }
        })
    }

    lightGalleryInit();
    scroll();
    form();
    formValidation();
}

