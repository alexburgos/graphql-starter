export default {
  Query: {
    book: async (parent, { id }, { models: { bookModel } }, info) => {
      const book = await bookModel.findById(id).exec();
      return book;
    },
    books: async (parent, args, { models: { bookModel } }, info) => {
      const books = await bookModel.find().exec();
      return books;
    },
  },
  Mutation: {
    createBook: async (parent, { title, author }, { models: { bookModel } }, info) => {
      const book = await bookModel.create({ title, author });
      return book;
    },
  },
};