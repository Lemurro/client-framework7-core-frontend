/**
 * Запуск таймера
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro.auth._runTimer = function () {
    if (lemurro.auth._timerID !== null) {
        clearInterval(lemurro.auth._timerID);
    }

    lemurro.auth._timerID = setInterval(function () {
        var formCode  = $$('#js-auth-' + lemurro.settings.authType + '-check-form');
        var elemTimer = formCode.find('.js-timer__count');
        var count     = parseInt(elemTimer.text(), 10);

        if (count > 0) {
            elemTimer.text(--count);
        } else {
            clearInterval(lemurro.auth._timerID);
            formCode.find('.js-timer').hide();
            formCode.find('.js-resend').show();
        }
    }, 1000);
};