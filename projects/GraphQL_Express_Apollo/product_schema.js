const productModel = require("./product_model");

exports.typeDefs = `
    #graphql
    type Product {
        id: ID,
        name:String
        category:String
        price:Int
        quantity:Int
        rating:[Int]
    }
    type Query {
        getProductList: [Product]
        getProduct(id:ID): Product
    }
    type Mutation {
        addProduct(name:String,category:String,price:Int,quantity:Int,rating:[Int]) : Product
        updateProduct(id:ID,name:String,category:String,price:Int,quantity:Int,rating:[Int]) : Product
        deleteProduct(id:ID) : Boolean
    }
`;
exports.resolvers = {
    Query: {
        getProductList: async () => {
            const products = await productModel.find({});
            return products;
        },
        getProduct: async (parent, args) => {
            const product = await productModel.findById(args.id);
            return product;
        }
    }
    ,
    Mutation: {
        addProduct: async (parent, args) => {
            const addResponse = await productModel.create({ ...args });
            return addResponse;
        },
        updateProduct: async (parent, args) => {
            const updateResponse = await productModel.findByIdAndUpdate(args.id, { ...args }, { new: true });
            return updateResponse;
        },
        deleteProduct: async (parent, args) => {
            await productModel.findOneAndDelete({ _id: args.id });
            return true;
        }
    }
}