
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const schema = Yup.object({
  email: Yup.string()
    .email('Введіть коректний email.')
    .required('Введіть email.'),

  password: Yup.string()
    .required('Введіть пароль.'),
});

function Login({ onLogin, onRegister }) {
  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          i&myFriends
        </div>

        <span className="eyebrow">
          MYFRIENDS
        </span>

        <h1>Вхід</h1>

        <p className="auth-description">
          Увійдіть до свого особистого кабінету.
        </p>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const result = await onLogin({
                email: values.email.trim(),
                password: values.password,
              });

              if (!result.success) {
                toast.error(result.message);
              } else {
                toast.success('Вітаємо!');
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="auth-form">

              <label>
                Email

                <Field
                  name="email"
                  type="email"
                  placeholder="Ваш email"
                  autoComplete="email"
                />

                <ErrorMessage
                  name="email"
                  component="span"
                  className="field-error"
                />
              </label>

              <label>
                Пароль

                <Field
                  name="password"
                  type="password"
                  placeholder="Ваш пароль"
                  autoComplete="current-password"
                />

                <ErrorMessage
                  name="password"
                  component="span"
                  className="field-error"
                />
              </label>

              <button
                type="submit"
                className="primary-button auth-button"
                disabled={isSubmitting}
              >
                Увійти
              </button>

            </Form>
          )}
        </Formik>

        <div className="auth-bottom">
          <span>
            Ще немає акаунта?
          </span>

          <button
            type="button"
            onClick={onRegister}
            className="auth-link"
          >
            Реєстрація
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;

