let graphql = require('graphql');
let axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLSchema,
    GraphQLString,
    GraphQLNonNull
} = graphql

const ProductType = new GraphQLObjectType({
    name:'Products',
    fields:{
        id: {type:GraphQLInt},
        title: {type:GraphQLString},
        price: {type:graphql.GraphQLFloat},
        description: {type:GraphQLString},
        category: {type:GraphQLString},
        image: {type:GraphQLString},
    }
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        Products:{
            type:ProductType,
            args:{id:{type:GraphQLInt}},
            resolve(parentValue,args){
                return axios.get(`https://fakestoreapi.com/products/${args.id}`)
                .then((res) => res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})

/* {
    Products(id:1){
     id,
     title,
     price
    }
  } */