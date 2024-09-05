exports.findCommonDurationInMinutesOptimized=(mentorTimes, menteeTimes) =>{
    let totalCommonDuration = 0; // in milliseconds
    let mentorIndex = 0;
    let menteeIndex = 0;

    // Loop through sorted intervals
    while (mentorIndex < mentorTimes.length && menteeIndex < menteeTimes.length) {
        const mentorJoin = new Date(mentorTimes[mentorIndex].join).getTime();
        const mentorLeave = new Date(mentorTimes[mentorIndex].leave).getTime();
        const menteeJoin = new Date(menteeTimes[menteeIndex].join).getTime();
        const menteeLeave = new Date(menteeTimes[menteeIndex].leave).getTime();

        const latestStart = Math.max(mentorJoin, menteeJoin);
        const earliestEnd = Math.min(mentorLeave, menteeLeave);

        if (latestStart < earliestEnd) {
            totalCommonDuration += (earliestEnd - latestStart); // In milliseconds
        }

        // Move to the next interval in the array that ends first
        if (mentorLeave < menteeLeave) {
            mentorIndex++;
        } else {
            menteeIndex++;
        }
    }

    // Convert milliseconds to minutes
    return totalCommonDuration / (1000 * 60);
}
 