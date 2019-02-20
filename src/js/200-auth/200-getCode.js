/**
 * Получение кода
 *
 * @version 20.02.2019
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro.auth.getCode = function () {
    app.preloader.show();
    app.request.get(pathServerAPI + 'auth/code', {
        'auth_id': $$('#js-auth-' + lemurro.settings.authType + '-get-form').find('input[name="auth_id"]').val()
    }, function (result) {
        app.preloader.hide();

        if (result.hasOwnProperty('errors')) {
            lemurro.showErrors(result.errors);
        } else {
            if (result.data.hasOwnProperty('message')) {
                console.log(result.data.message, 'AuthCode');
            }

            var formCode = $$('#js-auth-' + lemurro.settings.authType + '-check-form');

            formCode.find('.js-timer').show();
            formCode.find('.js-timer__count').text('60');
            formCode.find('.js-resend').hide();

            lemurro.auth._runTimer();

            $$('#js-auth-' + lemurro.settings.authType + '-get-form').hide();
            formCode.show();
        }
    });
};