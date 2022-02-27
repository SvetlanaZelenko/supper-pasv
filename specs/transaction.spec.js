import TransactionHelper from '../helpers/transaction.helper'
import { expect } from 'chai'
import { getRandomItem } from '../helpers/common.helper'
import ConfigHelper from "../helpers/config";
import UsersHelper from "../helpers/user.helper"

describe('Transaction', function () {
    let userHelper = new UsersHelper()
    let transactionHelper = new TransactionHelper()
    let senderId, receiverId
    let amount = Math.floor(Math.random() * 200)
    let transactionId
    before(async function () {
        await userHelper.create()
        senderId = userHelper.response.body.id
        await userHelper.create()
        receiverId = userHelper.response.body.id
        await transactionHelper.create(senderId, receiverId, amount)
        transactionId = transactionHelper.response.body.id

    })

    describe('Transaction creation', function () {
        before(async function () {
            await transactionHelper.create(senderId, receiverId, amount)
        })
        it('response status is 200', function () {
            expect(transactionHelper.response.statusCode).to.eq(200)
        })
        it('response body contains transaction id', function () {
            expect(transactionHelper.response.body.id).not.to.be.undefined
        })
        it('response body contains senderId', function () {
            expect(transactionHelper.response.body.id).not.to.be.undefined
        })
        it('response body contains receiverId', function () {
            expect(transactionHelper.response.body.id).not.to.be.undefined
        })
        it('response body contains initial amount', function () {
            expect(transactionHelper.response.body.amount).to.eq(amount)
        })
    })

        describe('Get transaction by id', function (transactionId) {
            before(async function () {
                await transactionHelper.create(senderId, receiverId, amount)
                transactionId = transactionHelper.response.body.id
                await transactionHelper.getTransaction(transactionId)
            })

            it('response status is 200', function () {
                expect(transactionHelper.response.statusCode).to.eq(200)
            })
            it('response body contains transaction id', function () {
                expect(transactionHelper.response.body.id).to.eq(transactionId)
            })
            it('response body contains initial amount', function () {
                expect(transactionHelper.response.body.amount).to.eq(amount)
            })
            it('response body contains senderId', function () {
                expect(transactionHelper.response.body.from).to.eq(senderId)
            })
            it('response body contains receiverId', function () {
                expect(transactionHelper.response.body.to).to.eq(receiverId)
        })
        })
        describe('Get all transactions', function () {
            before(async function () {
                await transactionHelper.create(senderId, receiverId, amount)
                await transactionHelper.getAll()

            })

            it('response status is 200', function () {
                expect(transactionHelper.response.statusCode).to.eq(200)
            })
            it('response body contains list of 2 or more items', function () {
                expect(transactionHelper.response.body.length).to.be.at.least(2)
            })
            it('response body array contains transactions id', function () {
                expect(getRandomItem(transactionHelper.response.body).id).not.to.be.undefined
            })
            it('response body contains senderId', function () {
                expect(getRandomItem(transactionHelper.response.body).id).not.to.be.undefined
            })
            it('response body contains receiverId', function () {
                expect(getRandomItem(transactionHelper.response.body).id).not.to.be.undefined
            })
            it('response body contains initial amount', function () {
                expect(getRandomItem(transactionHelper.response.body).amount).not.to.be.undefined
            })
        })
    })





