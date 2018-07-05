/**
 * Проверка сессии при запуске приложения
 *
 * @version 05.07.2018
 * @author Дмитрий Щербаков <atomcms@ya.ru>
 */

/**
 * Объект элемента
 *
 * @type {object}
 */
var auth = {};

/**
 * ИД таймера
 *
 * @type {int|null}
 *
 * @private
 */
auth._timerID = null;