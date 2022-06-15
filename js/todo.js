function createToDoItem(todo) {
  text  = '<div class="input-group">';
  text += '  <input type="text" class="form-control" value="'+ todo + '" disabled="disabled">';
  text += '  <span class="input-group-btn">';
  text += '    <button class="btn btn-default" type="button" id="removeItem">Done</button>';
  text += '  </span>';
  text += '</div>';
  return text;

}

function save() {

}

$(document).ready(function(){
  $("#addItem").on("click", function(){
    text = $("#todoInput").val();
    $("#todoInput").val("");
    $("#listArea").append(createToDoItem(text));
  })
});
