import React, { useState } from 'react';
import { PageFooter } from '../../page-footer/page-footer';
import PageHeader from '../../page-header/page-header';
import { connect } from 'react-redux';
import { AppRoutes, AuthorizationStatus, loadingStates } from '../../../const';
import { Redirect } from 'react-router-dom';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { getAuthStatus, getLoginError, getLoginStatus } from '../../../store/auth/selectors';
import { login } from '../../../store/auth/async-actions';

const formFields = [
  {
    name: 'email',
    label: 'Email address',
    value: '',
    error: '',
    validate: {
      fn: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      errorText: 'Please enter a valid email address!',
    },
  },
  {
    name: 'password',
    label: 'Password',
    value: '',
    error: '',
    validate: {
      fn: (value) => value.trim().length !== 0,
      errorText:
        'The password field must contain at least one character and not consist entirely of whitespace characters!',
    },
  },
];

const validate = (fields) =>
  fields.map((field) =>
    field.validate.fn(field.value)
      ? { ...field, error: '' }
      : { ...field, error: field.validate.errorText },
  );

function SignIn({ authStatus, doLogin, loginStatus, formError }) {
  const [formData, setFormData] = useState(formFields);

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    const changedFieldIdx = formData.findIndex((field) => field.name === name);
    const newField = { ...formData[changedFieldIdx], value };

    setFormData([
      ...formData.slice(0, changedFieldIdx),
      newField,
      ...formData.slice(changedFieldIdx + 1),
    ]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const validatedFields = validate(formData);

    setFormData(validatedFields);

    if (validatedFields.every(({ error }) => !error)) {
      const [email, password] = formData;
      doLogin({ email: email.value, password: password.value });
    }
  };

  if (authStatus === AuthorizationStatus.AUTH) {
    return <Redirect to={AppRoutes.MAIN} />;
  }

  return (
    <div className="user-page">
      <PageHeader title={'Sign In'} />

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={submitHandler} noValidate>
          {formError && (
            <div className="sign-in__message">
              <p>
                We can’t recognize this email <br /> and password combination. Please try again.
              </p>
            </div>
          )}

          {formData.some(({ error }) => error) && (
            <>
              {formData
                .filter(({ error }) => error)
                .map((field) => (
                  <div key={field.name} className="sign-in__message">
                    <p>{field.validate.errorText}</p>
                  </div>
                ))}
            </>
          )}

          <div className="sign-in__fields">
            {formData.map(({ name, label, value, error }) => (
              <div
                key={name}
                className={cn('sign-in__field', {
                  'sign-in__field--error': error,
                })}
              >
                <input
                  className="sign-in__input"
                  type="text"
                  placeholder={label}
                  name={name}
                  id={name}
                  value={value}
                  onChange={changeInputHandler}
                />
                <label className="sign-in__label visually-hidden" htmlFor={name}>
                  {label}
                </label>
              </div>
            ))}
          </div>
          <div className="sign-in__submit">
            <button
              className="sign-in__btn"
              type="submit"
              disabled={loginStatus === loadingStates.LOADING}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <PageFooter />
    </div>
  );
}

const mapStateToProps = (state) => ({
  loginStatus: getLoginStatus(state),
  formError: getLoginError(state),
  authStatus: getAuthStatus(state),
});

const mapDispatchToProps = {
  doLogin: login,
};

SignIn.propTypes = {
  authStatus: PropTypes.string.isRequired,
  loginStatus: PropTypes.string.isRequired,
  formError: PropTypes.string.isRequired,
  doLogin: PropTypes.func.isRequired,
};

export { SignIn };
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
