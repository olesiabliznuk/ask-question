document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e){
        e.preventDefault();
        let error = formValidate(form);
        let formData = new FormData(form);
        console.log(error);
        if (error === 0){
            let response = await fetch('https://60376bfd5435040017722533.mockapi.io/form', {
                method: 'POST',
                body: formData
            });
            if(response.ok){
                let result = await response.json();
                alert(result.text); 
                form.reset();
            }else{
                alert("Ошибка!");
            }
        }else{
            alert("Некорректно введены данные");
        }
    }

    function formValidate(form){
        let error = 0;
        let formin = document.querySelectorAll('.input');
        for(let i = 0; i < formin.length; i++)
        {
            const input = formin[i];
            formRemoveError(input);

           if (input.classList.contains('input_name')){
                if ( input.value === ""){
                    formAddError(input);
                    error++;
                }
                let reg = /^[А-Яа-яЁё-\s]+$/;
                if (!reg.test(input.value)){
                    formAddError(input);
                    error++;
                }
            }

            if (input.classList.contains('input_phone')){
                if ( input.value === ""){
                    formAddError(input);
                    error++;
                }
               /* let reg = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;*/
               let reg = /^[0-9-+\s]+$/;
                if (!reg.test(input.value)){
                    formAddError(input);
                    error++;
                }
            }

            if (input.classList.contains('input_email')){
                let reg = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
                if (!reg.test(input.value)){
                    formAddError(input);
                    error++;
                }
            }        
        }
        return error;
    }

    function formAddError(input){
        input.classList.add('error');
    }

    function formRemoveError(input){
        input.classList.remove('error');
    }
});


