import { Auth } from 'aws-amplify';
//REDUX-TOOLKIT ( accessing redux outside react component )
import { store } from '../toolkit/store';
import { changeIsLoading } from '../toolkit/isLoadingSlice';
import { changeIsConfirmedSignup } from '../toolkit/isConfirmedSignupSlice';
import { changeHoldUsernameSignup } from '../toolkit/holdUsernameSignupSlice';
import { changeIsUserSignedin } from '../toolkit/isUserSignedinSlice';
import { changeHoldNameOfUserUntilSignedIn } from '../toolkit/holdNameOfUserUntilSignedInSlice';
import { changeHoldIdOfUserUntilSignedIn } from '../toolkit/holdIdOfUserUntilSignedInSlice';
//GATSBY
import { navigate } from 'gatsby';
//SWEETALERT2
import { successAlert, errorAlert } from '../alerts';
//APPSYNC-MUTATIONS
import { handleCreateUser } from '../appsync_functions/mutations';







//*SIGNUP
export async function signUp({ username, password, email }) {
    //dispatching redux, for start loading
    store.dispatch(changeIsLoading(true));


    try {
        await Auth.signUp({
            username,
            password,
            attributes: {
                email,              //optional
                phone_number: '',   //optional
            }
        });


        //dispatching redux, for open confirmation form
        store.dispatch(changeIsConfirmedSignup(true));
    }
    catch(error) {
        console.log('error signingup:', error);
        //send text & error as parameter
        errorAlert('SignUp', error.message);
    }


    //dispatching redux, for stop loading
    store.dispatch(changeIsLoading(false));
}
//*CONFIRM SIGNUP
export async function confirmSignUp({ username, code }) {
    //dispatching redux, for start loading
    store.dispatch(changeIsLoading(true));


    try {
        await Auth.confirmSignUp(username, code);


        //pushing to DB by AppSync
        handleCreateUser(username);


        //routing to other page
        navigate('/');
        //send text as parameter
        successAlert('SignedUp');


        //dispatching redux, for close confirmation form
        store.dispatch(changeIsConfirmedSignup(false));
        //dispatching redux, emptying hold 'username'
        store.dispatch(changeHoldUsernameSignup(null));
    }
    catch(error) {
        console.log('error confirming signup', error);
        //send text & error as parameter
        errorAlert('SignUp', error.message);
    }


    //dispatching redux, for stop loading
    store.dispatch(changeIsLoading(false));
}







//*SIGNIN
export async function signIn({ username, password }) {
    //dispatching redux, for start loading
    store.dispatch(changeIsLoading(true));


    try {
        await Auth.signIn(username, password);


        //routing to other page
        navigate(`/welcome/${username}`);


        //dispatching redux, user is Signedin
        store.dispatch(changeIsUserSignedin(true));
        //dispatching redux, storing 'username' for use later
        store.dispatch(changeHoldNameOfUserUntilSignedIn(username));
    }
    catch(error) {
        console.log('error signingin', error);
        //send text & error as parameter
        errorAlert('SignIn', error.message);
    }


    //dispatching redux, for stop loading
    store.dispatch(changeIsLoading(false));
}







//*RESEND CODE
export async function resendConfirmationCode({ username }) {
    //dispatching redux, for start loading
    store.dispatch(changeIsLoading(true));


    try {
        await Auth.resendSignUp(username);

        //send text as parameter
        successAlert('Resended');
    }
    catch(error) {
        console.log('error resendingcode: ', error);
        //send text & error as parameter
        errorAlert('Resend', error.message);
    }


    //dispatching redux, for stop loading
    store.dispatch(changeIsLoading(false));
}







//*SIGNOUT
export async function signOut() {
    //dispatching redux, for start loading
    store.dispatch(changeIsLoading(true));


    try {
        await Auth.signOut();


        //dispatching redux, user is not Signedin
        store.dispatch(changeIsUserSignedin(false));
        //dispatching redux, emptying hold `user's id`
        store.dispatch(changeHoldIdOfUserUntilSignedIn(null));
        //dispatching redux, emptying hold 'username'
        store.dispatch(changeHoldNameOfUserUntilSignedIn(null));


        //routing to other page
        navigate('/');
        //send text as parameter
        successAlert('SignedOut');
    }
    catch(error) {
        console.log('error signing out: ', error);
        //send text & error as parameter
        errorAlert('SignOut', error.message);
    }


    //dispatching redux, for stop loading
    store.dispatch(changeIsLoading(false));
}