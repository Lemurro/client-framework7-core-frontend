/**
 * Запуск приложения
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro._run = function () {
    app.preloader.show();
    app.request.get(pathServerAPI, {}, function (result) {
        app.preloader.hide();

        if (result.hasOwnProperty('errors')) {
            lemurro.showErrors(result.errors);
        } else {
            if (modeCordova && parseInt(result.data.version[device.platform.toLowerCase()], 10) > lemurro.settings.versionAPI) {
                var popup = $$('#js-popup');

                popup.find('.popup__title').html('&nbsp;');
                popup.find('.popup__content').html(
                    '<div class="text-align-center">' +
                    '<h1><i class="fas fa-thumbs-up font-100"></i></h1>' +
                    '<h1>Ура, вышла новая версия приложения!</h1>' +
                    '<h3>Чтобы продолжить, обновите приложение из магазина.</h3>' +
                    '<p><a href="javascript:lemurro.update();" class="button button-raised button-fill">Обновить</a></p>' +
                    '</div>'
                );
                popup.find('.close-popup').hide();

                app.popup.open(popup);
            } else {
                lemurro._bindShowPopover();
                lemurro._bindPhoneMask();
                lemurro._bindCodeMask();
                lemurro._bindExternalLink();

                localforage.getItem('sessionID', function (err, value) {
                    lemurro.sessionID = value;

                    if (lemurro.sessionID !== null) {
                        lemurro.auth.check();
                    }
                });
            }
        }
    });
};