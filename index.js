// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord);
}

function createTimeInEvent(object, date) {

    object.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0],
    })
    return object;
}

function createTimeOutEvent(object, date) {

    object.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0],
    })
    return object;
}

function hoursWorkedOnDate(object, date) {
    let timeInObject = {}
    object.timeInEvents.forEach(obj => {
        if (obj.date === date) {
          timeInObject = obj
        }
    })
    let timeOutObject = {}
    object.timeOutEvents.forEach(obj => {
        if (obj.date === date) {
            timeOutObject = obj
        }
    })
    return (timeOutObject.hour / 100) - (timeInObject.hour / 100);
}

function wagesEarnedOnDate(object, date) {
    let hoursWorked = hoursWorkedOnDate(object, date)
    return hoursWorked * object.payPerHour
}

function allWagesFor(object) {
    const array = []
    object.timeInEvents.forEach(obj => array.push(obj.date))
    const wagesArray = []
    array.forEach(d => wagesArray.push(wagesEarnedOnDate(object, d)))
    let totalWage = 0
    wagesArray.forEach(num => {
        totalWage += num
    })
    return totalWage
}

function calculatePayroll(array) {
    //I want to take each object from the array and pass it into allWagesFor because that will give me each employee's total wage
    let totalWageArray = []
    array.forEach(obj => totalWageArray.push(allWagesFor(obj)))
    let sum = 0
    totalWageArray.forEach(e => {
        sum += e
    })
    return sum
}