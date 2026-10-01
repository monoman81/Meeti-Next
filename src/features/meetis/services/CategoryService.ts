import {categoryRepository, ICategoryRepository} from "@/src/features/meetis/services/CategoryRepository";
import {notFound} from "next/navigation";

class CategoryService {
    constructor(private categoryRepostory: ICategoryRepository) {}

    async getAllCategories() {
        return await this.categoryRepostory.findAll();
    }

    async getCategoryById(categoryId: string) {
        const category = await this.categoryRepostory.findById(categoryId);
        if (!category) notFound();
        return category;
    }

}

export const categoryService = new CategoryService(categoryRepository);