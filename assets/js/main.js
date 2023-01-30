class validaFormulario {
    constructor() {
      this.formulario = document.querySelector(`.formulario`);
      this.eventos();
    }
    eventos() {
      this.formulario.addEventListener("submit", (e) => {
        this.handleSubmit(e);
      });
    }
  
    handleSubmit(e) {
      e.preventDefault();
     const camposValidos = this.campoSaoValidos();
     const senhasValidas = this.senhasSaoValidas();
     if(camposValidos && senhasValidas){
      alert('formulario enviado.')
      this.formulario.submit();
     }
  
     
    }
  
    senhasSaoValidas(){
      let valid = true;
  
      const senha = this.formulario.querySelector('.senha');
      const repetirSenha = this.formulario.querySelector('.repetir-senha');
  
      if(senha.value !== repetirSenha.value){
          valid = false;
          this.criaErro(senha,'campos senha e repetir senha precisa ser iguais');
          this.criaErro(repetirSenha, 'campos senha e repetir senha precisa ser iguais.')
      }
      if(senha.value.length < 6 || senha.value.length > 12){
          valid = false;
          this.criaErro(senha,'senha precisa estar entre 6 e 12 caracteres. ')
      }
      return valid;
    }
  
    campoSaoValidos() {
      let valid = true;
  
      for (let erroText of this.formulario.querySelectorAll(`.erro-Text`)) {
        erroText.remove();
      }
      for (let campo of this.formulario.querySelectorAll(`.validar`)) {
        const label = campo.previousElementSibling.innerHTML;
  
        if (!campo.value) {
          this.criaErro(campo, `campo "${label}"não pode ficar em branco.`);
          valid = false;
        }
        
        if (campo.classList.contains('CPF')) {
          if (!this.validaCPF(campo)) 
          valid = false;
        }
        if (campo.classList.contains('Usuário')) {
          if (!this.validaUsuario(campo)) 
          valid = false;
        }
      }
      return valid;
    }
  
    validaUsuario(campo){
      const usuario = campo.value;
      let valid = true;
      
      if(usuario.length > 12 || usuario.length < 3){
          this.criaErro(campo,'Usuário precisa ter entre 3 e 12 caracteres.' )
          valid = false;
      }
  
      if(!usuario.match(/^[a-zA-Z0-9]+$/g)){
          this.criaErro(campo,'Nome Usuário precisa conter apenas letras e números.' )
          valid = false;
      }
      return valid;
    }
    validaCPF(campo) {
      const cpf = new ValidaCPF(campo.value);
  
      if (!cpf.valida()) {
        this.criaErro(campo,'CPF inválido.');
        return false;
      }
      return true;
    }
  
    criaErro(campo, msg) {
      const div = document.createElement("div");
      div.innerHTML = msg;
      div.classList.add("erro-Text");
      campo.insertAdjacentElement("afterend", div);
    }
  }
  
  const valida = new validaFormulario();
  