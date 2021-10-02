import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RecordFormExample extends LightningElement {

    tipo = '';
    _title = 'Atenção'
    message = ''
    variant = 'alert'
    mode = 'dismissible'
    
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

    // verificaTipo(){
        
    //     if(this.tipo == 'Pessoa jurídica'){
    //         alert("deu certo")
    //         this.message = 'Contas do tipo Pessoa Jurídica não requerem endereço.'
    //         this.showNotification();
    //     }else{
    //         alert("errado");
    //         this.message = 'Preencher billing!!!'
    //         this.showNotification();
    // }}


   

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
}