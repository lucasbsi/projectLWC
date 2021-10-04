public with sharing class TriggerAccountHandler extends TriggerHandler{
    // public TriggerAccountHandler() {

    // }

    public override void afterInsert(){
        List<Opportunity> oppList = new List<Opportunity>();

        for(Account a : [SELECT Id, Name, Type, Account_Mail__c FROM Account
                        WHERE Id IN : Trigger.New AND
                        Id NOT IN (SELECT AccountId FROM Opportunity)]){
            //TriggerHandler.bypass('');
            if(a.Type == 'Pessoa física'){

                oppList.add(new Opportunity(Name=a.Name + 'Opportunity',
                StageName='Prospecting',
                CloseDate=System.today().addMonths(1),
                Type='New Customer',
                AccountId=a.Id                                    
                ));
                MailManager.sendMail(a.Account_Mail__c, 'Oportunidade', 
                                    'Você recebeu uma nova oportunidade acesse a conta  -> https://resilient-koala-2nzugd-dev-ed.lightning.force.com/lightning/r/Account/'+a.Id+'/view');          
            }                
        }
        if(oppList.size()> 0){
            insert oppList;
            
        }
    }
}