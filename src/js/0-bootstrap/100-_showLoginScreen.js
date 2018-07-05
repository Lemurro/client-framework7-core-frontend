/**
 * Покажем форму входа
 *
 * @version 05.07.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
bootstrap._showLoginScreen = function () {
    $$('#js-login-screen .js-auth-form').hide();
    $$('#js-auth-' + bootstrap.settings.authType + '-get-form').show();
    app.loginScreen.open('#js-login-screen');
};