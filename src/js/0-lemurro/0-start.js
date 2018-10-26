/**
 * Загрузочный скрипт приложения
 *
 * @version 26.10.2018
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

/**
 * ИД сессии
 *
 * @type {string}
 */
lemurro.sessionID = '';

/**
 * Настройки приложения
 *
 * @type {object}
 */
lemurro.settings = {};

/**
 * Настройки framework7
 *
 * @type {object}
 */
lemurro.f7settings = {};