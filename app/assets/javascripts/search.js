$(document).on('turbolinks:load', function() {
  $(function(){

  var search_list = $("#user-search-result");
  var member_list = $("#chat-group-users");

  function appendUser(user){
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>
               `
               search_list.append(html);
             }
  function appendNoUser(user){
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user }</p>
                </div>
               `
               search_list.append(html);
             }

  function addUser(user_id, user_name){
   var html = `
              <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                <p class='chat-group-user__name'>${ user_name }</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>
              `
              member_list.append(html);
  }

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();

    $.ajax({
      url: '/users',
      type: "GET",
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(user){
      $("#user-search-result").empty();
      if (user.length !== 0){
        user.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function(){
      alert('error');
    })
});
  $(document).on("click",".user-search-add",function(){
    var user_id = $(this).attr("data-user-id");
    var user_name = $(this).attr("data-user-name");
    $(this).parent().remove();
    addUser(user_id, user_name);
  });
  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  });
});
});
