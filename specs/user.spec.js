import UsersHelper from "../helpers/user.helper"
import ConfigHelper from "../helpers/config";
import { getRandomItem } from '../helpers/common.helper'
import { expect } from 'chai'


describe('Users', function () {
    let userHelper = new UsersHelper()
    let userId

    before(async function () {
        await userHelper.create()
        userId = userHelper.response.body.id
    })


    describe('User creation', function () {
        before(async function () {
            await userHelper.create()
        })
        it('response status is 200', function () {
            expect(userHelper.response.statusCode).to.eq(200)
        })
        it('response body contains user id', function () {
            expect(userHelper.response.body.id).not.to.be.undefined
        })
        it('response body contains initial amount', function () {
            expect(userHelper.response.body.amount).not.to.be.undefined
        })
    })

    describe('Get user by ID', function () {
        before(async function () {
            await userHelper.getById(userId)
        })

        it('response status is 200', function () {
            expect(userHelper.response.statusCode).to.eq(200)
        })
        it('response body contains user id', function () {
            expect(userHelper.response.body.id).not.to.be.undefined
        })
        it('response body contains initial amount', function () {
            expect(userHelper.response.body.amount).not.to.be.undefined
        })
    })

    describe('Get all users', function () {
        before(async function () {
            await userHelper.create()
            await userHelper.getAll()
        })

        it('response status is 200', function () {
            expect(userHelper.response.statusCode).to.eq(200)
        })
        it('response body contains list of 2 or more items', function () {
            expect(userHelper.response.body.length).to.be.at.least(2)
        })
        it('response body array item contains user id', function () {
            expect(getRandomItem(userHelper.response.body).id).not.to.be.undefined
        })
        it('response body array contains initial amount', function () {
            expect(getRandomItem(userHelper.response.body).amount).not.to.be.undefined
        })
    })
    describe('User deletion', function() {
        before(async function() {
            await userHelper.delete(userId)
        })

        it('response status code is 200', function () {
            expect(userHelper.response.statusCode).to.eq(200)
        })

        it('response body contains success message', function() {
            expect(userHelper.response.body.message).to.eq('User deleted.')
        })
    })
})


