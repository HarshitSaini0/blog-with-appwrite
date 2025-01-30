/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import conf from "../conf/conf";
import { useSelector } from "react-redux";

function RTE({ name, control, label, defaultValue = "" }) {
  const currentTheme = useSelector((state) => state.theme.theme);
  const { handleSubmit } = useForm({
    defaultValues: {
      content: defaultValue,
    },
  });
  

  return (
    <div className={`w-full space-y-2 `}>
      {label && (
        <label className={`block text-sm font-medium ${
          currentTheme === 'dark' ? 'text-nebula-400' : 'text-cosmic-light-primary'
        }`}>
          {label}
          {currentTheme === 'dark' ? ' (Markdown)' : ''}
        </label>
      )}
      <div className={`rounded-lg overflow-hidden border transition-colors duration-300 ${
        currentTheme === 'dark' 
          ? 'border-nebula-400/20 hover:border-nebula-400/30' 
          : 'border-space-800/20 hover:border-space-800/30'
      }`}>
        <Controller
          name={name || "content"}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <Editor
              apiKey={conf.tinyMCE}
              initialValue={defaultValue}
              init={{
                branding: false,
                height: 500,
                menubar: false,
                skin:( currentTheme === 'dark' ? 'oxide-dark' : 'oxide'),
                content_css: (currentTheme === 'dark' ? 'dark' : 'default'),
                plugins: [
                  "advlist", "autolink", "lists", "link", "image", "charmap",
                  "preview", "anchor", "searchreplace", "visualblocks", "code",
                  "fullscreen", "insertdatetime", "media", "table", "code", "help",
                  "wordcount"
                ],
                toolbar: `undo redo | blocks | 
                          bold italic forecolor | alignleft aligncenter 
                          alignright alignjustify | bullist numlist outdent indent | 
                          link image table | code fullscreen preview help`,
                content_style: (currentTheme === 'dark' 
                  ? `body { 
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
                      font-size: 16px; 
                      color: #e6f1ff; 
                      background-color: #0b0d26; 
                    }
                    .mce-content-body {
                      min-height: 400px;
                      padding: 1rem !important;
                    }`
                  : `body { 
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
                      font-size: 16px; 
                      color: #0b0d26; 
                      background-color: #ffffff; 
                    }
                    .mce-content-body {
                      min-height: 400px;
                      padding: 1rem !important;
                    }`),
                images_upload_handler: async (blobInfo) => {
                  return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                    reader.readAsDataURL(blobInfo.blob());
                  });
                },
                toolbar_mode: 'sliding',
                statusbar: false,
                image_class_list: [
                  { title: 'Responsive', value: 'img-responsive' },
                  { title: 'Rounded', value: 'img-rounded' }
                ],
                image_advtab: true,
                image_caption: true,
                paste_data_images: true
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
}

export default RTE;