const express = require('express')
const Expense = require('../model/Expense')
const expenseData = require('../model/expenses.json')
const router = express.Router()

let dataArr = []
for (let n of expenseData) {
    let data = new Expense({
        name: n.item,
        amount: n.amount,
        date: n.date,
        group: n.group
    })
    dataArr.push(data)
}
// for (let i of dataArr)
//     i.save()

router.get('/expenses', function(req, res) {

    Expense.find({}, function(err, expenses) {
        res.send(expenses)
    })
})

router.post('/expense', function(req, res) {
    let expense = new Expense(req.body)
    expense.save()
    res.end()
})

router.put('/update/:group1/:group2', function(req, res) {
    let group1 = req.params.group1
    let group2 = req.params.group2
    Expense.findOneAndUpdate(group1, { group: group2 }, { new: true }, function(err, expense) {
        res.send(expense.name + " changed from " + group1 + " to " + group2)

    })
})

router.get('/expenses/:group', function(req, res) {
    let sum = 0
    let group = req.params.group
    let total = req.query
    if (total.total === "true") {
        Expense.find({ group: group }, function(err, expenses) {
            for (let n of expenses) {
                sum += n.amount
            }
            res.send("the amount of money spent on " + group + " is: " + sum)
        })
    } else {
        Expense.find({ group: group }, function(err, expenses) {
            res.send(expenses)
        })
    }
})

module.exports = router