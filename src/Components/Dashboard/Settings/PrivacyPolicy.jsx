import { Button, Spin } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} from "../../../Redux/api/settingsApi";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    data: getPrivacyPolicy,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetPrivacyPolicyQuery();

  const privacyData = getPrivacyPolicy?.data;
  console.log("privacyData", privacyData);

  const [updatePrivacy, { isLoading: isUpdating }] =
    useUpdatePrivacyPolicyMutation();

  useEffect(() => {
    if (getPrivacyPolicy?.data) {
      setContent(getPrivacyPolicy?.data);
    }
  }, [getPrivacyPolicy]);

  const handleOnSave = async () => {
    console.log("Saved PP");
    try {
      const data = { data: content };
      await updatePrivacy(data).unwrap();
      toast.success("Privacy Policy updated successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to save Privacy Policy. Please try again.");
      console.error("Save error:", error);
    }
  };

  const joditConfig = {
    height: 500,
    readonly: false,
    theme: "default",
    defaultAction: "insert",
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "font",
      "fontsize",
      "brush",
      "|",
      "align",
      "ul",
      "ol",
      "|",
      "link",
      "image",
      "table",
      "|",
      "undo",
      "redo",
      "|",
      "fullsize",
      "preview",
    ],
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    toolbarAdaptive: false,
    placeholder: "Start typing your privacy policy...",
    spellcheck: true,
    language: "en",
    // Custom styling options
    style: {
      background: "#233458",
      color: "#e6e6e6",
    },
  };

  if (isFetching || isUpdating) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" tip="Loading Privacy Policy..." />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-white">
        Error loading Privacy Policy. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-[93vh] bg-[#233458] py-1 px-8 rounded-lg">
      <div className="p-2 rounded">
        <h1 className="text-4xl font-bold py-4 text-[#fff]">Privacy Policy</h1>

        <div className="flex flex-col items-center">
          <div className="w-full">
            <JoditEditor
              ref={editor}
              value={content}
              config={joditConfig}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>

          <Button
            onClick={handleOnSave}
            loading={isUpdating}
            className="w-64 py-6 border !border-[#5A199B] hover:border-[#5A199B] text-xl !text-white bg-gradient-to-r from-[#D7A52C] to-[#A020F0] hover:!bg-[#5A199B] font-semibold rounded-3xl mt-8 transition-all duration-300 ease-in-out"
          >
            {isUpdating ? "Saving..." : "Save Privacy Policy"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
