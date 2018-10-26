/**
 * Отображение ошибок
 *
 * @param errors array Массив ошибок
 *
 * @version 26.10.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
lemurro.showErrors = function (errors) {
    if (errors.length === 1 && errors[0].status === '401 Unauthorized') {
        lemurro._showLoginScreen();
    } else {
        for (var i in errors) {
            var item  = errors[i];
            var title = '';

            switch (item.code) {
                case 'danger':
                    title = 'Критическая ошибка';
                    break;

                case 'warning':
                    title = 'Внимание!';
                    break;

                case 'info':
                    title = 'Информация';
                    break;
            }

            app.dialog.alert(item.title, title);
        }
    }
};