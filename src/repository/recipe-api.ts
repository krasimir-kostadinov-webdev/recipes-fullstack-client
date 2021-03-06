import { ApiClient, IdType, processResponse } from "./api";
import { RecipeModel } from "./recipe-model";

const BASE_URL = "http://localhost:9000/api/recipes";

class RecipesRepo implements ApiClient<RecipeModel> {
   async getAllItems(): Promise<RecipeModel[]> {
      return processResponse(fetch(BASE_URL));
   }

   async getAllRecipesFromSameUser(
      query: string
   ): Promise<RecipeModel[] | undefined> {
      try {
         const response = await fetch(BASE_URL + query);
         if (!response.ok) {
            throw new Error(
               "Something went wrong trying to get user's recipes"
            );
         }

         const data = (await response.json()) as RecipeModel[];
         if (data && data.length > 0) {
            return data;
         }
      } catch (error) {
         console.log(error);
      }
   }

   async createItem(T: RecipeModel): Promise<RecipeModel> {
      const formData = new FormData();
      formData.append("name", T.name);
      formData.append("instructions", T.instructions);
      formData.append("ingredients", JSON.stringify(T.ingredients));
      formData.append("category", T.category);
      formData.append("recipe_img", T.recipe_img);
      formData.append("createdBy", T.createdBy);
      return processResponse(
         fetch(BASE_URL, {
            method: "POST",
            body: formData,
         })
      );
   }

   async findItemById(_id: IdType): Promise<RecipeModel> {
      return processResponse(fetch(`${BASE_URL}/${_id}`));
   }

   async updateItem(_id: IdType): Promise<RecipeModel> {
      return processResponse(fetch(BASE_URL), _id);
   }

   deleteItemById(_id: IdType): Promise<RecipeModel> {
      return processResponse(fetch(BASE_URL), _id);
   }
}

export const RecipesAPI: ApiClient<RecipeModel> = new RecipesRepo();
