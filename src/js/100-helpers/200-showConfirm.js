/**
 * Покажем подтверждение
 *
 * @param {string}   title              Заголовок
 * @param {string}   content            HTML-Содержимое
 * @param {string}   confirmButtonText  Текст кнопки "OK"
 * @param {string}   cancelButtonText   Текст кнопки "Cancel"
 * @param {function} callbackOpen       Функция при открытии формы
 * @param {function} callbackPreConfirm Функция перед вызовом callbackConfirm
 * @param {function} callbackConfirm    Функция при нажатии confirmButton
 * @param {function} callbackCancel     Функция при нажатии cancelButton
 *
 * @version 05.07.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
helpers.showConfirm = function (title, content, confirmButtonText, cancelButtonText, callbackOpen, callbackPreConfirm, callbackConfirm, callbackCancel) {
    swal({
        title             : title,
        html              : content,
        type              : '',
        allowOutsideClick : false,
        showCancelButton  : true,
        confirmButtonColor: '#2196f3',
        confirmButtonText : confirmButtonText,
        cancelButtonText  : cancelButtonText,
        onOpen            : callbackOpen,
        preConfirm        : callbackPreConfirm
    }).then(function () {
        callbackConfirm();
    }, function (dismiss) {
        // dismiss can be 'cancel', 'overlay', 'close', and 'timer'
        if (dismiss !== '' && callbackCancel !== null) {
            callbackCancel();
        }
    });
};