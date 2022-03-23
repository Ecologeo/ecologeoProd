import React, { ChangeEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import styles from '../../pages/recoverPassword/stylesrp.module.scss';

export default function RecoverPasswordComponent(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const [classNamePassword, setClassNamePassword] = useState('strong-password');
  var strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  var mediumRegex = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  );

  const onSubmit = (data: any) => {
    props.onSubmit(data);
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const validatePassword = (value: string) => {
    let state: boolean = false;
    let className: string = 'weak-password'
    let msg: string =
      "La contraseña debe contener 6 dígitos con valores alfanumericos, opcional puedes incluir carácteres especiales y mayúsculas";
    if (strongRegex.test(value)) {
      className = 'strong-password';
      state = true;
    } else if (mediumRegex.test(value)) {
      className = 'medium-password';
      state = true;
    }
    setClassNamePassword(className)
    return (state) ? state : msg;
  };

  const onChangePassword = (value: any) => {
    validatePassword(value.nativeEvent.target.value);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.containerSeccion}>
          <label className={styles.formLabel}>Restablecer Contraseña:</label>
          <div
            className={`pass-wrapper form-control ${classNamePassword} `}
          >            
            <input
              type={passwordShown ? "text" : "password"}
              {...register("password", {
                required: "La contraseña es requerida",
                validate: {
                  validatePassword: (v) => validatePassword(v),
                },
              })}
              onChange={onChangePassword}
              className={styles.field}
              placeholder="Nueva Contraseña"
            />
            <i onClick={togglePasswordVisiblity}>
                <FaRegEye />
            </i>
          </div>
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>
        <div className={styles.containerSeccion}>
          <button
            type="submit"
            className={styles.btn}
          >
            Restablecer
          </button>
        </div>
      </form>
    </div>
  );
}
