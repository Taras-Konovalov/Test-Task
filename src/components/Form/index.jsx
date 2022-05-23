import styles from "./Form.module.scss";
import { Formik } from "formik";
import Button from "../Button";
import classNames from "classnames";
import { useState, useEffect, useMemo } from "react";
import { API_URL } from "../../utils";
import { validationSchema, initialeFormValues } from "../../utils";
import { fetchToken, fetchPosition } from "../../utils/api";
import { MessagePopup } from "../MessagePopup";

export const Form = () => {
  const [positions, setPositions] = useState([]);
  const [token, setToken] = useState("");
  const [seletedPosition, setSelectedPositoin] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPopup, setIsPopup] = useState(false);

  const chosenPositionId = useMemo(() => {
    return positions.filter((pos) => pos.name === seletedPosition)[0]?.id;
  }, [seletedPosition]);

  useEffect(() => {
    fetchPosition().then((data) => {
      if (data.success) {
        setPositions(data.positions);
      }
    });
  }, []);

  useEffect(() => {
    fetchToken().then((data) => {
      if (data.success) {
        setToken(data.token);
      }
    });
  }, []);

  const createUser = (name, email, phone, position_id, photo) => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("position_id", position_id);
    formData.append("photo", photo);

    const headers = {
      Token: token,
    };

    fetch(API_URL.USERS_POST, {
      method: "POST",
      headers: headers,
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccess(true);
        } else {
          setErrorMessage(data.message);
          setIsPopup(true);
        }
      });
  };

  return (
    <section className={styles.form} id='signup'>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {success
            ? "User successfully registered"
            : "Working with POST request"}
        </h2>
        {success ? (
          <img
            src='/images/success.svg'
            className={styles.successImg}
            width='328'
            height='290'
            alt='success'
          />
        ) : (
          <Formik
            initialValues={initialeFormValues}
            validateOnBlur
            onSubmit={({ name, email, phone }) =>
              createUser(name, email, phone, chosenPositionId, file)
            }
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isValid,
              handleSubmit,
              dirty,
            }) => (
              <>
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                  <div className={styles.inputContainer}>
                    <input
                      type='text'
                      name='name'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      placeholder='Your name'
                      className={classNames(styles.name, {
                        [styles.errorName]: errors.name,
                      })}
                    />
                    {touched.name && errors.name && (
                      <p className={styles.error}>{errors.name}</p>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <input
                      type='text'
                      name='email'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder='Email'
                      className={classNames(styles.email, {
                        [styles.errorEmail]: errors.email,
                      })}
                    />
                    {touched.email && errors.email && (
                      <p className={styles.error}>{errors.email}</p>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <input
                      type='text'
                      name='phone'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                      placeholder='Phone'
                      className={classNames(styles.phone, {
                        [styles.errorPhone]: errors.phone,
                      })}
                    />
                    {touched.phone && errors.phone && (
                      <p className={styles.error}>{errors.phone}</p>
                    )}
                    {!(touched.phone && errors.phone) && (
                      <p className={styles.phoneNumber}>
                        +38 (XXX) XXX - XX - XX
                      </p>
                    )}
                  </div>
                  <h4 className={styles.selectTitle}>Select your position</h4>
                  <div className={styles.selectContainer}>
                    {positions.map(({ id, name }) => (
                      <div key={id} className={styles.select}>
                        <input
                          type='radio'
                          name='position'
                          id={id}
                          value={name}
                          onChange={(e) => setSelectedPositoin(e.target.value)}
                        />
                        <label htmlFor={id}>{name}</label>
                      </div>
                    ))}
                  </div>
                  <div className={styles.file}>
                    <input
                      type='file'
                      accept='.jpg, .jpeg'
                      onChange={({ target: { validity, files } }) => {
                        const file = files && files[0];
                        if (file && validity.valid) {
                          setFile(file);
                        }
                      }}
                      id='file'
                    />
                    <label htmlFor='file' className={styles.buttonFile}>
                      Upload
                    </label>
                    <div className={styles.nameFile}>
                      <span>{file ? file.name : "Upload your photo"}</span>
                    </div>
                  </div>
                  <div className={styles.buttonContainer}>
                    <Button
                      type='submit'
                      variant='signup'
                      disabled={
                        !(isValid && dirty) || !seletedPosition || !file
                      }
                    >
                      Sign up
                    </Button>
                  </div>
                </form>
              </>
            )}
          </Formik>
        )}
      </div>
      {isPopup && <MessagePopup message={errorMessage} onClick={setIsPopup} />}
    </section>
  );
};
