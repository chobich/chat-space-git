$(function(){
  function buildSendMessageHTML(message){
    var messageImage = message.image ? message.image:""
    var html =`<div class="right" data-id="${message.id}">
                 <div class="upper-message">
                  <div class="upper-message__chat_name">
                   ${message.user_name}
                  </div>
                  <div class="upper-message__chat_time">
                   ${message.created_at}
                  </div>
                 </div>
               <div class="lower-message">
                 <div class="lower-message__chat_comment">
                  ${message.content}
                  <img src="${messageImage}">
                 </div>
               </div>
              </div>`
    return html;
}
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    }
    )
    .done(function(message_data,status, xhr){
      var html = buildSendMessageHTML(message_data);
      $('.message-box').append(html).animate({scrollTop: $('.message-box')[0].scrollHeight});
      $('.form__submit').prop('disabled',false);
      $('#new_message')[0].reset();

    })
    .fail(function(){
      alert('error');
    })
})

$(function(){
    setInterval(updateMessage, 500);
  });

  function updateMessage(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {

    var latest_message_id = $('.right').last().data('id');
    $.ajax({
      url: location.href,
      type: 'GET',
      data: { id: latest_message_id },
      dataType: 'json'
    })

    .done(function(new_message){
      var insertHTML = '';
        new_message.forEach(function(message){
        insertHTML = buildSendMessageHTML(message);
      });
      $('.message-box').append(insertHTML);
      $('.message-box').animate({scrollTop: $('.message-box')[0].scrollHeight});
    })
    .fail(function(){
      alert('自動更新に失敗しました');
    });
  } else {
      clearInterval(updateMessage);
    }
  }

})
