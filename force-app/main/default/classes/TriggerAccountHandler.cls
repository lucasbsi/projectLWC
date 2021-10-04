public with sharing class TriggerAccountHandler extends TriggerHandler{
    // public TriggerAccountHandler() {

    // }

    public override void afterInsert(){
        List<Opportunity> oppList = new List<Opportunity>();
        List<FeedItem> posts = new List<FeedItem>();
        //CollaborationGroup chatterGroup = [SELECT Id FROM CollaborationGroup WHERE Name = 'ChatterGroupName' LIMIT 1];

        for(Account a : [SELECT Id, Name, Type, Account_Mail__c FROM Account
                        WHERE Id IN : Trigger.New AND
                        Id NOT IN (SELECT AccountId FROM Opportunity)]){
            //TriggerHandler.bypass('');
            if(a.Type == 'Pessoa física'){
                Opportunity oppTemp = new Opportunity(Name=a.Name + 'Opportunity',
                StageName='Prospecting',
                CloseDate=System.today().addMonths(1),
                Type='New Customer',
                AccountId=a.Id                                    
                );
                oppList.add(oppTemp);
                String message = 'Você recebeu uma nova oportunidade acesse a conta  -> https://resilient-koala-2nzugd-dev-ed.lightning.force.com/lightning/r/Account/'+a.Id+'/view';
                MailManager.sendMail(a.Account_Mail__c, 'Oportunidade', 
                                    message);
                FeedItem post = new FeedItem(ParentId = a.Id,
                                            Title = oppTemp.Name,
                                            Body = message);
                                        // SendCustomNotification customNo =    new CustomNotification()
                                        //     .type('MyNotificationType')
                                        //     .title('Fun Custom Notification')
                                        //     .body('Custom Notifications are Awesome!')
                                        //     .sendToCurrentUser();
                                        Messaging.CustomNotification notification = new Messaging.CustomNotification();
                                        notification.setBody('This is body of the custom notification!');
                                        notification.setTitle('Hi this is first notification sent using apex!');
                                        notification.setSenderId(a.Id);
                                        notification.setNotificationTypeId(typeId );
                                        notification.setTargetId(a.Id); // target object id
                                        notification.send(new Set<String> {a.Id }); // target user id.
                posts.add(post);          
            }                
        }
        if(oppList.size()> 0){
            insert oppList;
            insert posts;
            
        }

        // trigger ChatterPostWonOpp on Opportunity (after update) {
        //     List<FeedItem> posts = new List<FeedItem>();
        //     List<Opportunity> updatedOpps = [SELECT Name, Account.Name, Owner.Name, Amount FROM Opportunity WHERE Id IN :Trigger.newMap.keySet() AND IsWon = true];
        //     CollaborationGroup chatterGroup = [SELECT Id FROM CollaborationGroup WHERE Name = 'ChatterGroupName' LIMIT 1];
        //     for (Opportunity opp : updatedOpps) {
        //         String status = opp.Owner.Name + ' just won ' + opp.Account.Name + ' for ' + opp.Amount + '!';
        //         FeedItem post = new FeedItem(
        //             ParentId = chatterGroup.Id,
        //             Title = opp.Name,
        //             Body = status
        //         );
        //         posts.add(post);
        //     }
        //     insert posts;
        // }
    }
}
