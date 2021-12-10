import * as settings from './../../config/index.config';

import AuthServiceJWT from './AuthServiceJWT/AuthServiceJWT';
import AuthServiceSession from './AuthServiceSession/AuthServiceSession';


// Just get a correct AuthService depends on
let AuthService = settings.auth.authType === settings.auth.authTypeEnum.JWT ? AuthServiceJWT : AuthServiceSession;

export default AuthService;
//export default settings.auth.authType === settings.auth.authTypeEnum.JWT ? AuthServiceJWT : AuthServiceSession;