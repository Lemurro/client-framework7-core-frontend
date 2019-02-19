/**
 * Загрузочный скрипт приложения
 *
 * @version 19.02.2019
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */

var app;
var $$;
var mainView;

window.onload = function () {
    if (modeCordova) {
        document.addEventListener('deviceready', lemurro.init);
        document.addEventListener('offline', lemurro.internet.offline);
        document.addEventListener('online', lemurro.internet.online);
    } else {
        lemurro.init();
    }
};

/**
 * Объект главного скрипта
 *
 * @type {object}
 */
var lemurro = {};