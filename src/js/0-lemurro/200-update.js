/**
 * Запускаем обновление приложения
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro.update = function () {
    var market = 'market' + device.platform;

    if (modeCordova && lemurro.settings.hasOwnProperty(market)) {
        window.open(lemurro.settings[market], '_system');
        e.preventDefault();
    } else {
        app.dialog.alert('Здесь должна быть ссылка на магазин "' + device.platform + '"', 'Магазин');
    }

    return false;
};