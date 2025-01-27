const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $lt: 30 }}).sort('name').select(' name price').limit(10).skip(5);
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  const { 
    featured, 
    company, 
    name, 
    sort, 
    fields, 
    numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  };

  if (company) {
    queryObject.company = company;
  };

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  };

  if (numericFilters) {
    // operator map
    const operatorMap = {
      '>' : '$gt',
      '>=' : '$gte',
      '=' : '$eq',
      '<' : '$lt',
      '<=' : '$lte',
    };

    // regular expression
    const regEx = /\b(>|>=|=|<|<=)\b/g;

    // relacement method
    let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)

    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = {[operator]: Number(value)}
      };
    });
    
    console.log(`Numberic Filters: ${numericFilters}`);
    console.log(`Filters: ${filters}`);
    console.log(`Query Object: ${queryObject}`);

  };

  console.log(queryObject);
  let result = Product.find(queryObject);

  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  };

  // select/fields
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  };

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page -1) * limit;

  result = result.skip(skip).limit(limit);

  // 23 products

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic
};