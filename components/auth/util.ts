import { save, get } from '../../utils/SesionStorage';

export const handlerIsLogin = (data: any) => {
    save('@token', data.token);
    save('@id_user', data.user._id);
    save('@name_user', data.user.name);
    save('@email_user', data.user.email);
    save('@userName', data.user.hasOwnProperty('userName')? data.user.userName: '');
    save('@path_avatar_user', data.user.hasOwnProperty('path_avatar') ? data.user.path_avatar : '');
    save('@confirmEmail', data.user.email_confirm ? "true" : 'false');
    save('@role', data.user.role);

    if (!data.hasOwnProperty('process') && data.process !== "register") {
    window.location.href = "/";
    }

}