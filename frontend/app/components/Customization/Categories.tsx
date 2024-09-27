import {
  useEditHeroDataMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layout";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { styles } from "@/app/styles/style";
import {  AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

type Props = {};

const Categories = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [editHeroData, { isSuccess: LayoutSuccess, error }] =
    useEditHeroDataMutation();
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
    if(LayoutSuccess) {
      refetch()
      toast.success("Categories updated successfully...")
    }
    if(error) {
      if("data" in error){
        const errorMessage = error as any
        toast.error(errorMessage.data.message)
      }
    }
  }, [data, error, LayoutSuccess]);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategories: any) =>
      prevCategories.map((prevCategory: any) =>
        prevCategory._id === id
          ? { ...prevCategory, title: value }
          : prevCategory
      )
    );
  };

  const newCategoriesHandler = () => {
    if(categories[categories.length -1].title === ""){
      toast.error("Please add new category...")
    } else {
      setCategories((prevCategory: any)=>[...prevCategory, {title: ""}])
    }
  };

  const areCategoriesUnchanged = (originalCategories: any[], newCategories: any[]) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories)
  }
  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((category)=> category.title === "")
  }

  const editCategoriesHandler = async() => {
    if(!areCategoriesUnchanged(data.layout.categories, categories) && !isAnyCategoryTitleEmpty(categories)) {
      await editHeroData({
        type: "Categories",
        categories
      })
    }
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.title}`}>All Categories</h1>
          {categories &&
            categories.map((category: any, index: number) => {
              return (
                <div className="p-3">
                  <div className="flex items-center w-full justify-center">
                    <input
                      className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                      value={category.title}
                      placeholder="Enter category title...."
                      onChange={(e) =>
                        handleCategoriesAdd(category._id, e.target.value)
                      }
                    />
                    <AiOutlineDelete
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setCategories((prevCategories: [] | string[]) =>
                          prevCategories.filter(
                            (prevCategory: any) =>
                              prevCategory._id !== category._id
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}
          <br />
          <br />
          <div className="w-full justify-center flex">
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoriesHandler}
            />
          </div>
          <div className={`${styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-{#ccccc34} ${areCategoriesUnchanged(data.layout.categories, categories) || isAnyCategoryTitleEmpty(categories) ? "!cursor-not-allowed" : "!cursor-pointer !bg-[#42d383]"
            }
            !rounded absolute bottom-12 right-12
            `}
            onClick={
              areCategoriesUnchanged(data.layout.categories, categories) || isAnyCategoryTitleEmpty(categories) ? () => null : editCategoriesHandler
            }
            >
              Save
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;
