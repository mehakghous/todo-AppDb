var input = document.getElementById("input")
var li;
var liTxt;
var dltBtn;
var edtBtn;
var check;
var value;

var list = document.getElementById("ul");
firebase.database().ref("todos").on('child_added', function (data) {
    li = document.createElement('li');
    console.log(data.val());
    liTxt = document.createTextNode(data.val().value);
    dltBtn = document.createElement('i');
    dltBtn.setAttribute('class', 'fas fa-trash ');
    dltBtn.setAttribute('id', data.val().key)
    dltBtn.setAttribute('onclick', 'dltTodo(this)')
    edtBtn = document.createElement('i');
    edtBtn.setAttribute('id', data.val().key);
    edtBtn.setAttribute('class', 'fa fa-edit ');
    edtBtn.setAttribute('onclick', 'editTodo(this)')
    check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.style.margin = "5px"
    li.appendChild(check);
    li.appendChild(liTxt);
    li.appendChild(edtBtn);

    li.appendChild(dltBtn);

    list.appendChild(li);
    input.value = ""
})

function addTodo() {
    var key = firebase.database().ref("todo").push().key
    var todo = {
        value: input.value,
        key: key
    }
    console.log(key);
    if (input.value == "") {
        alert("enter any todo")
        return false;
    }
    firebase.database().ref("todos").child(key).set(todo)

}

function dltTodo(e) {
    console.log(e.id)
    firebase.database().ref("todos").child(e.id).remove();
    e.parentNode.remove();

}

function deleteAll() {
    firebase.database().ref("todos").remove()
    list.innerHTML = ""
}

function editTodo(e) {
    value = e.parentNode.firstChild.nextSibling.nodeValue
    var editVal = prompt("enter edited value", value);
    var newTodo = {
        value: editVal,
        key: e.id
    }
    firebase.database().ref(`todos/${e.id}`).set(newTodo)
    e.parentNode.firstChild.nextSibling.nodeValue = editVal;
}