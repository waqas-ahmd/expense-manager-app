import Category from "../models/categoryModel.js";

const getCategoryName = async (id) => {
  if (id === null) {
    return "Uncategorized";
  }
  const category = await Category.findById(id);
  if (category === null) {
    return "Uncategorized";
  }
  return category.title;
};

export default getCategoryName;
