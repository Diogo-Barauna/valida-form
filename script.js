class ValidaForm{
    constructor(){
        this.form = document.querySelector('.form')
        this.events();
    };
    events(){
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    };
    // Checa se os campos são válidos e envia o formulário
    handleSubmit(e){
        e.preventDefault();
        const validFields = this.isValidField();
        const validPass = this.isValidPass();

        if(validFields && validPass){
            alert('Formulário enviado!');
            // this.form.submit();
        };
    };
    // Checa se a senha é válida
    isValidPass(){
        let valid = true;
        const pass = this.form.querySelector('.pass')
        const repeatPass = this.form.querySelector('.repeatPass')
        if(pass.value !== repeatPass.value){
            this.createError(repeatPass,'Campos senha e repetir senha precisam ser iguais')
            valid = false;
        }
        if(pass.value.length < 6 || pass.value.length > 12){
            this.createError(pass,'Senha deve ter entre 6 e 12 caracteres')
            valid = false;
        }
        return valid;
    }
    // Checa se os campos CPF e Usuário são válidos e se não estão em branco
    isValidField(){
        let valid = true;
        // Remove os erros quando o formulário for enviado para evitar de se acumularem na tela
        for(let errorText of this.form.querySelectorAll('.error-text')){
            errorText.remove();
        }
        for (let field of this.form.querySelectorAll('.auth')){
            const label = field.previousElementSibling.innerText.toLowerCase();
            if (!field.value){
                this.createError(field,`Campo ${label} não pode estar em branco`)
                valid = false;
            }
            if (field.classList.contains('cpf')){
                if(!this.authCPF(field)) valid = false;
            }
            if (field.classList.contains('user')){
                if(!this.authUser(field)) valid = false;
            }
        }
        return valid;
    }
    // Função que valida o usuário
    authUser(field){
        const user = field.value;
        let valid = true;
        if (user.length < 3 || user.length > 12){
            this.createError(field,'Usuário deve ter entre 3 e 12 caracteres')
            valid = false;
        };
        if (!user.match(/^[a-zA-Z0-9]+$/g)){
            this.createError(field,'Usuário só pode conter letras e/ou números')
            valid = false;
        };
        return valid;
    };
    // Função que valida o CPF
    authCPF(field){
        const cpf = new ValidaCPF(field.value);
        if(!cpf.valida()){
            this.createError(field, 'CPF inválido')
            return false;
        }
        return true;
    }
    // Função que cria o erro na tela
    createError(field, msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    };
};
const valida = new ValidaForm();
