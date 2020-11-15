import { connect } from 'react-redux';
import history from '../../utils/history';
import handleRoute from '../../utils/handleRoutes';
import http from '../../services/http';
import { toast } from 'react-toastify';
import { removeAllCookies } from '../../services/cookies';
import './logout.css';
import { setLogoutValue } from '../login/actions';

function Logout(props) {

    const yesButtonHandler = (e) => {
        e.preventDefault();
        http.User.logout()
            .then((res) => {
                toast(res.message, {
                    type: toast.TYPE.SUCCESS,
                });
                removeAllCookies();
                props.setLogoutValue()
                history.push('/home');
            })
            .catch((err) => {
                toast(err.message, {
                    type: toast.TYPE.ERROR,
                });
            });
    };

    return (
        <div className="main-container">
            <form>
                <h1>Logout</h1>
                <p>Do you really want to logout?</p>

                <div>
                    <button type="submit" className="logout-button" name="yes-btn" onClick={yesButtonHandler}><span>Yes</span></button>
                    <button type="submit" className="logout-button" name="no-btn" onClick={handleRoute('/home')}><span>No!</span></button>
                </div>

                <div className="info-container">
                    <p>Check out the new features in latest update <button className="info-button" onClick={handleRoute('/about')}>Here</button>.</p>
                </div>
            </form>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isLogin: state.user.isLogin,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setLogoutValue: () => dispatch(setLogoutValue()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
