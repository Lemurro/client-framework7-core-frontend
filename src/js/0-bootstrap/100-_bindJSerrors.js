/**
 * Событие отправки javascript-ошибки при возникновении
 *
 * @version 05.07.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
bootstrap._bindJSerrors = function () {
    /**
     * Отправка javascript-ошибки
     *
     * @param {string} msg
     * @param {string} file
     * @param {string} line
     * @param {string} col
     * @param {string} err
     *
     * @version 05.07.2018
     * @author  Дмитрий Щербаков <atomcms@ya.ru>
     */
    function sendError(msg, file, line, col, err) {
        var errString = 'JSON not found';
        if (window.JSON) {
            errString = JSON.stringify(err);
        }

        if (typeof(msg) === 'object') {
            file      = msg.filename;
            line      = msg.lineno;
            col       = msg.colno;
            errString = msg.error.stack;
            msg       = msg.message;
        }

        new Image().src = pathServerAPI + 'jserrors?msg=' + encodeURIComponent(msg) + '&file=' + encodeURIComponent(file) + '&line=' + encodeURIComponent(line) + '&col=' + encodeURIComponent(col) + '&err=' + encodeURIComponent(errString);
    }

    if (window.addEventListener) {
        window.addEventListener('error', sendError, false);
    } else if (window.attachEvent) {
        window.attachEvent('onerror', sendError);
    } else {
        window.onerror = sendError;
    }
};