/**
 * Проверка введенного кода
 *
 * @version 05.07.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
auth.checkCode = function () {
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
        'auth_id'    : $$('#js-auth-' + bootstrap.settings.authType + '-get-form').find('input[name="auth_id"]').val(),
        'auth_code'  : $$('#js-auth-' + bootstrap.settings.authType + '-check-form').find('input[name="auth_code"]').val(),
        'device_info': deviceInfo
    }, function (result) {
        app.preloader.hide();

        if (result.hasOwnProperty('errors')) {
            bootstrap.showErrors(result.errors);
        } else {
            localforage.setItem('sessionID', result.data.session, function () {
                Deferred.next(function () {
                    bootstrap.sessionID = result.data.session;
                }).next(function () {
                    app.loginScreen.close('#js-login-screen');
                    app.router.navigate(bootstrap.settings.pageAfterAuth);
                });
            });
        }
    });
};