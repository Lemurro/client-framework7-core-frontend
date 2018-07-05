/**
 * Получение кода
 *
 * @version 05.07.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
auth.getCode = function () {
    app.preloader.show();
    app.request.get(pathServerAPI + 'auth/code', {
        'auth_id': $$('#js-auth-' + bootstrap.settings.authType + '-get-form').find('input[name="auth_id"]').val()
    }, function (result) {
        app.preloader.hide();

        if (result.hasOwnProperty('errors')) {
            bootstrap.showErrors(result.errors);
        } else {
            var formCode = $$('#js-auth-' + bootstrap.settings.authType + '-check-form');

            formCode.find('.js-timer').show();
            formCode.find('.js-timer__count').text('60');
            formCode.find('.js-resend').hide();

            auth._runTimer();

            $$('#js-auth-' + bootstrap.settings.authType + '-get-form').hide();
            formCode.show();
        }
    });
};