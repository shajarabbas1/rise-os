import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleLogin = () => (
  <GoogleLogin
    onSuccess={() => console.log('success case')}
    onError={() => console.log('error case')}
    useOneTap
    text="signup_with"
  />
);
export default GoogleLogin;
