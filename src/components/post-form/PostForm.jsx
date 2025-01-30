/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button.jsx";
import Input from "../Input.jsx";
import RTE from "../RTE.jsx";
import Select from "../Select.jsx";
import appwriteService from "../../appwrite/config.js";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaEdit, FaSave, FaRegImage } from "react-icons/fa";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        featuredImage: post?.featuredImage || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const currentTheme = useSelector((state) => state.theme.theme);
  const [imagePreview, setImagePreview] = useState(null);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const submit = async (data) => {
    try {
      if (post) {
        console.log(data);

        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;
        if (file) {
          await appwriteService.deleteFile(post.featuredImage);
        }
        data.featuredImage = file ? file.$id : undefined;
        const dbPost = await appwriteService.updateBlog(post.$id, {
          ...data,
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
            ...data,
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
  // const [selectedFile, setSelectedFile] = useState(null); // To store the file object
  const fetchImage = async (featuredImage) => {
    if (featuredImage) {
      try {
        appwriteService
          .getBlogFilePreview(featuredImage)
          .then((url) => {
            setImagePreview(url);
          })
          .catch((error) => {
            throw new Error(error);
          });
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    }
  };
  useCallback(() => {
    if (post && post.featuredImage) {
      fetchImage(post.featuredImage);
    }
  }, [post]);
  const handleImageChange = (event) => {
    const file = event.target.files?.[0]; // Safely get the selected file

    if (!file) return; // Exit if no file is selected

    const reader = new FileReader();

    reader.onload = () => {
      setImagePreview(reader.result);
      // Set the preview URL
    };

    reader.readAsDataURL(file); // Read the file as a data URL

    // Optional: Store the file object for further use (e.g., uploading)
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
    <div
      className={`min-h-screen py-8 px-4 transition-colors duration-500 ${
        currentTheme === "dark"
          ? "bg-space-900 text-cosmic-text"
          : "bg-white text-space-900"
      }`}
    >
      {/* Animated Particles Background */}
      <div className="fixed inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            particles: {
              number: { value: 30 },
              color: { value: currentTheme === "dark" ? "#7d83ff" : "#334155" },
              opacity: { value: 0.5 },
              size: { value: 1 },
              move: { enable: true, speed: 0.3 },
            },
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative z-10 max-w-screen-2xl mx-auto p-8 rounded-xl backdrop-blur-lg ${
          currentTheme === "dark"
            ? "bg-space-800/50 border border-nebula-400/20"
            : "bg-white/90 border border-space-800/20"
        }`}
      >
        <h1
          className={`text-3xl font-bold mb-8 ${
            currentTheme === "dark" ? "text-nebula-400" : "text-space-900"
          }`}
        >
          {post ? "Edit Cosmic Entry" : "Create New Celestial Post"}
        </h1>

        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Left Column */}
          <div className="flex-1 space-y-6">
            <Input
              label="Title"
              placeholder="Enter post title"
              icon={<FaEdit className="text-nebula-400" />}
              theme={currentTheme}
              {...register("title", { required: true })}
            />

            <Input
              label="Slug"
              placeholder="Auto-generated slug"
              icon={<FaEdit className="text-nebula-400" />}
              theme={currentTheme}
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransformer(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
              disabled
            />

            <div
              className={`rounded-lg ${
                currentTheme === "dark"
                  ? "bg-space-700/30"
                  : "bg-cosmic-dark-primary"
              } p-4`}
            >
              <RTE
                label="Content"
                control={control}
                defaultValue={getValues("content")}
                theme={currentTheme}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-96 space-y-6">
            <div className="space-y-4">
              <div
                className={`group border-2 border-dashed rounded-xl p-6 transition-all ${
                  currentTheme === "dark"
                    ? "border-nebula-400/30 hover:border-nebula-400/50 bg-nebula-900/20"
                    : "border-space-800/30 hover:border-space-800/50 bg-space-100/50"
                }`}
              >
                <Input
                  label="Featured Image:"
                  type="file"
                  className="mb-4"
                  accept="image/png, image/jpeg, image/jpg"
                  {...register("image", { required: !post })}
                  onChange={handleImageChange}
                  renderInput={(inputProps) => (
                    <label
                      className={`cursor-pointer flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-dashed transition-all ${
                        currentTheme === "dark"
                          ? "border-nebula-400/30 hover:border-nebula-400/50 bg-nebula-900/20"
                          : "border-space-800/30 hover:border-space-800/50 bg-space-100/50"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <FaCloudUploadAlt
                          className={`text-4xl transition-transform ${
                            currentTheme === "dark"
                              ? "text-nebula-400 hover:text-nebula-300"
                              : "text-space-800 hover:text-space-700"
                          }`}
                        />
                        <div className="text-center">
                          <p
                            className={`font-medium ${
                              currentTheme === "dark"
                                ? "text-nebula-300"
                                : "text-space-700"
                            }`}
                          >
                            Click to upload
                          </p>
                          <p
                            className={`text-sm ${
                              currentTheme === "dark"
                                ? "text-nebula-400/70"
                                : "text-space-600"
                            }`}
                          >
                            PNG, JPG, JPEG (max 5MB)
                          </p>
                        </div>
                      </div>
                      <input {...inputProps} className="hidden" />
                    </label>
                  )}
                />
              </div>
              {(post || imagePreview) && (
                <div
                  className={`mt-6 rounded-xl overflow-hidden border ${
                    currentTheme === "dark"
                      ? "border-nebula-400/20"
                      : "border-space-800/20"
                  }`}
                >
                  <div className="relative group">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-105"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        currentTheme === "dark"
                          ? "from-nebula-900/60"
                          : "from-space-900/40"
                      } via-transparent to-transparent`}
                    />
                    <div
                      className={`absolute bottom-0 left-0 p-4 flex items-center ${
                        currentTheme === "dark"
                          ? "text-nebula-300"
                          : "text-space-100"
                      }`}
                    >
                      <FaRegImage className="mr-2 text-xl" />
                      <span className="font-medium">Featured Preview</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Select
              options={["active", "inactive"]}
              label="Status"
              theme={currentTheme}
              {...register("status", { required: true })}
            />

            <Button
              type="submit"
              className={`w-full group ${
                post
                  ? "bg-nebula-400/90 hover:bg-nebula-400 text-nebula-400"
                  : "bg-green-500/20 hover:bg-green-500/30 text-green-500"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                {post ? (
                  <>
                    <FaSave className="transition-transform group-hover:scale-110" />
                    Update Cosmic Entry
                  </>
                ) : (
                  <>
                    <FaUpload className="transition-transform group-hover:scale-110" />
                    Launch Post
                  </>
                )}
              </span>
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
