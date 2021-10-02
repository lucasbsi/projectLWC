trigger triggerAccount on Account (after insert, after update) {
    List<Opportunity> oppList = new List<Opportunity>();

    for(Account a : [SELECT Id, Name, Type, Account_Mail__c FROM Account
                    WHERE Id IN : Trigger.New AND
                    Id NOT IN (SELECT AccountId FROM Opportunity)]){

        if(a.Type == 'Pessoa física'){

            oppList.add(new Opportunity(Name=a.Name + 'Opportunity',
            StageName='Prospecting',
            CloseDate=System.today().addMonths(1),
            Type='New Customer',
            AccountId=a.Id                                    
            ));
            MailManager.sendMail(a.Account_Mail__c, 'Oportunidade', 
                   'Você recebeu uma nova oportunidade');          
        }                
    }
    if(oppList.size()> 0){
        insert oppList;
        //String email = a.Account_Email__c;
        //String v1 = email;
        // MailManager.sendMail('lucas.triscal@gmail.com', 'Trailhead Trigger Tutorial by Lucas', 
        //            'teste'); 
    }

}