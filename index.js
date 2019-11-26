const Express = require('express');
const ExpressGraphQL = require("express-graphql");
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt
} = require("graphql");
const App = Express();
const Route = require('./router');
const Mongoose = require('mongoose');
const StatusModel = require('./model/Status')

Mongoose.connect('mongodb+srv://WaiYanYeNaing:1234@lapsecluster-zki0b.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('mongo db connected')
})

const StatusType = new GraphQLObjectType({
    name: "Status",
    fields: {
        status1: { type: GraphQLInt },
        status2: { type: GraphQLInt },
        status3: { type: GraphQLInt },
        status4: { type: GraphQLInt },
        status5: { type: GraphQLInt }
    }
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            status: {
                type: GraphQLList(StatusType),
                resolve: (root, args, context, info) => {
                    return StatusModel.find().exec();
                }
            },
            single_status: {
                type: StatusType,
                args: {
                    id: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args, context, info) => {
                    return StatusModel.findById(args.id).exec();
                },
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: {
            status: {
                type: StatusType,
                args: {
                    status1: { type: GraphQLInt },
                    status2: { type: GraphQLInt },
                    status3: { type: GraphQLInt },
                    status4: { type: GraphQLInt },
                    status5: { type: GraphQLInt }
                },
                resolve: (root, args, context, info) => {
                    let status = new StatusModel(args);
                    return status.save();
                }
            },
            delete_status: {
                type: StatusType,
                args: {
                    id: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args, context, info) => {
                    console.log(args.id)
                    return StatusModel.findById(args.id).deleteOne().exec();
                },
            },
            update_status: {
                type: StatusType,
                args: {
                    id: { type: GraphQLNonNull(GraphQLString) },
                    status1: { type: GraphQLInt },
                    status2: { type: GraphQLInt },
                    status3: { type: GraphQLInt },
                    status4: { type: GraphQLInt },
                    status5: { type: GraphQLInt }
                },
                resolve: (root, args, context, info) => {
                    const {id, status1, status2, status3, status4, status5} = args
                    return StatusModel.findById(args.id).findOneAndUpdate({id, status1, status2, status3, status4, status5}).exec();
                },
            }
        },
    })
});

App.use("/graphql", ExpressGraphQL({
    schema: schema,
    graphiql: true
}));

const PORT = process.env.PORT || 9090;

App.use(Express.json())
App.use(Express.urlencoded({extended: false}))
App.use('/api', Route)

App.listen(PORT, () => console.log(`Server running on port ${PORT}`))