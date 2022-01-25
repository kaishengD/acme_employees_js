const employees = [
    { id: 1, name: 'moe'},
    { id: 2, name: 'larry', managerId: 1},
    { id: 4, name: 'shep', managerId: 2},
    { id: 3, name: 'curly', managerId: 1},
    { id: 5, name: 'groucho', managerId: 3},
    { id: 6, name: 'harpo', managerId: 5},
    { id: 8, name: 'shep Jr.', managerId: 4},
    { id: 99, name: 'lucy', managerId: 1}
];

const spacer = (text)=> {
    if(!text){
      return console.log('');
    }
    const stars = new Array(5).fill('*').join('');
    console.log(`${stars} ${text} ${stars}`);
}

function findEmployeeByName(name,employeesTable){
    for( let i = 0; i < employeesTable.length; i++){
        if(employeesTable[i].name === name){
            return employeesTable[i];
        }
    }
    return undefined;
}

function findEmployeeById(id,employeesTable){
    for( let i = 0; i < employeesTable.length; i++){
        if(employeesTable[i].id === id){
            return employeesTable[i];
        }
    }
    return undefined;
}


function findManagerFor(name, employeesTable){
    let employee = findEmployeeByName(name, employeesTable);

    return findEmployeeById(employee.managerId,employeesTable);
}

function findCoworkersFor(name,employeesTable){
    let employee = findEmployeeByName(name, employeesTable);
    return employeesTable.filter((currentElement)=>{
        if(currentElement.managerId === employee.managerId && currentElement.id !== employee.id){
            return currentElement;
        }
    })
}

function findManagementChainForEmployee(name,employeesTable){
    let employee = findEmployeeByName(name,employeesTable);
    let returnArr = [];
    while(employee.managerId){
        let manager = findManagerFor(employee.name,employeesTable);
        returnArr.splice(0,0,manager);
        employee = manager;
    }
    return returnArr;
}

function generateManagementTree(employeesTable){
    let returnObj;
    let managerId = []
    //find the employee who dont have a manager;
    for(let i = 0; i < employeesTable.length; i++){
        if(employeesTable[i].managerId === undefined){
            returnObj = employeesTable[i];
            returnObj['report'] = []
        }
        if(!managerId.includes(employeesTable[i].managerId) && employeesTable[i].managerId){
            managerId.push(employeesTable[i].managerId);
        }
    }
    //find employee who dont have reports
    let noReportsEmployees = [];
    for(let i = 0 ; i <employeesTable.length; i++){
        if(!managerId.includes(employeesTable[i].id)){
            noReportsEmployees.push(employeesTable[i])
        }
    }

    for(let i = 0 ; i <noReportsEmployees.length; i++){
        let managementChain = findManagementChainForEmployee(noReportsEmployees[i].name, employeesTable);
        let objChain = noReportsEmployees[i];
        objChain['report'] =[];
        for( let j = managementChain.length -1 ; j > 0 ; j--){
            let currentManager = managementChain[j];
            currentManager['report'] = [];
            currentManager.report.push(objChain);
            objChain = currentManager;
        }
        returnObj.report.push(objChain);
    }
    return returnObj;
}

function findManagementChainForEmployee(name,employeesTable){
    let employee = findEmployeeByName(name,employeesTable);
    let returnArr = [];
    while(employee.managerId){
        let manager = findManagerFor(employee.name,employeesTable);
        returnArr.splice(0,0,manager);
        employee = manager;
    }
    return returnArr;
}


// spacer('findEmployeeByName Moe')
// console.log(findEmployeeByName('moe', employees));
// spacer('')

// spacer('findManagerFor Shep Jr.')
// console.log(findManagerFor('shep Jr.', employees));
// spacer('')

// spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager
// console.log(findCoworkersFor('larry', employees));
/*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

// spacer('');

// spacer('findManagementChain for shep Jr.')
// console.log(findManagementChainForEmployee('shep Jr.', employees));
spacer('generateManagementTree')
console.log(JSON.stringify(generateManagementTree(employees), null, 2));