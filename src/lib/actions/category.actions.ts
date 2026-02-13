"use server";

import { db } from "@/lib/db";

export async function createCategory({ categoryName }: { categoryName: string }) {
    try {
        const newCategory = await db.category.create({
            data: { name: categoryName },
        });

        return JSON.parse(JSON.stringify(newCategory));
    } catch (error) {
        console.log(error);
    }
}

export async function getAllCategories() {
    try {
        const categories = await db.category.findMany();

        return JSON.parse(JSON.stringify(categories));
    } catch (error) {
        console.log(error);
    }
}

export async function getCategoryByName(name: string) {
    return await db.category.findUnique({
        where: { name },
    })
}
