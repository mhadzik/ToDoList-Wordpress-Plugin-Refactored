jQuery(document).ready(function ($) {
    fetchTasksList($);
    addTasksList($);
});

function fetchTasksList($) {
    let ajax_url = ajax_object.ajax_url;

    let data = {
        'action': 'tasksList'

    };

    $.ajax({
        url: ajax_url,
        type: 'POST',
        data: data,
        dataType: 'json',
        success: function (response) {
            displayTasks(response);

        },
        error: function (request, textstatus, errorThrown) {
            console.log(request);
            console.log(textstatus);
            console.log(errorThrown);
        }
    });
}

function displayTasks(tasks) {
    document.body.querySelector('.tasksList').innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {

        let id = tasks[i].id;
        let task = tasks[i].task;
        let taskStatus = false;
        if (+tasks[i].taskStatus === 1)
            taskStatus = true;

        const div = document.createElement('div');

        div.className = `row align-middle row-d task-` + id;

        div.innerHTML = `<div class="col-8  column-b offset-1 column-r div-` + id + `">
                <input type="checkbox" class="align-middle input-cb i-` + id + `" value="` + taskStatus + `">
                <span class="align-middle span-task s-` + id + `">` + task + `</span>
            </div>
            <div class="col-1 text-center">
                <button type="button" 
                class="btn btn-outline-secondary btn-sm b-` + id + `">Delete</button>
            </div>
        `;
        document.body.querySelector('.tasksList').append(div);

        let input = document.body.querySelector('.i-' + id);
        let spanHolder = document.body.querySelector('.s-' + id);
        spanHolder.addEventListener('click', (event) => taskBodyChange(id, null, event))


        input.addEventListener('change', (event) => tasksUpdate(id, event, null))
        if (input.value === "true") {
            input.setAttribute("checked", "")
        }


        let btn = document.body.querySelector('.b-' + id)
        btn.addEventListener('click', () => onTaskDelete(id))

    }

}

// TaskBody Change

function taskBodyChange(id, taskStatusEvent, taskEvent) {
    let rowHolder = document.body.querySelector('.tasksList').querySelector('.div-' + id);
    let spanHolder = document.body.querySelector('.s-' + id);
    rowHolder.removeChild(spanHolder);

    let inputAdded = document.createElement('input');
    inputAdded.setAttribute('type', 'text');
    inputAdded.setAttribute('placeholder', 'Edit your task here...');
    inputAdded.className = 'align-bottom input-text taskAdd';
    rowHolder.appendChild(inputAdded);

    inputAdded.addEventListener('keyup', (keyEvent) => {
        if (keyEvent.key === 'Enter' && keyEvent.target.value !== '') {
            tasksUpdate(id, null, keyEvent.target.value)

            let newSpan = document.createElement('span')
            newSpan.className = "align-middle span-task"
            newSpan.innerHTML = keyEvent.target.value;
            rowHolder.removeChild(inputAdded);
            rowHolder.appendChild(newSpan);
        }
    })
}


// ADD TASKS
function addTasksList($) {
    const inputHolder = document.body.querySelector('.taskAdd');
    const checkboxHolder = document.body.querySelector('.taskAddCheckbox');
    inputHolder.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && event.target.value !== '') {
            let ajax_url = ajax_object.ajax_url;
            let data = {
                "action": "tasksAdd",
                "task": inputHolder.value,
                "taskStatus": +checkboxHolder.checked
            }

            $.ajax({
                url: ajax_url,
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function (response) {
                    displayTasks(response);
                },
                error: function (request, textstatus, errorThrown) {
                    console.log(request);
                    console.log(textstatus);
                    console.log(errorThrown);
                }
            });
        }

    });


}

// Delete tasks
function onTaskDelete(id) {
    let ajax_url = ajax_object.ajax_url;
    let data = {
        "action": "tasksDelete",
        "id": id
    }
    $.ajax({
        url: ajax_url,
        type: 'POST',
        data: data,
        dataType: 'json',
        success: function (response) {
            displayTasks(response);
        },
        error: function (request, textstatus, errorThrown) {
            console.log(request);
            console.log(textstatus);
            console.log(errorThrown);
        }
    });
}

// Tasks Update
function tasksUpdate(id, taskStatusEvent, taskEvent) {
    let ajax_url = ajax_object.ajax_url;
    let data;

    if (taskStatusEvent) {
        data = {
            "action": "tasksUpdate",
            "taskStatus": +taskStatusEvent.target.checked,
            "id": id
        }

        $.ajax({
            url: ajax_url,
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function (response) {
                //console.log(response)
            },
            error: function (request, textstatus, errorThrown) {
                console.log(request);
                console.log(textstatus);
                console.log(errorThrown);
            }
        });
    } else if (taskEvent) {
        data = {
            "action": "tasksUpdate",
            "task": taskEvent,
            "id": id
        }

        $.ajax({
            url: ajax_url,
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function (response) {
                //console.log(response)
            },
            error: function (request, textstatus, errorThrown) {
                console.log(request);
                console.log(textstatus);
                console.log(errorThrown);
            }
        });
    }



}