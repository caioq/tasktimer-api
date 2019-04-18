const expect = require('chai').expect;
const mongoose = require('mongoose');

const User = require('../models/user');
const Project = require('../models/project');

const WorkspaceController = require('../controllers/workspace');

const ObjectId = mongoose.Types.ObjectId;

describe('Workspace Controller', function () {

    before(function (done) {
        mongoose
            .connect(
                'mongodb+srv://caio-queiroz:caioq123@cluster0-f7akh.mongodb.net/tasktimer-test?retryWrites=true', { useNewUrlParser: true }
            )
            .then(result => {
                const user = new User({
                    email: 'test@test.com',
                    password: 'test',
                    _id: '5c829f7c9c56815c7c70f896'
                });
                return user.save();
            })
            .then(result => {
                const project = new Project({
                    name: 'Tasktimer Project Test',
                    color: 'blue',
                    user: result._id,
                    _id: '5c74377fd5a0a52b00fccd8f'
                });
                return project.save();
            })
            .then(() => {
                done();
            });
    });

    beforeEach(function () { });

    afterEach(function () { });

    it('should add task to the tasks of the user and send 201 status code response', function (done) {
        const req = {
            body: {
                description: 'Test Task',
                project: 'Tasktimer Project Test'
            },
            user: {
                _id: '5c829f7c9c56815c7c70f896'
            }
        };
        
        const res = {
            statusCode: 500,
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function () { }
        };

        WorkspaceController.postAddTask(req, res, () => { }).then(savedTask => {
            expect(res.statusCode).to.be.equal(201);
            expect(savedTask).to.have.property('project');
            expect(savedTask.user).to.eql(ObjectId('5c829f7c9c56815c7c70f896'));
            done();
        });
    });



    after(function (done) {
        User.deleteMany({})
            .then(() => {
                return Project.deleteMany({});
            })
            .then(() => {
                return mongoose.disconnect();
            })
            .then(() => {
                done();
            });
    });
})