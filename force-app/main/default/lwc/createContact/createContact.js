import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RecordFormExample extends LightningElement {

    tipo = '';
    _title = 'Atenção'
    message = ''
    variant = 'alert'
    mode = 'dismissible'
    cep = '';
    rua = '';
    
    handleSuccess(event) {
        this.showToast();
    }
    showToast() {
        const event = new ShowToastEvent({
            title: 'Validado!',
            message: 'Conta criada com sucesso!!',
            variant: 'success',
        });
        this.dispatchEvent(event);
    }
    tipoChange(event){
        this.tipo = event.target.value;
        
        if(this.tipo == 'Pessoa jurídica'){
            this.message = 'Contas do tipo Pessoa Jurídica não requerem endereço.'
            this.mode = 'sticky'
            this.showNotification();
            
        }else{
           // this.message = 'Preencher billing!!!'
           // this.showNotification();
            
        }
    }
   

    showNotification() {
        const evt = new ShowToastEvent({
            title: this._title,
            message: this.message,
            variant: this.variant,
            mode: this.mode,
        });
        this.dispatchEvent(evt);
    }

    showErrorToast() {
        const evt = new ShowToastEvent({
            title: 'Toast Error',
            message: 'Some unexpected error',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
    showSuccessToast() {
        const evt = new ShowToastEvent({
            title: 'Toast Success',
            message: 'Opearion sucessful',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
    showInfoToast() {
        const evt = new ShowToastEvent({
            title: 'Toast Info',
            message: 'Operation will run in background',
            variant: 'info',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    // /*-----------ViaCEP Webservice not working---------*/
    // limpa_formulário_cep() {
    //     //Limpa valores do formulário de cep.
    //     document.getElementById('rua').value=("");
    //     document.getElementById('bairro').value=("");
    //     document.getElementById('cidade').value=("");
    //     document.getElementById('uf').value=("");
    //     document.getElementById('ibge').value=("");
    // }

    // meu_callback(conteudo) {
    //     if (!("erro" in conteudo)) {
    //         //Atualiza os campos com os valores.
    //         document.getElementById('rua').value=(conteudo.logradouro);
    //         document.getElementById('bairro').value=(conteudo.bairro);
    //         document.getElementById('cidade').value=(conteudo.localidade);
    //         document.getElementById('uf').value=(conteudo.uf);
    //         document.getElementById('ibge').value=(conteudo.ibge);
    //     } //end if.
    //     else {
    //         //CEP não Encontrado.
    //         limpa_formulário_cep();
    //         alert("CEP não encontrado.");
    //     }
    // }
    // pesquisacep2(event){
    //     this.cep = event.target.value;
    // }
    
    // pesquisacep() {
        
    //      alert(this.cep);
         
    //      //Nova variável "cep" somente com dígitos.
    //     this.cep = this.cep.replace(/\D/g, '');
    //      //this.cep somente com dígitos.
    //     alert("cep - formatado"+this.cep);

    //     //Verifica se campo cep possui valor informado.
    //     if (this.cep != "") {

    //         //Expressão regular para validar o CEP.
    //         var validacep = /^[0-9]{8}$/;
    //         alert('valor de validacep'+validacep);
    //         alert('valor de validacep testando o this.cpf'+validacep.test(this.cep));

    //         //Valida o formato do CEP.
    //         if(validacep.test(this.cep)) {
    //             alert('entrei no if do validacep.test');
    //             //Preenche os campos com "..." enquanto consulta webservice.
    //             //document.getElementById('rua').value="...";
                
    //             alert('preenchi o campo rua com ...');
    //             // let theCep =document.querySelector
    //             // alert(theCep);
    //             document.getElementById('cep_custom').value="...";
    //             document.getElementById('bairro').value="...";
    //             document.getElementById('cidade').value="...";
    //             document.getElementById('uf').value="...";
    //             document.getElementById('ibge').value="...";

    //             //Cria um elemento javascript.
    //             var script = document.createElement('script');

    //             //Sincroniza com o callback.
    //             script.src = 'https://viacep.com.br/ws/'+ this.cep + '/json/?callback=meu_callback';
    //             alert(script.src);

    //             //Insere script no documento e carrega o conteúdo.
    //             document.body.appendChild(script);

    //         } //end if.
    //         else {
    //             //cep é inválido.
    //             limpa_formulário_cep();
    //             alert("Formato de CEP inválido.");
    //         }
    //     } //end if.
    //     else {
    //         //cep sem valor, limpa formulário.
    //         alert("cep nulooo");
    //         limpa_formulário_cep();
    //     }
    // };
    
}