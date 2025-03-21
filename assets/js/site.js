document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    function validateForm(showErrorMessages = true) {
        let isValid = true;
        let errors = [];

        if (showErrorMessages) {
            document.querySelectorAll('input').forEach(input => {
                input.classList.remove('error');
            });
        }

        const firstname = document.getElementById('firstname');
        if (firstname.value.length < 2) {
            firstname.classList.add('error');
            errors.push('Fornavn skal være mindst 2 karakterer');
            isValid = false;
        } else if (/\d/.test(firstname.value)) {
            firstname.classList.add('error');
            errors.push('Fornavn må ikke indeholde tal');
            isValid = false;
        } else {
            firstname.classList.remove('error');
        }

        const lastname = document.getElementById('lastname');
        if (lastname.value.length < 2) {
            lastname.classList.add('error');
            errors.push('Efternavn skal være mindst 2 karakterer');
            isValid = false;
        } else if (/\d/.test(lastname.value)) {
            lastname.classList.add('error');
            errors.push('Efternavn må ikke indeholde tal');
            isValid = false;
        } else {
            lastname.classList.remove('error');
        }

        const address = document.getElementById('address');
        if (address.value.length < 5) {
            address.classList.add('error');
            errors.push('Adresse skal være mindst 5 karakterer');
            isValid = false;
        } else {
            address.classList.remove('error');
        }

        const zipcode = document.getElementById('zipcode');
        if (!/^\d+$/.test(zipcode.value) && zipcode.value.length > 0) {
            zipcode.classList.add('error');
            errors.push('Postnummer må kun indeholde tal');
            isValid = false;
        } else {
            zipcode.classList.remove('error');
        }

        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value) && email.value.length > 0) {
            email.classList.add('error');
            errors.push('Email skal være en gyldig email-adresse');
            isValid = false;
        } else {
            email.classList.remove('error');
        }

        console.log('Validerings resultat:', isValid ? 'Godkendt' : 'Fejl');
        if (!isValid) {
            console.log('Fejl:', errors);
        }

        if (showErrorMessages) {
            if (!isValid) {
                errorMessage.innerHTML = `<strong>Følgende problemer blev fundet:</strong><ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul>`;
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            } else {
                errorMessage.style.display = 'none';
                form.style.display = 'none';
                successMessage.style.display = 'block';
            }
        }

        return isValid;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        validateForm(true);
    });

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateForm(false);
            if (!this.value.trim()) {
                this.classList.add('error');
            }
        });

        input.addEventListener('input', function() {
            const field = this.id;
            const value = this.value;

            switch (field) {
                case 'firstname':
                case 'lastname':
                    if (/\d/.test(value)) {
                        this.classList.add('error');
                    } else if (value.length < 2) {
                        this.classList.add('error');
                    } else {
                        this.classList.remove('error');
                    }
                    break;

                case 'address':
                    if (value.length < 5) {
                        this.classList.add('error');
                    } else {
                        this.classList.remove('error');
                    }
                    break;

                case 'zipcode':
                    if (!/^\d*$/.test(value)) {
                        this.classList.add('error');
                    } else {
                        this.classList.remove('error');
                    }
                    break;

                case 'email':
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (value.length > 0 && !emailPattern.test(value)) {
                        this.classList.add('error');
                    } else {
                        this.classList.remove('error');
                    }
                    break;

                default:
                    break;
            }
        });
    });
});