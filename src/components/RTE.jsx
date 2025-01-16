/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

function RTE({ name, control, label, defaultValue = "" }) {
  console.log(import.meta.env.VITE_TINYMCE_API_KEY);
  
  return (
    <div className="w-full">
      {label && <label className="block text-sm text-gray-600">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => (
          <Editor
          apiKey= "t8justbk6uovee0497vahntwah4awlx4ngnnmbek84u3cz3v"
            initialValue={defaultValue}
            init={{
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
            
          />
        )}
      />
    </div>
  );
}

export default RTE;
