import 'dotenv/config'
import AuthHelper from "../helpers/auth-helper";
import ConfigHelper from "../helpers/config";


before(async function() {
    const authHelper = new AuthHelper()
    await authHelper.login(process.env.LOGIN, process.env.PASSWORD)
      process.env['TOKEN'] = authHelper.response.body.token
})

