const expect = require('chai').expect;
const mongoose = require('mongoose');

const User = require('../models/user');
const Task = require('../models/task');

const WorkspaceController = require('../controllers/workspace');

describe('Workspace Controller', function () {

    before(function (done) {
        mongoose
            .connect(
                'mongodb+srv://caio-queiroz:caioq123@cluster0-f7akh.mongodb.net/tasktimer-test?retryWrites=true'
            )
            .then(result => {
                const user = new User({
                    email: 'test@test.com',
                    password: 'test'
                });
                return user.save();
            })
            .then(() => {
                done();
            });
    });

    beforeEach(function () { });

    afterEach(function () { });

    it('should add task to the tasks of the user', function () {
        const req = {
            body: {
                description: 'Test Task',
                project: 'Test Project'
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: function () { }
        };

        WorkspaceController.postAddTask(req, res, () => { }).then(savedTask => {
            //expect(res.statusCode).to.be.equal(200);
            expect(savedTask.result).not.to.have.property('project');
            done();
        });
    });

    after(function (done) {
        User.deleteMany({})
            .then(() => {
                return mongoose.disconnect();
            })
            .then(() => {
                done();
            });
    });
})