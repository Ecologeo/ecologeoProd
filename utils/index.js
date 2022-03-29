const calculateTimePostExact = (date, dateCurrent, dBefore, dBeforeCurrent, dAfter, dAfterCurrent, strDate, numDate) => {
    if ((date < dateCurrent && (dateCurrent - date) > 1)
        || ((dateCurrent - date) === 1 && dBefore <= dBeforeCurrent)) {
        return "Hace " + (dateCurrent - date) + " " + strDate;
    } else if ((date > dateCurrent) && (dAfter < dAfterCurrent)) {
        return "Hace " + ((dateCurrent + numDate) - date) + " " + strDate
    } else {
        return ''
    }
  
  }
  
  const monthDays = [31,28,31,30,31,30,31,31,30,31,30,31]
  
  export const calculateTimePost = (year, yearCurrent, month, monthCurrent,
    day, dayCurrent, hour, hourCurrent, min, minCurrent) => {
   
    const strYear = calculateTimePostExact(year, yearCurrent, month, monthCurrent, 2, 1, 'A');
    const strMonth = calculateTimePostExact(month, monthCurrent, day, dayCurrent, year, yearCurrent, 'M', 12);
    const strDay = calculateTimePostExact(day, dayCurrent, hour, hourCurrent, month, monthCurrent, 'd', monthDays[month-1]);
    const strHour = calculateTimePostExact(hour, hourCurrent, min, minCurrent, day, dayCurrent, 'h', 24);
    if (strYear !== '') { return strYear }
    if (strMonth !== '') { return strMonth }
    if (strDay !== '') { return strDay }
    if (strHour !== '') { return strHour }
  
    if (min < minCurrent) {
        return "Hace " + (minCurrent - min) + " min"
    } else if (hour < hourCurrent) {
        return "Hace " + ((minCurrent + 60) - min) + " min"
    } else {
        return "Hace un momento";
    }
  }

export const  capitalize = (str) =>{
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export  const  concatFilter = (array3) =>{
    var a = array3.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i]._id === a[j]._id)
                a.splice(j--, 1);
        }
    }
    return a;
}

export const getNameUrl = (data) =>{
    const name = data.filter((el) => el.key == 'name');
    return name[0].value.replace("%","").replace("/","").toLowerCase().split(" ").join("-");
  }
export const getNameUrlSimple = (name) =>{
    return name.replace("%","").replace("/","").toLowerCase().split(" ").join("-");
  }