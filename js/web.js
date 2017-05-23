$(window).on('load', (() => {
    $.get("./static/data.json", (data) => {
        begin(data);
    }).fail((data) => {
        console.log(data);
        error(data.status + ' ' + data.statusText);
    });
}));

function begin(data) {
    console.log(data);
};

function error (message) {
    new window.ErrorMessageView ({
        model: new window.ErrorMessageModel ({
            message: message
        })
    }).render();
}