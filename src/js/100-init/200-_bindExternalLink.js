/**
 * Внешние ссылки откроем в браузере
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro._bindExternalLink = function () {
    $$(document).on('click', 'a[target="_blank"]', function (e) {
        window.open($$(this).attr('href'), '_system');
        e.preventDefault();

        return false;
    });
};