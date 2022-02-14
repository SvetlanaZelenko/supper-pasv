import supertest from 'supertest'

class AuthHelper {
    response

  async login(username, password)  {
    await supertest(process.env.BASE_URL)
        .post('/auth')
<<<<<<< HEAD
        .send({ login: username, password: password })
=======
        .send({ login: 'username', password: 'password' })
>>>>>>> 114253f (add file auth-helper (#6))
        .then(res => {
          this.response = res
        })
  }
}

export default AuthHelper