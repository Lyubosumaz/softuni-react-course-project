import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { history } from '../../../utils/history';
import { httpSocial } from '../../../services/http';
import schema from './edit-meme-validations';
import { setNotification } from '../../Notification/actions';
import { formComponent, formFieldsWrapper } from '../../../class-names.json';

function EditMeme({ isLogin, memeId, setNotificationSuccess, setNotificationError }) {
    const isLogged = isLogin;
    const memeIdProps = memeId;
    const [meme, setMeme] = useState(null);
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        httpSocial.getMeme(memeIdProps).then((meme) => {
            setMeme(meme);
            setTitle(meme.title);
            setImageUrl(meme.imageUrl);
        });
    }, [memeIdProps]);

    function handleTitle(event) {
        setTitle(event.target.value);
        validate(event);
    }

    function handleInputUrl(event) {
        setImageUrl(event.target.value);
        validate(event);
    }

    function validate(event) {
        const name = event.target.id;

        schema.fields[name]
            .validate(event.target.value, { abortEarly: false })
            .then(() => {
                setErrors({ ...errors, [name]: [] });
            })
            .catch((err) => {
                setErrors({ ...errors, [name]: err.errors });
            });
    }

    function handleEdit(e) {
        e.preventDefault();
        const data = {
            id: memeIdProps,
            title,
            imageUrl,
        };
        const hasErrors = Object.keys(errors).filter((key) => errors[key].length > 0);

        if (hasErrors.length === 0 && data.title && data.imageUrl && isLogged) {
            httpSocial
                .editMeme(data)
                .then((res) => {
                    setNotificationSuccess(res);
                    history.push('/social');
                })
                .catch((err) => {
                    setNotificationError(err);
                });
        }
    }

    return (
        <section className={`${formComponent}`}>
            <div className={`${formFieldsWrapper}`}>
                <form onSubmit={handleEdit}>
                    <div className="form-field">
                        <label htmlFor="Title">
                            <span>Title:</span>
                        </label>

                        {meme && <input type="text" placeholder="Write some funny title" className="form-input" id="title" onChange={handleTitle} value={title} />}

                        {Array.isArray(errors.title) && errors.title[0] ? (
                            <div className="form-error-message">
                                <span>{errors.title[0]}</span>
                            </div>
                        ) : (
                            <div className="form-error-container">
                                <span>Error Container</span>
                            </div>
                        )}
                    </div>

                    <div className="form-field">
                        <label htmlFor="imageUrl">
                            <span>imageUrl:</span>
                        </label>

                        {meme && <input type="text" placeholder="Copy and Paste your memeURL here" className="form-input" id="imageUrl" onChange={handleInputUrl} value={imageUrl} />}

                        {Array.isArray(errors.imageUrl) && errors.imageUrl[0] ? (
                            <div className="form-error-message">
                                <span>{errors.imageUrl[0]}</span>
                            </div>
                        ) : (
                            <div className="form-error-container">
                                <span>Error Container</span>
                            </div>
                        )}
                    </div>

                    <div className="form-field-buttons">
                        <input type="reset" className="form-action-btn" value="reset" />
                        <input type="submit" className="form-action-btn" value="edit meme" />
                    </div>
                </form>
            </div>
        </section>
    );
}

function mapStateToProps(state) {
    return {
        isLogin: state.user.isLogin,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setNotificationSuccess: (data) => dispatch(setNotification().success(data)),
        setNotificationError: (data) => dispatch(setNotification().error(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMeme);

EditMeme.propTypes = {
    isLogin: PropTypes.bool.isRequired,
    memeId: PropTypes.string.isRequired,
    setNotificationSuccess: PropTypes.func.isRequired,
    setNotificationError: PropTypes.func.isRequired,
};
