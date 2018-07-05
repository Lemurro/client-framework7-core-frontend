/**
 * Покажем всплывающее окно
 *
 * @param title   string Заголовок окна
 * @param content string HTML-Содержимое
 *
 * @version 05.07.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
helpers.showPopup = function (title, content) {
    var popup = $$('#js-popup');

    popup.find('.popup__title').html(title);
    popup.find('.popup__content').html(content);

    app.popup.open(popup);
};