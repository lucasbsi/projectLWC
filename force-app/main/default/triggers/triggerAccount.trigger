trigger triggerAccount on Account (after insert, after update) {
    
    
    new TriggerAccountHandler().run();

}