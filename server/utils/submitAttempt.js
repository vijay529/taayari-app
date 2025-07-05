import Attempt from "../models/Attempt.model"

export const submitAttemptFun = async(attempId)=>{
    const attempt = await Attempt.findById(attempId);
    const now = new Date();
    const attemptDuration = (now.getTime() - attempt.startedAt.getTime())/1000
    const expiryDuration = (attempt.expiresAt.getTime()- attempt.startedAt.getTime())/1000
    if(expiryDuration<attemptDuration){
        attempt.status="expired";
    }else{
        attempt.status="submitted";
    }
    attempt.submittedAt=now;
    attempt.duration=attemptDuration;
    let total = 0;
    for(const ans of attempt.answers){
        if(ans.correctIndex!==undefined&&ans.selectedIndex!==undefined&&ans.correctIndex===ans.selectedIndex){
            total++
        }
    }
    attempt.score=total
    await attempt.save()
}