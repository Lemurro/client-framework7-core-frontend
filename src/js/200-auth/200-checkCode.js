/**
 * Проверка введенного кода
 *
 * @version 19.02.2019
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro.auth.checkCode = function () {
    var deviceInfo = {
        uuid        : 'q1w2e3r4t5y6u7i8o9p0',
        platform    : 'TestOS',
        version     : '1.0',
        manufacturer: 'Samsung',
        model       : 'Galaxy S8'
    };

    if (modeCordova) {
        deviceInfo = {
            uuid        : device.uuid,
            platform    : device.platform,
            version     : device.version,
            manufacturer: device.manufacturer,
            model       : device.model
        };
    }

    app.preloader.show();
    app.request.post(pathServerAPI + 'auth/code', {
        'auth_id'    : $$('#js-auth-' + lemurro.settings.authType + '-get-form').find('input[name="auth_id"]').val(),
        'auth_code'  : $$('#js-auth-' + lemurro.settings.authType + '-check-form').find('input[name="auth_code"]').val(),
        'device_info': deviceInfo
    }, function (result) {
        app.preloader.hide();

        if (result.hasOwnProperty('errors')) {
            lemurro.showErrors(result.errors);
        } else {
            localforage.setItem('sessionID', result.data.session, function () {
                lemurro.sessionID = result.data.session;

                app.loginScreen.close('#js-login-screen');
                app.views.main.router.navigate(lemurro.settings.pageAfterAuth);
            });
        }
    });
};