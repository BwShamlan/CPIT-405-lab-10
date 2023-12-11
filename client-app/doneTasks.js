const apiUrl = 'http://localhost:3000/api';
let doneListElem = document.getElementById("doneList");

document.body.onload = function () {
    fetchDoneTasks().catch((e) => {
        console.error(e);
    });
}

async function fetchDoneTasks() {
    const response = await fetch(apiUrl + "/readDone.php");
    const doneTasks = await response.json();
    if (doneTasks && doneTasks.length > 0) {
        for (let item of doneTasks) {
            addDoneItem(item);
        }
    }
}

function addDoneItem(item) {
    let liElem = document.createElement("li");
    liElem.appendChild(document.createTextNode(item.task));
    doneListElem.appendChild(liElem);
}
