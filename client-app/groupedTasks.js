const apiUrl = 'http://localhost:3000/api';
let groupedListElem = document.getElementById("groupedList");

document.body.onload = function () {
    fetchGroupedTasks().catch((e) => {
        console.error(e);
    });
}

async function fetchGroupedTasks() {
    const response = await fetch(apiUrl + "/readGrouped.php");
    const groupedTasks = await response.json();
    if (groupedTasks && Object.keys(groupedTasks).length > 0) {
        for (let date in groupedTasks) {
            if (groupedTasks.hasOwnProperty(date)) {
                addGroupedTasks(date, groupedTasks[date]);
            }
        }
    }
}

function getHumanReadableDate(date) {
    const today = new Date();
    const taskDate = new Date(date);
    
    const diffInDays = Math.floor((today - taskDate) / (24 * 60 * 60 * 1000));

    if (diffInDays === 0) {
        return "Today";
    } else if (diffInDays === 1) {
        return "Yesterday";
    } else if (diffInDays > 1 && diffInDays <= 7) {
        return `Last ${diffInDays} days ago`;
    } else {
        return date;
    }
}

function addGroupedTasks(date, tasks) {
    let humanReadableDate = getHumanReadableDate(date);

    let dateHeadingElem = document.createElement("h3");
    dateHeadingElem.appendChild(document.createTextNode(humanReadableDate));
    groupedListElem.appendChild(dateHeadingElem);

    let ulElem = document.createElement("ul");

    tasks.forEach(item => {
        let liElem = document.createElement("li");
        liElem.appendChild(document.createTextNode(item.task));
        ulElem.appendChild(liElem);
    });

    groupedListElem.appendChild(ulElem);
}
