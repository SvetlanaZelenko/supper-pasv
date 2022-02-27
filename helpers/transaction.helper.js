import supertest from 'supertest'


// let userHelper = new UsersHelper()
// //let userId = userHelper.response.body.id
//
// // for debugging only
//let senderId = "77b370a5-1552-464a-b069-9492ea961fe7"
//let receiverId = "77b370a5-1552-464a-b069-9492ea961fe8"

class TransactionHelper {
    response

    async create(senderId, receiverId, amount) {
        await supertest(process.env.BASE_URL)
            .post('/transactions')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .send({from: senderId, to: receiverId, amount: amount})
            .then(res => {
                this.response = res
            })
    }

    async getTransaction(transactionId) {
        await supertest(process.env.BASE_URL)
            .get(`/transactions?id=${transactionId}`)
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .then(res => {
                this.response = res
            })
    }

    async getAll() {
        await supertest(process.env.BASE_URL)
            .get('/transactions')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .then(res => {
                this.response = res
            })
    }


}
export default TransactionHelper