$(function(){
  function buildHTML(message){
    var html =`
<div class="right">
<div class="upper-message">
<div class="upper-message__chat_name">
${message.user_name}
</div>
<div class="upper-message__chat_time">
2019/02/11 10:18
</div>
</div>
<div class="lower-message">
<div class="lower-message__chat_comment">
${message.content}
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
    .done(function(data){
      console.log(data);
      var html =buildHTML(data);
      $('.message-box').append(html).animate({scrollTop: $('.message-box')[0].scrollHeight});
      $('.form__submit').prop('disabled',false);
      $('.form__message').val('')
    })
    .fail(function(){
      alert('error');
    })
})
})
