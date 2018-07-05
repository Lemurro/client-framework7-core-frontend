/**
 * Отображение ошибок
 *
 * @param errors array Массив ошибок
 *
 * @version 05.07.2018
 * @author  Дмитрий Щербаков <atomcms@ya.ru>
 */
bootstrap.showErrors = function (errors) {
    if (errors.length === 1 && errors[0].status === '401 Unauthorized') {
        bootstrap._showLoginScreen();
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