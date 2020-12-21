module.exports = (days) => {
    let date = new Date();
    let oneDayTime = 24 * 60 * 60;
    let currentDayTime = Math.round(date / 1000);
    let tempTime = 0;
    let wantedDate = [];
    for (let i = 0; i < days; i++) {
        tempTime = currentDayTime + i * oneDayTime;
        wantedDate.push(tempTime);
    }
    let lastedDate = [];
    wantedDate.map(item => {
        lastedDate.push(transDate(item));
    });
    return lastedDate;

    function transDate(temp) {
        let date = new Date(temp * 1000);
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        let currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }

}