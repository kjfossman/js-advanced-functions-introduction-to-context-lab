// Your code here
function createEmployeeRecord(row){
    return {
    timeInEvents: [],
    timeOutEvents: [],
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3]
    }
}

function createEmployeeRecords(rowData){
    return rowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let hoursWorkedOnDate = function(employee, dateWork){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === dateWork 
    })

    let OutEvent = employee.timeOutEvents.find(function(e){
        return e.date === dateWork
    })
        return (OutEvent.hour - inEvent.hour)/100
}

let wagesEarnedOnDate = function(employee, dateEarned){
    let rawWage = hoursWorkedOnDate(employee, dateEarned) * employee.payPerHour
    return rawWage
} 

let allWagesFor = function(employee){
    let dates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = dates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}

let findEmployeeByFirstName = function(array, firstName){
    let employee = array.find(function(e){
        return e.firstName === firstName 
    })
    return employee
}
