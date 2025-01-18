/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button.jsx";
import Input from "../Input.jsx";
import RTE from "../RTE.jsx";
import Select from "../Select.jsx";
import appwriteService from "../../appwrite/config.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      if (post) {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;
        if (file) {
          await appwriteService.deleteFile(post.featuredImage);
        }
        data.featuredImage = file ? file.$id : undefined;
        const dbPost = await appwriteService.updateBlog(post.$id, {
          ...data
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);
        if (file) {
          const fileId = file.$id;
          console.log(fileId);
          
          data.featuredImage = fileId;
          // console.log(userData.$id);
          data.owner_id = userData.$id;
          
          const dbPost = await appwriteService.createBlog({
            ...data
           
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const slugTransformer = useCallback((slugString) => {
    // though I will use id for unique identification of the blog post but I want to try this too.
    if (slugString && typeof slugString == "string")
      return slugString
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
  }, []);

  useEffect(() => {
    watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransformer(value.title), {
          shouldValidate: true,
        });
      }
    });
  }, [watch, setValue, slugTransformer]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col space-y-4">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransformer(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          placeholder="content"
          className="mb-4"
          control={control}
          defaultValue={getValues("content")}
          // {...register("content", { required: true })}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="featured Image :"
          type="file"
          className="mb-4"
          accept="image/png image/jpeg image/jpg"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getBlogFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status :"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          className={`${post ? "bg-yellow-600" : "bg-green-600"} w-full`}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
