const board_number = window.location.pathname.split('/board/')[1]

$.ajax({
    "url": `/api/v1/boards/board/${board_number}`,
    "method": "GET",
    "timeout": 0,
}).done(function (board) {
    console.log(board);
    $('#author').text(board.author === null ? 'anonymous' : board.author.username);
    $('#title').val(board.title);
    $('#contents').val(board.contents);
    $('#loaded_file').attr('src', board.loaded_file);
    $('#created_at').val(board.created_at);
    $('#modified_at').val(board.modified_at);
});
$(document).ready(function () {
    $("#btn").on("click", function () {
        var imgSrc = $("#loaded_file").attr("src");
        Tesseract.recognize(
            imgSrc,
            'eng',
            { logger: info => console.log(info) } 
        ).then(({ data: { text } }) => {
            $("#contents").val(text);
        });
    });
});