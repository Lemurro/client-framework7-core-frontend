/**
 * Загрузочный скрипт приложения
 *
 * @version 05.07.2018
 * @author Дмитрий Щербаков <atomcms@ya.ru>
 */

var app;
var $$;
var mainView;

window.onload = function () {
    if (modeCordova) {
        document.addEventListener('deviceready', bootstrap.init);
        document.addEventListener('offline', internet.offline);
        document.addEventListener('online', internet.online);
    } else {
        bootstrap.init();
    }
};

/**
 * Объект главного скрипта
 *
 * @type {object}
 */
var bootstrap = {};

/**
 * ИД сессии
 *
 * @type {string}
 */
bootstrap.sessionID = '';

/**
 * Настройки приложения
 *
 * @type {object}
 */
bootstrap.settings = {};

/**
 * Настройки framework7
 *
 * @type {object}
 */
bootstrap.f7settings = {};