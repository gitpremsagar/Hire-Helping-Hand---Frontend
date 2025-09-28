import {API} from "@/lib/constants"
import { ServiceCategoryResponse } from "@/lib/modules/serviceCategory/serviceCategory.type";

async function getCategories() {
    const res = await fetch(`${API.CATEGORIES.GET_ALL}`);
    const data = await res.json();
    return data as ServiceCategoryResponse;
}

export default async function CategoryPage() {
    const categories = await getCategories();
    return (
        <div>
            <h1>Category</h1>
        </div>
    )
}